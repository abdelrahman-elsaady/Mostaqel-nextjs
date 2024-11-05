"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import styles from "./register.module.css";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { IoLogoWindows } from "react-icons/io";

import { FaGoogle } from "react-icons/fa";

// const cookies = new Cookies("token", { path: '/' });
// const cookies = new Cookies();

// console.log(cookies.get('ggg'));

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
  const router = useRouter();
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
      let result = await response.json();

      console.log(result);
      console.log(response);
      // log
      // if(res)
        if (result.message == 'Email already exists') {
          // setRegistrationMessage("هذا البريد الإلكتروني موجود بالفعل");
          Swal.fire({
            title: 'البريد الإلكتروني موجود بالفعل',
            text: 'يرجى تسجيل الدخول.',
            icon: 'error',
          });
        }

      if(result.message == 'user saved successfully') {

        Swal.fire({
          title: 'نجاح!',
          text: 'تم التسجيل بنجاح',
          icon: 'success',
          confirmButtonText: 'حسناً'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/login');
          }
        });

      }
    } catch (error) {
   
      // setRegistrationMessage("حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
      Swal.fire({
        title: 'حدث خطأ أثناء التسجيل',
        text: 'يرجى المحاولة مرة أخرى.',
        icon: 'error',
      });
      // console.log(result.message);
    }
    setIsSubmitting(false);
  };

  const handleMicrosoftSignUp = () => {

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
<div dir="rtl" className="container mt-5">
      <div className="row">
        <div className="col-md-7">
          <h2 className="mb-4">إنشاء حساب جديد</h2>

          <div className="row mb-3">

            <div className="col-md-6">

              <button onClick={() => signIn('google', { callbackUrl: '/' })} className="  w-100" style={{backgroundColor: "#dd4b39", color: "white",border: "none", height: "50px"}}>
                {/* <img src="/google-icon.png" alt="Google" width={20} height={20} className="me-2" /> */}
                <FaGoogle className="ms-2" style={{fontSize: '28px'}} />
              <span>
                التسجيل باستخدام Google
              </span>

              </button>
            </div>
            <div className="col-md-6">
              <button onClick={handleMicrosoftSignUp } className="  w-100" style={{backgroundColor: "#0f4bac", color: "white",border: "none", height: "50px"}}>
                
              <IoLogoWindows className="ms-2" style={{fontSize: '28px'}} />
              <span>
                باستخدام مايكروسوفت
              </span>
              </button>
            </div>
          </div>
          <div className="text-center mb-3">
            <span className="bg-white px-2">أو</span>
            <hr className="mt-0" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">الاسم الأول</label>
                <input {...register("firstName")} id="firstName" className={`form-control ${styles.customInput}`} placeholder="الاسم الأول" />
                <p className="text-danger">{errors.firstName?.message}</p>
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">اسم العائلة</label>
                <input {...register("lastName")} id="lastName" className={`form-control ${styles.customInput}`} placeholder="اسم العائلة" />
                <p className="text-danger">{errors.lastName?.message}</p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
              <input type="email" {...register("email")} id="email" className={`form-control ${styles.customInput}`} placeholder="البريد الإلكتروني" />
              <p className="text-danger">{errors.email?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">كلمة المرور</label>
              <input type="password" {...register("password")} id="password" className={`form-control ${styles.customInput}`} placeholder="كلمة المرور" />
              <p className="text-danger">{errors.password?.message}</p>
            </div>
            <div className="mb-3 form-check">
              <span className="ms-2 size-50">
              <input type="checkbox" {...register("terms")} id="terms" className= {` ${styles.customCheckbox}`} /> 
              </span>

              <label className="form-check-label" htmlFor="terms">
                قرأت وأوافق على شروط الاستخدام و بيان الخصوصية
              </label>
              <p className="text-danger">{errors.terms?.message}</p>
            </div> 
            <div className="mb-3">
              {/* Add reCAPTCHA component here */}
            </div>
            <button type="submit" disabled={isSubmitting} className="btn w-25" style={{backgroundColor: "#2caae2", borderRadius: "none", color: "white"}}>
              {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
            </button>
            {registrationMessage && <p className="mt-3 text-center">{registrationMessage}</p>}
          </form>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <img src="./side.png" alt="Products" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;


// "use client"

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import styles from "./register.module.css";
// import Swal from "sweetalert2";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

// ... (keep other imports and schema)

// const RegisterForm = () => {
//   // ... (keep existing state and functions)

//   return (
//     <div dir="rtl" className="container mt-5">
//       <div className="row">
//         <div className="col-md-7">
//           <h2 className="mb-4">إنشاء حساب جديد</h2>
//           <div className="row mb-3">
//             <div className="col-6">
//               <button onClick={handleGoogleSignUp} className="btn btn-outline-secondary w-100">
//                 <img src="/google-icon.png" alt="Google" width={20} height={20} className="me-2" />
//                 التسجيل باستخدام Google
//               </button>
//             </div>
//             <div className="col-6">
//               <button className="btn btn-outline-secondary w-100">
//                 <img src="/microsoft-icon.png" alt="Microsoft" width={20} height={20} className="me-2" />
//                 باستخدام مايكروسوفت
//               </button>
//             </div>
//           </div>
//           <div className="text-center mb-3">
//             <span className="bg-white px-2">أو</span>
//             <hr className="mt-0" />
//           </div>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row mb-3">
//               <div className="col-md-6">
//                 <label htmlFor="firstName" className="form-label">الاسم الأول</label>
//                 <input {...register("firstName")} id="firstName" className={`form-control ${styles.customInput}`} placeholder="الاسم الأول" />
//                 <p className="text-danger">{errors.firstName?.message}</p>
//               </div>
//               <div className="col-md-6">
//                 <label htmlFor="lastName" className="form-label">اسم العائلة</label>
//                 <input {...register("lastName")} id="lastName" className={`form-control ${styles.customInput}`} placeholder="اسم العائلة" />
//                 <p className="text-danger">{errors.lastName?.message}</p>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
//               <input type="email" {...register("email")} id="email" className={`form-control ${styles.customInput}`} placeholder="البريد الإلكتروني" />
//               <p className="text-danger">{errors.email?.message}</p>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">كلمة المرور</label>
//               <input type="password" {...register("password")} id="password" className={`form-control ${styles.customInput}`} placeholder="كلمة المرور" />
//               <p className="text-danger">{errors.password?.message}</p>
//             </div>
//             <div className="mb-3 form-check">
//               <input type="checkbox" {...register("terms")} id="terms" className={`form-check-input ${styles.customCheckbox}`} />
//               <label className="form-check-label" htmlFor="terms">
//                 قرأت وأوافق على شروط الاستخدام و بيان الخصوصية
//               </label>
//               <p className="text-danger">{errors.terms?.message}</p>
//             </div>
//             <div className="mb-3">
//               {/* Add reCAPTCHA component here */}
//             </div>
//             <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
//               {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
//             </button>
//             {registrationMessage && <p className="mt-3 text-center">{registrationMessage}</p>}
//           </form>
//         </div>
//         <div className="col-md-5 d-none d-md-block">
//           <img src="./side.png" alt="Products" className="img-fluid" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;
// import Image from 'next/image';
// import styles from "./register.module.css";

// ... (keep the existing imports and other code)

// const RegisterForm = () => {
//   // ... (keep the existing state and functions)

//   return (
   
//   );
// };

// // export default RegisterForm;
// "use client"
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";
// import styles from "./register.module.css";
// import Swal from "sweetalert2";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from 'next/image';

// // ... (keep other imports and schema)

// const RegisterForm = () => {
//   // ... (keep existing state and functions)

//   return (
   
//   );
// };

// export default RegisterForm;