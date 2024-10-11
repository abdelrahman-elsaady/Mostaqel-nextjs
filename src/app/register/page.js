"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styles from "./register.module.css";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

import Cookies from 'universal-cookie';

// const cookies = new Cookies("token", { path: '/' });
const cookies = new Cookies();

console.log(cookies.get('ggg'));

const schema = yup.object().shape({
  firstName: yup.string().required("الاسم الأول مطلوب"),
  lastName: yup.string().required("الاسم الأخير مطلوب"),
  email: yup.string().email("صيغة البريد الإلكتروني غير صحيحة").required("البريد الإلكتروني مطلوب"),
  password: yup.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").required("كلمة المرور مطلوبة"),
  terms: yup.boolean().oneOf([true], "يجب الموافقة على الشروط وسياسة الخصوصية"),
});

const RegisterForm = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    try {
      const response = await fetch(`${process.env.BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        if (result.message == 'Email already exists') {
          setRegistrationMessage("هذا البريد الإلكتروني موجود بالفعل");
        }else{
          throw new Error('Network response was not ok');
        }
      }else{
        Swal.fire({
          title: 'تم التسجيل بنجاح',
          text: 'يرجى تسجيل الدخول.',
          icon: 'success',
          timer: 3000
        });
        router.push('/login');
      }

      // console.log(result.message);

      // router.push('/login');
    } catch (error) {
      setRegistrationMessage("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
      console.error("Registration error:", error);
    }
    setIsSubmitting(false);
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/login' });
      if (result?.error) {
        console.error('Google sign-in error:', result.error);
        setRegistrationMessage("حدث خطأ أثناء التسجيل باستخدام Google. يرجى المحاولة مرة أخرى.");
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setRegistrationMessage("حدث خطأ أثناء التسجيل باستخدام Google. يرجى المحاولة مرة أخرى.");
    }
  };



  return (
    <div dir="rtl" className={styles.container}>
      <div className={styles.formContainer}>
        <h2>إنشاء حساب جديد</h2>
        <div className={styles.socialLogin}>
        <button onClick={handleGoogleSignUp} className={styles.googleBtn}>
          التسجيل باستخدام Google
        </button>
        </div>
        <div className={styles.separator}>
          <span>أو</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>الاسم الأول</label>
            <input {...register("firstName")} placeholder="أدخل اسمك الأول" />
            <p className={styles.error}>{errors.firstName?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label>الاسم الأخير</label>
            <input {...register("lastName")} placeholder="أدخل اسمك الأخير" />
            <p className={styles.error}>{errors.lastName?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label>البريد الإلكتروني</label>
            <input type="email" {...register("email")} placeholder="أدخل بريدك الإلكتروني" />
            <p className={styles.error}>{errors.email?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label>كلمة المرور</label>
            <input type="password" {...register("password")} placeholder="أدخل كلمة المرور" />
            <p className={styles.error}>{errors.password?.message}</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.checkbox}>
              <input type="checkbox" {...register("terms")} />
              <span>أوافق على الشروط وسياسة الخصوصية</span>
            </label>
            <p className={styles.error}>{errors.terms?.message}</p>
          </div>
          {/* <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" /> */}
          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
          </button>
          {registrationMessage && <p className={styles.message}>{registrationMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;