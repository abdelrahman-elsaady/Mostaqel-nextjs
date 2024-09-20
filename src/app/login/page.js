
// components/Login.js
// import { signIn, signOut, useSession } from "next-auth/react";
import React from 'react';
// import { Form } from 'react-hook-form';
// const login=async()=>{
//   "use server"
//  await signIn("google",{
//   redirectTO:"/"})
// }
import styles from "./login.module.css";

const Login = () => {
  return (
    <div dir="rtl">

    <div className={`login-container ${styles.loginContainer}`}>
      {/* Logo */}
      <div className={`${styles.logo}`}>
        <img src="/logo.png" alt="Logo" />
        <h2>تسجيل الدخول</h2>
        <p>مستقل</p>
      </div>

      {/* Login options */}
      <div className={`${styles.socialLogin}`}>
        {/* <form action={login}>
       
        </form> */}
        <button className="google-btn bg-danger " >استخدام جوجل</button>
        <button className="microsoft-btn bg-primary" >استخدام مايكروسوفت</button>
      </div>

      {/* Separator */}
      <div className={`${styles.separator}`}>
        <span>أو</span>
      </div>

      {/* Form */}
      <form className={`login-form form-group ${styles.loginForm}`} >
      <label>البريد الإلكتروني *</label><br></br>
        <input type="email" placeholder=" أدخل البريد الإلكتروني الخاص بك" />
        <label>كلمة المرور *</label><br></br>
        <input type="password" placeholder=" أدخل كلمة المرور الخاصة بك" />
        <button type="submit" className="btn login">دخول</button>
      </form>

      {/* Assistance */}
      
      <div className={`${styles.assistance}`}>
     
        <ul>
          <li>لا تملك حساب بعد</li>
          <li>فقدت كلمة المرور</li>
          <li>لم يصلك رمز التفعيل</li>
        </ul>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
