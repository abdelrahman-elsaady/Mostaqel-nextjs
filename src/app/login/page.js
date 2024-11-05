
'use client'
import React from 'react'
import styles from "./login.module.css"
import { loginUser } from './../actions/auth'
import { redirect } from 'next/navigation'
import { handleLogin } from './../actions/login'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { IoLogoWindows } from "react-icons/io5";

export default function Login() {

  // let result=""
  // var errorMessage = ""

  const [error, setError] = useState('')

  async function onSubmit(formData) {
    console.log(formData);
    const result = await handleLogin(formData)
    console.log(result);
    if (result.success == true) {
      Swal.fire({
        icon: 'success',
        title: 'تم تسجيل الدخول بنجاح',
        text: 'جاري تحويلك إلى الصفحة الرئيسية...',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = '/';
      });
    } else {
      setError(result.error)
    }


    // setError(result.error)
  }



  const handleMicrosoftSignIn = () => {

    Swal.fire({
      title: ' مش شغااال',
      text: 'بلاش فزلكة ملقتش غير مايكروسوفت؟',

      imageUrl: "/balaash.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image"
    });

    // signIn('microsoft', { callbackUrl: '/' });
  };

  return (
    <>
      <div dir="rtl" className="container-fluid pt-5 pb-5 mb-5 " style={{ backgroundColor: '#f5f5f5' }}>


        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-6">

            <div className="card " style={{ borderRadius: '0' }}>

              <div className="card-body">
                <div className={`text-center mb-4 ${styles.logo}`}>
                  <img src="/logo.png" alt="Logo" className="img-fluid mb-3" style={{ maxWidth: '70px' }} />
                  <h2>تسجيل الدخول</h2>
                  <p>مستقل</p>
                </div>


                <div className="row mb-3">

                  <div className="col-md-6">

                    <button onClick={() => signIn('google', { callbackUrl: '/' })} className="  w-100" style={{ backgroundColor: "#dd4b39", color: "white", border: "none", height: "50px" }}>
                      {/* <img src="/google-icon.png" alt="Google" width={20} height={20} className="me-2" /> */}
                      <FaGoogle className="ms-2" style={{fontSize: '28px'}} />
                      <span>
                        التسجيل باستخدام Google
                      </span>

                    </button>
                  </div>
                  <div className="col-md-6">
                    <button onClick={handleMicrosoftSignIn} className="  w-100" style={{ backgroundColor: "#0f4bac", color: "white", border: "none", height: "50px" }}>

                      <IoLogoWindows className="ms-2" style={{fontSize: '28px'}} />
                      <span>
                        باستخدام مايكروسوفت
                      </span>
                    </button>
                  </div>
                </div>

                <div className={`text-center mb-4 ${styles.separator}`}>
                  <span>أو</span>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form action={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      className={`form-control ${styles.customInput}`}
                      style={{ borderRadius: '0', border: '1px solid #ccc' }}
                      id="email"
                      name="email"
                      placeholder="أدخل البريد الإلكتروني الخاص بك"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">كلمة المرور *</label>
                    <input
                      type="password"
                      className={`form-control ${styles.customInput}`}
                      style={{ borderRadius: '0', border: '1px solid #ccc' }}
                      id="password"
                      name="password"
                      placeholder="أدخل كلمة المرور الخاصة بك"
                      required
                    />
                  </div>
                  <button type="submit" className="btn w-25" style={{ borderRadius: '0', backgroundColor: '#2caae2', color: 'white' }}>دخول</button>
                </form>

                <div className={`mt-4 ${styles.assistance}`}>
                  <ul className="list-unstyled text-center">
                    {/* <li><a href="#" className="text-decoration-none">لا تملك حساب بعد؟</a></li>
                  <li><a href="#" className="text-decoration-none">فقدت كلمة المرور</a></li>
                  <li><a href="#" className="text-decoration-none">لم يصلك رمز التفعيل</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




