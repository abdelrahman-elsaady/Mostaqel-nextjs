

'use client';

import { useState, useEffect, useRef } from 'react';
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from 'next/link';
import styles from "./navbar.module.css";
import { useRouter } from 'next/navigation';
import { FaDollarSign } from "react-icons/fa";

import Cookies from 'universal-cookie';

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {

    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/';
};

  return (
    <li className={`nav-item ${styles.navItem}`}>
      <div className="dropdown" ref={dropdownRef}>
        <button 
          className={`btn btn-link nav-link dropdown-toggle ${styles.noArrow}`}
          type="button" 
          id="userDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        >
          <img
            src={user.profilePicture || 'https://th.bing.com/th/id/OIP.yYH0Z8hoEboWVtgM6i0xeQHaEK?rs=1&pid=ImgDetMain'}
            alt="Profile"
            className={styles.userAvatar}
          />
        </button>
        <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''} ${styles.userDropdown}`} aria-labelledby="userDropdown">
          <li><h6 className={`dropdown-header ${styles.dropdownHeader}`}>حسابي</h6></li>
          <li>
            <Link href={`/freelancers/${user._id}`} className={`dropdown-item ${styles.dropdownItem}`}>
              <FaUser className={styles.dropdownIcon} />
              الملف الشخصي
            </Link>
          </li>
          <li>
            <Link href="/account/profile" className={`dropdown-item ${styles.dropdownItem}`}>
              <FaCog className={styles.dropdownIcon} />
              الإعدادات
            </Link>
          </li>
          
          <li style={{hover: {backgroundColor: "#5794ce"}}}>
            <Link href="/payment" className={`dropdown-item ${styles.dropdownItem}`}>
              <FaDollarSign className={styles.dropdownIcon} />
              الرصيد
            </Link>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button onClick={handleSignOut} className={`dropdown-item ${styles.dropdownItem}`}>
              <FaSignOutAlt className={styles.dropdownIcon} />
              تسجيل الخروج
            </button>
          </li>
        </ul>
      </div>
    </li>
  );
}