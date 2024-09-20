"use client"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./register.module.css";

// Validation schema using Yup
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  familyName: yup.string().required("Family name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // You can handle the form data here
  };
  const onCaptchaChange = (value) => {
    console.log("Captcha value:", value);
  };
  return (
    <div dir="rtl">
    <div className={`${styles.formContainer}`}>
      <h2>إنشاء حساب جديد</h2>
      <div className="social-login">
        <button className="google-btn">استخدام جوجل</button>
        <button className="microsoft-btn">استخدام مايكروسوفت</button>
      </div>
      <div className="separator">
        <span>أو</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>الاسم *</label><br></br>
          <input {...register("firstName")} placeholder="أكتب اسمك" />
          <p>{errors.firstName?.message}</p>
        </div>

        <div className="form-group">
          <label>اسم العائلة *</label><br></br>
          <input {...register("familyName")} placeholder="أكتب اسم العائلة" />
          <p>{errors.familyName?.message}</p>
        </div>

        <div className="form-group">
          <label>البريد الإلكتروني *</label><br></br>
          <input type="email" {...register("email")} placeholder="أدخل بريدك الإلكتروني" />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-group">
          <label>كلمة المرور *</label><br></br>
          <input type="password" {...register("password")} placeholder="أدخل كلمة المرور" />
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" {...register("terms")} />
            <span>قرأت وأوافق على الشروط وبيان الخصوصية</span>
          </label>
        </div>
        
      {/* Other form fields */}
      <ReCAPTCHA sitekey="Your_reCAPTCHA_site_key" onChange={onCaptchaChange} />
      
    
        <button type="submit">تسجيل</button>
      </form>
      
    </div>
    </div>
  );
};

export default RegisterForm;
