import { FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaCubes, FaUsers, FaPlus, FaBars } from "react-icons/fa";

import Link from "next/link";

// import Side from "./../reusableComponents/side";

import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <>
      <div className={`container-fluid ${styles.bodyy}`  }>
        <div className=  {`navvvvv g-0   bg-primary row ${styles.navvvvv}`}>
          <div className="col-6  ">
            <ul className="navbar-nav mr-auto flex-row ">
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
            </ul>
            {/* < Div3Rues/> */}
          </div>

          <div className="col-6  ">
            <ul className="d-flex navbar-nav mr-auto position-relative flex-row">
              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/project">
                  تصفح المشاريع
                  <FaCubes className="ms-1 mt-1" />
                </Link>
              </li>

              <li className={`nav-item ${styles.navItem}`} >
                <Link className="nav-link text-white d-flex" href="/">
                  ابحث عن مستقلين
                  <FaUsers className="ms-1 mt-1" />
                </Link>
              </li>
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
    </>
  );
}
