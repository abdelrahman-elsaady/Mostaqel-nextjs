// 'use client'
import { FaUserPlus, FaSignInAlt, FaCubes, FaUsers, FaPlus, FaBars, FaBell, FaEnvelope, FaHome, FaUser } from "react-icons/fa";
import Link from "next/link";
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { FaBriefcase, FaRegHandBackFist } from "react-icons/fa6";
import { GiTicket } from "react-icons/gi";
import { useAppContext } from "../../context/AppContext";
import styles from "./navbar.module.css";
import UserDropdown from "./userDropdown";
import { FaSignOutAlt } from "react-icons/fa";
import ClientNav from "./messageDropdown";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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


  // const { singleFreelancer, isLoggedIn ,} = useAppContext();

  const cookieStore = cookies();
  // console.log(singleFreelancer);


  const token = cookieStore.get('token');

  // let url = process.env.NEXTAUTH_URL
  //     console.log('API URL:', url); 
console.log(token)
  let isLoggedIn = false;
  let user = null;

  if (token) {
    isLoggedIn = true;
    let decoded = jwt.decode(token.value);
    // console.log(decoded)
    // console.log(decoded)
    if (decoded && decoded.id) {
      const userData = await fetchUserData(decoded.id);
      if (userData) {
        user = userData.data;
        console.log(user)
      }
    }
  }
console.log(isLoggedIn);
  const logout = async () => {
     'use server';
    cookies().delete('token');
    // window.location.href = '/';
    revalidatePath('/');
    redirect('/');

  };

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
                  className="nav-link  text-white border border-white p-2 d-flex "
                  href="/register"
                  // style={{fontSize: '12px'}}
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

              <UserDropdown user={user} />
                  {/* <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link text-white" href="/profile">
                      <img
                        src={user.profilePicture || 'https://th.bing.com/th/id/OIP.yYH0Z8hoEboWVtgM6i0xeQHaEK?rs=1&pid=ImgDetMain'}
                        alt="Profile"
                        className={styles.userAvatar}
                      />
                    </Link>
                  </li> */}
                 {/* <li className={`nav-item ${styles.navItem}`}>
                    <Link className="nav-link text-white" href="/notifications">
                      <FaBell />
                    </Link>
                  </li> */}
                  
                    {/* <Link className="nav-link text-white" href="/messages"> */}
                      {/* <FaEnvelope /> */}
                  <ClientNav userId={user._id} />
                    {/* </Link> */}
                  

              </>
            )}
            </ul>
            {/* < Div3Rues/> */}
          </div>

          <div className="col-6  ">

            
            <ul className="d-flex navbar-nav mr-auto  flex-row " style={{height: '100%', fontSize: '14px'}}>
              {/* <p>{user.role} isLoggedIn {isLoggedIn}</p> */}
{(isLoggedIn  && user.role == 'freelancer')?  
(
              <>
              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href={`/freelancers/${user._id}/portfolio`}>
                   اعمالي
                  <FaBriefcase className="ms-1 mt-1" />
                </Link>
              </li>
              <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/freelancers/bids">
                   عروضي
                  <GiTicket className="ms-1 mt-1" />
                </Link>
              </li>
              </>

          ): (
            <>
            </>
          )}

               { (isLoggedIn && user.role == 'client') && (
               <>
               <li className= {`nav-item ${styles.navItem}`}  >
                <Link className="nav-link text-white d-flex" href="/myProjects">
                   مشاريعي
                   <FaBriefcase className="ms-1 mt-1" />
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

{(!isLoggedIn || user.role == 'client') && (
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
                          {!isLoggedIn && (
                            <>
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
                          </>
                          )}

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
                          {isLoggedIn && (
                          <li className={`nav-item ${styles.navItem}`} >
                            <form action={logout}>
                            <button  
                              className="nav-link text-dark d-flex "
                            >
                              <FaSignOutAlt className="ms-1 mt-1" />
                              تسجيل الخروج
                            </button>
                          </form>
                          </li>
                          )}
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
            <Link href="/project" className={`nav-link text-center ${styles.bottomNavLink}`}>
              <FaCubes className={styles.bottomNavIcon} />
              <div>المشاريع</div>
            </Link>
          </li>




          <li className="nav-item dropup">
            
  <button 
    className={`nav-link text-center ${styles.bottomNavLink} dropdown-toggle`}
    data-bs-toggle="dropdown"
    aria-expanded="false"
    data-bs-auto-close="outside"
  >
    <FaUser className={styles.bottomNavIcon} />
    <div>حسابي</div>
  </button>
  <ul className="dropdown-menu ">
    <li  className="" >
      <Link 
        href="/login" 
        className="dropdown-ite text-decoration-none text-dark"
        // data-bs-toggle="dropdown"
      >
        <FaSignInAlt className="me-2" />
        تسجيل دخول
      </Link>
    </li>
    <li>
      <Link 
        href="/register" 
        className="dropdown-item text-decoration-none text-dark"
        // data-bs-toggle="dropdown"
      >
        <FaUserPlus className="me-2" />
        حساب جديد
      </Link>
    </li>
    <li  data-bs-toggle="">
      <Link 
        href="/project/create" 
        className="dropdown-item text-decoration-none text-dark"
        
      >
        <FaPlus className="me-2" />
        أضف مشروع
      </Link>
    </li>
  </ul>
</li>
</ul>
</div>
        




{/* Account Modal */}
{/* <div className="modal fade" id="accountModal" tabIndex="-1" aria-labelledby="accountModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="accountModalLabel">حسابي</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Link href="/login" className="text-decoration-none text-dark" data-bs-dismiss="modal">
              <FaSignInAlt className="me-2" />
              تسجيل دخول
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/register" className="text-decoration-none text-dark" data-bs-dismiss="modal">
              <FaUserPlus className="me-2" />
              حساب جديد
            </Link>
          </li>
          <li className="list-group-item">
            <Link href="/project/create" className="text-decoration-none text-dark" data-bs-dismiss="modal">
              <FaPlus className="me-2" />
              أضف مشروع
            </Link>
          </li>
        </ul>

        
      </div>
    </div>
  </div>


      </div> */}




    </>
  );
}
