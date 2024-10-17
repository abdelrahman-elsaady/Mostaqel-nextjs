'use client'

import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { FaEnvelope } from "react-icons/fa";
import styles from "./navbar.module.css";
import { useAppContext } from "../../context/AppContext";
import Link from 'next/link';

export default function ClientNav() {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [socket, setSocket] = useState(null);
  const { isLoggedIn, userId, token } = useAppContext();

  const initializeSocket = useCallback(() => {
    if (!socket && isLoggedIn) {
      const newSocket = io(process.env.BASE_URL);
      setSocket(newSocket);

      newSocket.on('newMessage', (message) => {
        if (message.receiverId === userId) {
          setUnreadMessages((prev) => prev + 1);
        }
      });

      return () => {
        newSocket.off('newMessage');
        newSocket.close();
      };
    }
  }, [isLoggedIn, socket, userId]);

  useEffect(() => {
    const cleanup = initializeSocket();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initializeSocket]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUnreadMessagesCount();
    }
  }, [isLoggedIn]);

  const fetchUnreadMessagesCount = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/messages/unread-count`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUnreadMessages(data.count);
      }
    } catch (error) {
      console.error('Error fetching unread messages count:', error);
    }
  };

  const handleMessagesClick = () => {
    setUnreadMessages(0);
  };

  return (
    <li className={`nav-item ${styles.navItem}`}>
      <Link className="nav-link text-white position-relative" href="/messages" onClick={handleMessagesClick}>
        <FaEnvelope />
        {unreadMessages > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {unreadMessages}
          </span>
        )}
      </Link>
    </li>
  );
}


// 'use client'

// import { useState, useEffect, useCallback } from 'react';
// import { io } from 'socket.io-client';
// import { FaEnvelope } from "react-icons/fa";
// import styles from "./navbar.module.css";
// import { useAppContext } from "../../context/AppContext";
// import Link from 'next/link';
// export default function ClientNav() {
//   // ... existing code ...
//   const [unreadMessages, setUnreadMessages] = useState(0);
//   const [socket, setSocket] = useState(null);

//   const { isLoggedIn } = useAppContext();

//   const initializeSocket = useCallback(() => {
//     if (!socket && isLoggedIn) {
//       const newSocket = io('http://localhost:3344');
//       setSocket(newSocket);

//       newSocket.on('newMessage', () => {
//         setUnreadMessages((prev) => prev + 1);
//       });

//       return () => {
//         newSocket.off('newMessage');
//         newSocket.close();
//       };
//     }
//   }, [isLoggedIn, socket]);

//   useEffect(() => {
//     const cleanup = initializeSocket();
//     return () => {
//       if (cleanup) cleanup();
//     };
//   }, [initializeSocket]);

//   const handleMessagesClick = () => {
//     setUnreadMessages(0);
//     // Navigate to messages page
//   };

//   // ... existing code ...

//   return (
//     // ... existing JSX ...
//     <li className={`nav-item ${styles.navItem}`}>
//       <Link className="nav-link text-white position-relative" href="/messages" onClick={handleMessagesClick}>
//         <FaEnvelope />
//         {unreadMessages > 0 && (
//           <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//             {unreadMessages}
//           </span>
//         )}
//       </Link>
//     </li>
//     // ... existing JSX ...
//   );
// }