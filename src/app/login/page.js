
'use client'
import React from 'react'
import styles from "./login.module.css"
import { loginUser } from './../actions/auth'
import { redirect } from 'next/navigation'
import { handleLogin } from './../actions/login'
import { useState } from 'react'
export default function Login() {

  // let result=""
  // var errorMessage = ""

  const [error, setError] = useState('')

  async function onSubmit(formData) {
console.log(formData);
    const result = await handleLogin(formData)
    
    if (result?.error) {
      setError(result.error)
    }

    
  }


  // async function onSubmit(formData) {

  //   'use server'
  //  const  result = await loginUser(formData)
  // //  'use server'
  //   // const user = await loginUser()
  //   if (result.success) {
  //     // revalidatePath('/')
  //     redirect('/')
  //   } else {
  //     // errorMessage = result.error
  //     return result.error 
  //   }
  // }

  // console.log(errorMessage);

  return (
    <div dir="rtl" className="container mt-5">
      <div className={`row justify-content-center ${styles.loginContainer}`}>
        <div className="col-md-9">
          <div className={`card w-100 ${styles.loginCard}`}>
            <div className="card-body">
              <div className={`text-center mb-4 ${styles.logo}`}>
                <img src="/logo.png" alt="Logo" className="mb-3" />
                <h2>تسجيل الدخول</h2>
                <p>مستقل</p>
              </div>

              <div className={`m-5 d-flex position-relative  ${styles.socialLogin}`}>
                <button className="btn btn-danger  position-absolute ">تسجيل الدخول باستخدام Google</button>
                <button className="btn btn-primary position-absolute start-0  ">تسجيل الدخول باستخدام Microsoft</button>
              </div>

              <div className={`text-center mb-4 ${styles.separator}`}>
                <span>أو</span>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form action={onSubmit}> {/* ... existing form fields ... */}
                <div>
                  {/* This will display the error message returned by the server action */}
                  {/* {formData => formData.error && (
                    <div className="alert alert-danger">{formData.error}</div>
                  )} */}
                </div>

                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="أدخل البريد الإلكتروني الخاص بك"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">كلمة المرور *</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="أدخل كلمة المرور الخاصة بك"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">دخول</button>
              </form>

              <div className={`mt-4 ${styles.assistance}`}>
                <ul className="list-unstyled">
                  <li><a href="#">لا تملك حساب بعد؟</a></li>
                  <li><a href="#">فقدت كلمة المرور</a></li>
                  <li><a href="#">لم يصلك رمز التفعيل</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




// "use client";
// import React, { useState } from 'react';
// import styles from "./login.module.css";
// const jwt = require('jsonwebtoken');
// import axios from 'axios';


// import { useRouter } from 'next/navigation';
// import { revalidatePath } from 'next/cache';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   function getIdFromToken(token) {
//     try {
//       // Decode the token
//       const decoded = jwt.decode(token);

//       if (!decoded) {
//         throw new Error('Failed to decode token');
//       }
  
//       // Access the id from the decoded payload
//       const id = decoded.id; // or decoded.userId, depending on your token structure
  
//       if (!id) {
//         throw new Error('ID not found in token payload');
//       }
  
//       return id;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return null;
//     }
//   }
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
   
    
//     try {
//       console.log(email);
//       let response = await axios.post('http://localhost:3344/users/login', {
//         email:email,
//         password:password
//       });
//       console.log(response.status);
//       const { data } = response;
      
//       if (data && data.token) {
//         localStorage.setItem('token', data.token);
//         const id = getIdFromToken(data.token);
//         console.log(id);
//  // Redirect to dashboard or home page
//  router.push('/');
//  revalidatePath('/');
//       }
//     } catch (err) {
//       setError(  'البريد الالكتروني او كلمة المرور غير صحيحة' );
      
//     }
//   };


//   return (
//     <div dir="rtl" className="container mt-5">
//       <div className={`row justify-content-center ${styles.loginContainer}`}>
//         <div className="col-md-9">
//           <div className={`card w-100 ${styles.loginCard}`}>
//             <div className="card-body">
//               <div className={`text-center mb-4 ${styles.logo}`}>
//                 <img src="/logo.png" alt="Logo" className="mb-3" />
//                 <h2>تسجيل الدخول</h2>
//                 <p>مستقل</p>
//               </div>

//               <div className={`m-5 d-flex position-relative  ${styles.socialLogin}`}>
//                 <button className="btn btn-danger  position-absolute ">تسجيل الدخول باستخدام Google</button>
//                 <button className="btn btn-primary position-absolute start-0  ">تسجيل الدخول باستخدام Microsoft</button>
//               </div>

//               <div className={`text-center mb-4 ${styles.separator}`}>
//                 <span>أو</span>
//               </div>

//               {error && <div className="alert alert-danger">{error}</div>}

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="email">البريد الإلكتروني *</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="أدخل البريد الإلكتروني الخاص بك"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">كلمة المرور *</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     placeholder="أدخل كلمة المرور الخاصة بك"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">دخول</button>
//               </form>

//               <div className={`mt-4 ${styles.assistance}`}>
//                 <ul className="list-unstyled">
//                   <li><a href="#">لا تملك حساب بعد؟</a></li>
//                   <li><a href="#">فقدت كلمة المرور</a></li>
//                   <li><a href="#">لم يصلك رمز التفعيل</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// 'use client'



// import React, { useState } from 'react'
// import styles from "./login.module.css"
// import { useRouter } from 'next/navigation'
// import { setCookie } from 'cookies-next'
// import Cookies from 'universal-cookie';
// import Swal from 'sweetalert2';

// export default function Login() {


//   const [error, setError] = useState('')
//   const router = useRouter()





//   async function onSubmit(event) {
//     event.preventDefault()
//     const formData = new FormData(event.target)
    
//     const email = formData.get('email')
//     const password = formData.get('password')

//     try {
//       const response = await fetch(`${process.env.BASE_URL}/users/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       })

//       if (!response.ok) {
//         const data = await response.json()
//         throw new Error(data.message)
//       }

//       const data = await response.json()
//       console.log(data);
//       if (data && data.token) {
//         const cookies = new Cookies(null, { path: '/' });
//         cookies.set('token', data.token)
//         Swal.fire({
//           title: 'نجاح!',
//           text: 'تم التسجيل بنجاح',
//           icon: 'success',
//           confirmButtonText: 'حسناً'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             router.push('/').then(() => {
//               router.refresh();
//             });
//           }
//         });
//       } else {
//         throw new Error('Invalid response from server')
//       }
//     } catch (error) {
//       console.error('Login error:', error)
//       setError('البريد الالكتروني او كلمة المرور غير صحيحة')
//     }
//   }
//   //   var errorMessage = ""

//   // async function onSubmit(formData) {
//   //   'use server'
//   //   const email = formData.get('email')
//   //   const password = formData.get('password')

//   //   try {
//   //     const response = await fetch(`${process.env.BASE_URL}/users/login`, {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({ email, password }),
//   //     })

//   //     if (!response.ok) {
//   //       let data = await response.json();
//   //       throw new Error(data.message)
//   //     }

//   //     let data = await response.json()

//   //     if (data && data.token) {
//   //       cookies().set('token', data.token)
//   //       return { success: true, message: 'تم تسجيل الدخول بنجاح' }
//   //     } else {
//   //       throw new Error('Invalid response from server')
//   //     }
//   //   } catch (error) {
//   //     errorMessage=error.message
//   //     console.error('Login error:', error)
//   //     // AlertHandler({message:error.message,type:'error'})
//   //     return { success: false, message: 'البريد الالكتروني او كلمة المرور غير صحيحة' }
//   //   }
//   // }

//   // async function onSubmit(formData) {

//   //   'use server'
//   //  const  result = await loginUser(formData)
//   // //  'use server'
//   //   // const user = await loginUser()
//   //   if (result.success) {
//   //     // revalidatePath('/')
//   //     redirect('/')
//   //   } else {
//   //     // errorMessage = result.error
//   //     return result.error 
//   //   }
//   // }

//   // console.log(errorMessage);

//   return (
//     <div dir="rtl" className="container mt-5">
//       <div className={`row justify-content-center ${styles.loginContainer}`}>
//         <div className="col-md-9">
//           <div className={`card w-100 ${styles.loginCard}`}>
//             <div className="card-body">
//               <div className={`text-center mb-4 ${styles.logo}`}>
//                 <img src="/logo.png" alt="Logo" className="mb-3" />
//                 <h2>تسجيل الدخول</h2>
//                 <p>مستقل</p>
//               </div>

//               <div className={`m-5 d-flex position-relative  ${styles.socialLogin}`}>
//                 <button className="btn btn-danger  position-absolute ">تسجيل الدخول باستخدام Google</button>
//                 <button className="btn btn-primary position-absolute start-0  ">تسجيل الدخول باستخدام Microsoft</button>
//               </div>

//               <div className={`text-center mb-4 ${styles.separator}`}>
//                 <span>أو</span>
//               </div>
//               {error && <div className="alert alert-danger">{error}</div>}

//               <form onSubmit={onSubmit}> {/* ... existing form fields ... */}
//                 <div>
//                   {/* This will display the error message returned by the server action */}
//                   {/* {formData => formData.error && (
//                     <div className="alert alert-danger">{formData.error}</div>
//                   )} */}
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">البريد الإلكتروني *</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     name="email"
//                     placeholder="أدخل البريد الإلكتروني الخاص بك"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">كلمة المرور *</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     id="password"
//                     name="password"
//                     placeholder="أدخل كلمة المرور الخاصة بك"
//                     required
//                   />
//                 </div>
//                 {/* <AlertHandler message={formData?.error} type={'error'} /> */}
//                 {/* <AlertHandler message={formData?.message} type={formData?.success ? 'success' : 'error'} /> */}

//                 <button type="submit" className="btn btn-primary btn-block">دخول</button>
//               </form>

//               <div className={`mt-4 ${styles.assistance}`}>
//                 <ul className="list-unstyled">
//                   <li><a href="#">لا تملك حساب بعد؟</a></li>
//                   <li><a href="#">فقدت كلمة المرور</a></li>
//                   <li><a href="#">لم يصلك رمز التفعيل</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// // "use client";
// // import React, { useState } from 'react';
// // import styles from "./login.module.css";
// // const jwt = require('jsonwebtoken');
// // import axios from 'axios';


// // import { useRouter } from 'next/navigation';
// // import { revalidatePath } from 'next/cache';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const router = useRouter();

// //   function getIdFromToken(token) {
// //     try {
// //       // Decode the token
// //       const decoded = jwt.decode(token);

// //       if (!decoded) {
// //         throw new Error('Failed to decode token');
// //       }
  
// //       // Access the id from the decoded payload
// //       const id = decoded.id; // or decoded.userId, depending on your token structure
  
// //       if (!id) {
// //         throw new Error('ID not found in token payload');
// //       }
  
// //       return id;
// //     } catch (error) {
// //       console.error('Error decoding token:', error);
// //       return null;
// //     }
// //   }
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
   
    
// //     try {
// //       console.log(email);
// //       let response = await axios.post('http://localhost:3344/users/login', {
// //         email:email,
// //         password:password
// //       });
// //       console.log(response.status);
// //       const { data } = response;
      
// //       if (data && data.token) {
// //         localStorage.setItem('token', data.token);
// //         const id = getIdFromToken(data.token);
// //         console.log(id);
// //  // Redirect to dashboard or home page
// //  router.push('/');
// //  revalidatePath('/');
// //       }
// //     } catch (err) {
// //       setError(  'البريد الالكتروني او كلمة المرور غير صحيحة' );
      
// //     }
// //   };


// //   return (
// //     <div dir="rtl" className="container mt-5">
// //       <div className={`row justify-content-center ${styles.loginContainer}`}>
// //         <div className="col-md-9">
// //           <div className={`card w-100 ${styles.loginCard}`}>
// //             <div className="card-body">
// //               <div className={`text-center mb-4 ${styles.logo}`}>
// //                 <img src="/logo.png" alt="Logo" className="mb-3" />
// //                 <h2>تسجيل الدخول</h2>
// //                 <p>مستقل</p>
// //               </div>

// //               <div className={`m-5 d-flex position-relative  ${styles.socialLogin}`}>
// //                 <button className="btn btn-danger  position-absolute ">تسجيل الدخول باستخدام Google</button>
// //                 <button className="btn btn-primary position-absolute start-0  ">تسجيل الدخول باستخدام Microsoft</button>
// //               </div>

// //               <div className={`text-center mb-4 ${styles.separator}`}>
// //                 <span>أو</span>
// //               </div>

// //               {error && <div className="alert alert-danger">{error}</div>}

// //               <form onSubmit={handleSubmit}>
// //                 <div className="form-group">
// //                   <label htmlFor="email">البريد الإلكتروني *</label>
// //                   <input
// //                     type="email"
// //                     className="form-control"
// //                     id="email"
// //                     placeholder="أدخل البريد الإلكتروني الخاص بك"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label htmlFor="password">كلمة المرور *</label>
// //                   <input
// //                     type="password"
// //                     className="form-control"
// //                     id="password"
// //                     placeholder="أدخل كلمة المرور الخاصة بك"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <button type="submit" className="btn btn-primary btn-block">دخول</button>
// //               </form>

// //               <div className={`mt-4 ${styles.assistance}`}>
// //                 <ul className="list-unstyled">
// //                   <li><a href="#">لا تملك حساب بعد؟</a></li>
// //                   <li><a href="#">فقدت كلمة المرور</a></li>
// //                   <li><a href="#">لم يصلك رمز التفعيل</a></li>
// //                 </ul>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;