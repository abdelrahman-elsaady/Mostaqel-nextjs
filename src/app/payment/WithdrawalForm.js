
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function WithdrawalForm({ onClose, onSuccess, availableBalance ,userid}) {
  const [amount, setAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('bank');




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.BASE_URL}/balance/withdraw`, {
        amount: parseFloat(amount),
        method: withdrawalMethod,
        userid:userid
      });
      await Swal.fire({
        icon: 'success',
        title: 'تم السحب بنجاح',
        text: `تم سحب ${amount} بنجاح`,
        confirmButtonText: 'حسنًا'
      });
      onSuccess(amount);
    } catch (error) {
      console.error('Withdrawal error:', error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'خطأ في السحب',
        text: 'حدث خطأ أثناء محاولة السحب. يرجى المحاولة مرة أخرى.',
        confirmButtonText: 'حسنًا'
      });
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">سحب الرصيد</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="withdrawalAmount" className="form-label">المبلغ المراد سحبه</label>
                <input
                  type="number"
                  className="form-control"
                  id="withdrawalAmount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={availableBalance}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="withdrawalMethod" className="form-label">طريقة السحب</label>
                <select
                  className="form-select"
                  id="withdrawalMethod"
                  value={withdrawalMethod}
                  onChange={(e) => setWithdrawalMethod(e.target.value)}
                >
                  <option value="bank">تحويل بنكي</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">تأكيد السحب</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}