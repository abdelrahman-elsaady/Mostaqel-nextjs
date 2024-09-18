
import { FaUserPlus } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaCubes, FaUsers, FaPlus,FaBars } from "react-icons/fa";

import Link from "next/link";

import "./navbar.css";

export default function Navbar() {
  return (
    <>

      <div className="container-fluid">
        {/* <div className="d-flex">
        <h1 className="col-5">fsds</h1>
        <h1 className="col">fsds</h1>
        <h1 className="col">fsds</h1>
        <h1 className="col">fsds</h1>
        <h1 className="col">fsds</h1>
        <h1 className="col">fsds</h1>
        </div>  */}

        <div className=" navbar-expand-lg   bg-primary row">

          <div className="col-6   ">
            <ul className="navbar-nav mr-auto  ">
              <li className="log-btn m-2">
                <Link
                  className="nav-link text-white border border-white p-2 d-flex"
                  href="#"
                >
                  حساب جديد
                  <FaUserPlus className="ml-2 mt-1" />
                </Link>
              </li>

              <li className="log-btn m-2 ">
                <Link
                  className=" nav-link text-white border border-white d-flex p-2"
                  href="#"
                >
                  دخول
                  <FaSignInAlt className="ml-2 mt-1" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 d-flex  ">

            <ul className="d-flex navbar-nav mr-auto position-relative">
              <li className="nav-item ">
                <Link className="nav-link text-white d-flex" href="#">
                  تصفح المشاريع
                  <FaCubes className="ml-2 mt-1" />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white d-flex" href="#">
                  ابحث عن مستقلين
                  <FaUsers className="ml-2 mt-1" />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white d-flex" href="#">
                  أضف مشروع
                  <FaPlus className="ml-2 mt-1" />
                </Link>
              </li>
              <li className="p-2">
                <img
                  className="logo max-height"
                  src="https://mostaql.hsoubcdn.com/public/assets/images/custom/mostaql-logo-white.svg?id=dc639dfc13cb096309795e9d84ddd15c"
                ></img>
              </li>

              <li className="nav-item navbar px-3 text-white ">
                <button className="">
                <FaBars className="h5" />
                </button>
                 
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
