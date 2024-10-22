'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
// import { loadStripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import WithdrawalForm from './WithdrawalForm';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    console.log("Stripe instance:", stripe);
    console.log("Elements instance:", elements);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting payment for amount:", amount);

        if (!stripe || !elements) {
            console.log("Stripe not initialized");
            return;
        }
        
          
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.log('[error]', error);
        } else {
            const { id } = paymentMethod;
            try {
                console.log("Sending payment request to backend");
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/balance/charge`, {
                    id,
                    amount: Math.round(amount * 100), // Ensure amount is in cents and rounded
                });
                console.log("Payment response:", response.data);
                onSuccess(response.data);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
    
    };

    return (
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
 
            <label htmlFor="card-element" className="form-label fw-bold">بيانات البطاقة</label>
            <CardElement
                id="card-element"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
        </div>
        <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={!stripe}
        >
            تأكيد الدفع ${amount}
        </button>
    </form>
    );
};


export default function PaymentPage() {
    const { getFreelancerById, updateProfile } = useAppContext();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [depositAmount, setDepositAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
      const [userId, setUserId] = useState('');
      const [withdrawalMethod, setWithdrawalMethod] = useState('bank'); // 'bank' or 'paypal'

      const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

      const handleWithdrawalShow = () => setShowWithdrawalModal(true);
      const handleWithdrawalClose = () => setShowWithdrawalModal(false);
    



      const handleWithdrawalSuccess = async (amount) => {
        try {
          const updatedWithdrawableBalance = user.totalBalance - parseFloat(amount);
          const response = await updateProfile(userId, {
            totalBalance: updatedWithdrawableBalance
          });
          if (response.message == 'User was edited successfully') {
            // Update local state or refetch user data
            setUser(prevUser => ({
              ...prevUser,
              totalBalance: updatedWithdrawableBalance
            }));
            handleWithdrawalClose();
            // Show success message
          }
        } catch (error) {
          console.error('Error processing withdrawal:', error);
          // Show error message
        }
      };
    console.log("Stripe Promise:", stripePromise);



    console.log("Stripe Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    
    let cookies = new Cookies();
  const [token, setToken] = useState( cookies.get('token'));


    useEffect(() => {

        if(token){  
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
          }

        const fetchUser = async () => {
            if (token) {
                const userData = await getFreelancerById(userId);
                if(userData){
                    setUser(userData);
                    setLoading(false);
                    console.log(userData);
                }
                
            }
        };
        fetchUser();
    }, [userId]);
    console.log(user);


    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleDepositChange = (e) => {
        setDepositAmount(e.target.value);
    };

    const calculateFinalAmount = () => {
        const amount = parseFloat(depositAmount);
        if (isNaN(amount)) return 0;
        return (amount * 1.0275).toFixed(2);
    };

    const handlePaymentSuccess = async (paymentData) => {
        console.log("Payment successful:", paymentData);
        try {
            const updatedTotalBalance = user.totalBalance + parseFloat(depositAmount);
            const response = await updateProfile(userId, {
                totalBalance: updatedTotalBalance
            });
            console.log("Response:", response);
            if (response.message == 'User was edited successfully') {
               
                window.location.href = '/payment/success';
            }
        } catch (error) {
            console.error('Error updating balance:', error);
            // Show error message
            alert("There was an error updating your balance. Please try again.");
        }
    };

    const handlePayPalWithdrawal = async (amount) => {
        try {
          const response = await axios.post(`${process.env.BASE_URL}/paypal/paypal-withdrawal`, {
            userId,
            amount,
            email: user.email // Make sure you have the user's PayPal email
          });
          
          if (response.data.success) {
            const updatedTotalBalance = user.totalBalance - parseFloat(amount);
            await updateProfile(userId, {
              totalBalance: updatedTotalBalance
            });
            setUser(prevUser => ({
              ...prevUser,
              totalBalance: updatedTotalBalance
            }));
            handleWithdrawalClose();
            // Show success message
          }
        } catch (error) {
          console.error('Error processing PayPal withdrawal:', error);
          // Show error message
        }
      };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
            </div>
        </div>
    }

    return (
        <div className="container-fluid py-5" style={{ backgroundColor: '#f5f5f5' }} dir='rtl'>

            <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className="text-end">رصيد الحساب</h1>
        <div className="text-start">
          <button className="btn btn-success me-2" style={{borderRadius: '0'}} onClick={handleShow}>شحن الرصيد</button>
          <button className="btn btn-primary me-2" style={{borderRadius: '0'}} onClick={handleWithdrawalShow}>سحب الرصيد</button>
        </div>
      </div>
            <div className="card">
                <div className="card-body">
                    <div className="row border-bottom py-4">
                        <div className="col-md-6 text-center text-muted">
                            <div>
                                <h3>الرصيد الكلي</h3>
                                <h3 className='fw-bold text-success'>${user.totalBalance || 0}.00</h3>
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-muted">
                            <div>
                                <h3>الرصيد المعلق</h3>
                                <h3>${user.pendingBalance || 0}.00</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-6 text-center">
                            {/* <div>
                                <span>الرصيد المتاح</span>
                                <span> $ {user.availableBalance || 0}.00</span>
                            </div> */}
                        </div>
                        <div className="col-md-6 text-center">
                            {/* <div>
                                <span>الرصيد المعلق</span>
                                <span> $ {user.pendingBalance || 0}.00</span>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>

            {showModal && (
    <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
                <div className="modal-header d-flex justify-content-between align-items-center  bg-primary text-white">
                    <h5 className="modal-title text-end">شحن الرصيد</h5>
                    <div className='text-start'>
                    <button type="button" className="text-start btn-close btn-close-white" onClick={handleClose}></button>
                    </div>
                </div>
                <div className="modal-body p-4">
                    <div className="mb-4">
                        <label htmlFor="depositAmount" className="form-label fw-bold">المبلغ المراد إيداعه</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                id="depositAmount"
                                value={depositAmount}
                                onChange={handleDepositChange}
                                required
                                placeholder="أدخل المبلغ"
                            />
                            <span className="input-group-text bg-light" style={{borderRadius: '0 '}}>$</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="finalAmount" className="form-label fw-bold">المبلغ النهائي (شامل رسوم 2.75%)</label>
                        <input
                            type="text"
                            className="form-control form-control-lg bg-light"
                            id="finalAmount"
                            value={`$${calculateFinalAmount()}`}
                            readOnly
                            />
                            </div>
        
                            <div className="card border-0 bg-light p-3 mb-4">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm amount={calculateFinalAmount()} onSuccess={handlePaymentSuccess} />
                                </Elements>
                            </div>
        
                            <div className="text-muted small">
                                <i className="fas fa-lock me-2"></i>
                                جميع المعاملات آمنة ومشفرة
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        {showModal && <div className="modal-backdrop show"></div>}
        {showWithdrawalModal && (
        withdrawalMethod === 'paypal' ? (
            <WithdrawalForm
              userid={userId}
              onClose={handleWithdrawalClose}
              onSuccess={handleWithdrawalSuccess}
              availableBalance={user.totalBalance}
            />
          ) : (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg border-0">
                  <div className="modal-header d-flex justify-content-between align-items-center bg-primary text-white">
                    <h5 className="modal-title text-end">سحب الرصيد عبر PayPal</h5>
                    <div className='text-start'>
                      <button type="button" className="text-start btn-close btn-close-white" onClick={handleWithdrawalClose}></button>
                    </div>
                  </div>
                  <div className="modal-body p-4">
                    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                      <PayPalButtons

                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                    value: user.totalBalance,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            handlePayPalWithdrawal(user.totalBalance);
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        {showWithdrawalModal && <div className="modal-backdrop show"></div>}
  
      {/* Add buttons to choose withdrawal method */}
      <div className="mb-3">
        {/* <button 
          className={`btn ${withdrawalMethod === 'bank' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
          onClick={() => setWithdrawalMethod('bank')}
        >
          سحب عبر التحويل البنكي
        </button>
        <button 
          className={`btn ${withdrawalMethod === 'paypal' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setWithdrawalMethod('paypal')}
        >
          سحب عبر PayPal
        </button> */}
      </div>

    </div>
    );
}

