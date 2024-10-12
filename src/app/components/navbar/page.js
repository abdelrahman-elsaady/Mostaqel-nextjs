
import { FaUserPlus, FaSignInAlt, FaCubes, FaUsers, FaPlus, FaBars, FaBell, FaEnvelope, FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { FaBriefcase } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";

import styles from "./navbar.module.css";



async function fetchUserData(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}











export default async function Navbar() {



  const cookieStore = cookies();


  const token = cookieStore.get('token');

  // let url = process.env.NEXTAUTH_URL
  //     console.log('API URL:', url); 

  let isLoggedIn = false;
  let user = null;

  if (token) {
    isLoggedIn = true;
    const decoded = jwt.decode(token.value);
    if (decoded && decoded.id) {
      const userData = await fetchUserData(decoded.id);
      if (userData) {
        user = userData.data;
      }
    }
  }



  // ... rest of the component remains the same ...


// 'use client'

// import { FaUserPlus } from "react-icons/fa";
// import { FaSignInAlt } from "react-icons/fa";
// import { FaCubes, FaUsers, FaPlus, FaBars } from "react-icons/fa";
// import { useState, useEffect } from 'react';
// import { FaBell, FaEnvelope } from 'react-icons/fa';
// import Link from "next/link";
// // import Cookies from 'js-cookie';
// import { cookies } from 'next/headers'

// // import useLocalStorage from '../../../hooks/useLocalStorage';
// const jwt = require('jsonwebtoken');
// // import { parseCookies } from 'nookies';
// // import Side from "./../reusableComponents/side";

// import styles from "./navbar.module.css";

// export default function Navbar() {

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);


//   const fetchUserData = async (id) => {

//     try {
//       const response = await fetch(`http://localhost:3344/users/${id}`);
//       if (response.ok) {
//         const userData = await response.json();
//         setUser(userData.data);
//         console.log(userData.data);
//       } else {
//         console.error('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }

//   }
//   useEffect(() => {
//     // let cookies = parseCookies();
//     // let token = cookies.token; 
    
//     let token = cookies().get('token')

//     console.log(token);
//     // console.log(cookies);
//     // let token = getCookie('token')

//      if (token) {

//       setIsLoggedIn(true);
//       let decoded = jwt.decode(token);
//       let id = decoded.id;
     
//     fetchUserData(id);
//   }
  
//   }, []);



  // const fetchUserData = async (token) => {
  //   try {
  //     const response = await fetch('http://localhost:3344/users/id');
  //     if (response.ok) {
  //       const userData = await response.json();
  //       setUser(userData);
  //     } else {
  //       console.error('Failed to fetch user data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  return (
    <>
      <div className={`container-fluid  d-none d-md-block ${styles.bodyy}`  }>
        <div className=  {`navvvvv g-0   bg-primary row ${styles.navvvvv}`}>
          <div className="col-6  ">
            <ul className="navbar-nav mr-auto flex-row ">
            {!isLoggedIn ? (
                <>
              <li className={`log-btn  m-2 ${styles.logBtn}`}>
                <Link
                  className="nav-link text-white border border-white p-2 d-flex"
                  href="/register"
                >
                  حساب جديد
                  <FaUserPlus className="ms-1 mt-1" />
                </Link>
              </li>

              <li className={`log-btn  m-2 ${styles.logBtn}`}>
                <Link
                  className=" nav-link text-white border border-white d-flex p-2"
                  href="/login"
                >
                  دخول
                  <FaSignInAlt className=" ms-1 mt-1 " />
                </Link>
              </li>
              </>
            ) : (
              <>
                  <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link text-white" href="/profile">
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className={styles.userAvatar}
                      />
                    </Link>
                  </li>
                 <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link text-white" href="/notifications">
                      <FaBell />
                    </Link>
                  </li>
                  <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link text-white" href="/messages">
                      <FaEnvelope />
                    </Link>
                  </li>

              </>
            )}
            </ul>
            {/* < Div3Rues/> */}
          </div>

          <div className="col-6  ">

            
            <ul className="d-flex navbar-nav mr-auto  flex-row " style={{height: '100%'}}>

{isLoggedIn && (
              <>
              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/project">
                   اعمالي
                  <FaBriefcase className="ms-1 mt-1" />
                </Link>
              </li>
              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/project">
                   عروضي
                  <GiTicket className="ms-1 mt-1" />
                </Link>
              </li>
              </>
)}  

              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/project">
                  تصفح المشاريع
                  <FaCubes className="ms-1 mt-1" />
                </Link>
              </li>

{!isLoggedIn && (
              <li className={`nav-item ${styles.navItem}`} >
                <Link className="nav-link text-white d-flex" href="/freelancers">
                  ابحث عن مستقلين
                  <FaUsers className="ms-1 mt-1" />
                </Link>
              </li>
)}

              <li className={`nav-item ${styles.navItem}`} >
                <Link className="nav-link text-white d-flex" href="/project/create">
                  أضف مشروع
                  <FaPlus className="ms-1 mt-1" />
                </Link>
              </li>
              <li className="pt-2">
              <Link  href="/"  >
                <img
                  className={`logo max-height ${styles.logo}`}
                  src="https://mostaql.hsoubcdn.com/public/assets/images/custom/mostaql-logo-white.svg?id=dc639dfc13cb096309795e9d84ddd15c"
                ></img>
                </Link>
              </li>

              <li className=" ">
                {/* <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar"
                > */}
                  {/* <span className="navbar-toggler-icon"></span> */}
                  {/* <FaBars/> */}
                    
                  <div className="mt-2 ">
                    <button
                      className="btn btn-primary"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasWithBothOptions"
                      aria-controls="offcanvasWithBothOptions"
                    >
                      <FaBars className=" text-light bg-primary h3  " />
                    </button>

                    <div
                      className={`offcanvas offcanvas-end w-25 ${styles.offcanvas} `}
                      style={{ marginTop: 65 }}
                      data-bs-scroll="true"
                      tabIndex="-1"
                      id="offcanvasWithBothOptions"
                      aria-labelledby="offcanvasWithBothOptionsLabel"
                    >
                      <div className="offcanvas-header ">
                        <h5
                          className="offcanvas-title"
                          id="offcanvasWithBothOptionsLabel"
                        >
                          Backdroped with scrolling
                        </h5>
                        <button
                          type="button"
                          className="btn-close text-reset"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>

                      <div className="offcanvas-body" dir="rtl">
                        <ul className="  mr-auto  list-unstyled  ">
                          <li className={`log-btn  m-2 ${styles.logBtn}`}>
                            <Link
                              className="nav-link text-dark border border-white p-2 d-flex"
                              href="/register"
                            >
                              <FaUserPlus className="ms-1 mt-1" />
                              حساب جديد
                            </Link>
                          </li>

                          <li className={`log-btn  m-2 ${styles.logBtn}`}>
                            <Link
                              className=" nav-link  text-dark border border-white d-flex p-2"
                              href="/login"
                            >
                              <FaSignInAlt className=" ms-1 mt-1 " />
                              دخول
                            </Link>
                          </li>
                          <li className={`nav-item ${styles.navItem}`} >
                            <Link
                              className="nav-link text-dark d-flex"
                              href="#"
                            >
                              <FaCubes className="ms-1 mt-1" />
                              تصفح المشاريع
                            </Link>
                          </li>

                          <li className={`nav-item ${styles.navItem}`} >
                            <Link
                              className="nav-link text-dark d-flex"
                              href="#"
                            >
                              <FaUsers className="ms-1 mt-1" />
                              ابحث عن مستقلين
                            </Link>
                          </li>
                          <li className={`nav-item ${styles.navItem}`} >
                            <Link
                              className="nav-link text-dark d-flex"
                              href="/project/create"
                            >
                              <FaPlus className="ms-1 mt-1" />
                              أضف مشروع
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                {/* </button> */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`fixed-bottom bg-white d-md-none ${styles.bottomNav}`}>
        <ul className="nav justify-content-around">
          <li className="nav-item">
            <Link href="/" className={`nav-link text-center ${styles.bottomNavLink}`}>
              <FaHome className={styles.bottomNavIcon} />
              <div>الرئيسية</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/freelancers" className={`nav-link text-center ${styles.bottomNavLink}`}>
              <FaUsers className={styles.bottomNavIcon} />
              <div>المستقلين</div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/projects" className={`nav-link text-center ${styles.bottomNavLink}`}>
              <FaCubes className={styles.bottomNavIcon} />
              <div>المشاريع</div>
            </Link>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link text-center ${styles.bottomNavLink}`} 
              data-bs-toggle="modal" 
              data-bs-target="#accountModal"
            >
              <FaUser className={styles.bottomNavIcon} />
              <div>حسابي</div>
            </button>
          </li>
        </ul>
        </div>

{/* Account Modal */}
<div className="modal fade" id="accountModal" tabIndex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="accountModalLabel">حسابي</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link href="/login" className="text-decoration-none text-dark">
              <FaSignInAlt className="me-2" />
              تسجيل دخول
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/register" className="text-decoration-none text-dark">
              <FaUserPlus className="me-2" />
              حساب جديد
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/project/create" className="text-decoration-none text-dark">
              <FaPlus className="me-2" />
              أضف مشروع
            </Link>
          </li>
        </ul>
        </div>
          </div>
        </div>
      </div>

    </>
  );
}
