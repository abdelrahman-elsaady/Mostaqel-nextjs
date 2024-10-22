
'use client'
import React from 'react'
import styles from "./login.module.css"
import { loginUser } from './../actions/auth'
import { redirect } from 'next/navigation'
import { handleLogin } from './../actions/login'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { signIn } from "next-auth/react";

export default function Login() {
 
  // let result=""
  // var errorMessage = ""

  const [error, setError] = useState('')

  async function onSubmit(formData) {
console.log(formData);
    const result = await handleLogin(formData)
    console.log(result);
    if (result.success==true) {
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
    <div dir="rtl" className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-9 col-lg-6">
        <div className={`card ${styles.loginCard}`}>
          <div className="card-body">
            <div className={`text-center mb-4 ${styles.logo}`}>
              <img src="/logo.png" alt="Logo" className="img-fluid mb-3" style={{maxWidth: '70px'}} />
              <h2>تسجيل الدخول</h2>
              <p>مستقل</p>
            </div>

            <div className={`my-4 d-flex flex-column flex-md-row justify-content-between ${styles.socialLogin}`}>
              <button onClick={() => signIn('google')} className="btn btn-danger mb-2 mb-md-0">تسجيل الدخول باستخدام Google</button>
              <button onClick={handleMicrosoftSignIn} className="btn btn-primary">تسجيل الدخول باستخدام Microsoft</button>
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
                  className="form-control"
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
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="أدخل كلمة المرور الخاصة بك"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-25">دخول</button>
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




