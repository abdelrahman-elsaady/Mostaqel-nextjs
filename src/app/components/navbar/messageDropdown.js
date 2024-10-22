



'use client';

import { useState, useEffect, useRef } from 'react';
import { FaEnvelope ,FaBell} from "react-icons/fa";
import Link from 'next/link';
import { io } from 'socket.io-client';
import styles from "./navbar.module.css";
import { useRouter } from 'next/navigation'

export default function MessageDropdown({ userId }) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter()

  useEffect(() => {
    fetchMessages();
    document.addEventListener('mousedown', handleClickOutside);
  
    // Set up Socket.IO connection
    socketRef.current = io(`${process.env.BASE_URL}`);
    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
      socketRef.current.emit('userConnected', userId);
    });
  
    socketRef.current.on('messageNotification', handleNewNotification);
    socketRef.current.on('moneyReceived', handleMoneyReceived);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current.off('moneyReceived', handleMoneyReceived);

    };
  }, [userId]);
  const handleNewNotification = (notification) => {
    console.log('Received new notification:', notification);
    setMessages(prevMessages => {
      const updatedMessages = [notification, ...prevMessages].slice(0, 5);
      return updatedMessages;
    });
    setMessageUnreadCount(prev => prev + 1);
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/messages/recent/${userId}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('=')[1]}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        setUnreadCount(data.filter(msg => !msg.readBy.includes(userId)).length);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };



  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessageUnreadCount(0);
      markMessagesAsRead();
    }
  };


  const markMessagesAsRead = async () => {
    try {
      const unreadMessageIds = messages
        .filter(msg => !msg.readBy.includes(userId))
        .map(msg => msg._id);
      
      if (unreadMessageIds.length > 0) {
        const promises = unreadMessageIds.map(id => 
          fetch(`${process.env.BASE_URL}/messages/read/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
          })
        );
        await Promise.all(promises);
        
        // Update local state
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            unreadMessageIds.includes(msg._id) ? {...msg, readBy: [...msg.readBy, userId]} : msg
          )
        );
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };


  const handleMoneyReceived = (data) => {
    setNotifications(prev => [{
      type: 'money',
      senderId: data.senderId,
      senderName: data.senderName,
      senderAvatar: data.senderAvatar,
      amount: data.amount,
      timestamp: new Date()
    }, ...prev]);
    setNotificationUnreadCount(prev => prev + 1);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotificationUnreadCount(0);
    }
  };
  const handleMessageClick = (e, conversationId) => {
    e.preventDefault();
    setIsOpen(false);
    router.push(`/chat/${conversationId}`);
  };

  return (
    <>
   <li className={`nav-item ${styles.navItem}`}>
        <div className="dropdown" ref={dropdownRef}>
          <button 
            className={`btn btn-link nav-link dropdown-toggle ${styles.noArrow}`}
            type="button" 
            id="messageDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded={isOpen}
            onClick={toggleDropdown}
            >
            <FaEnvelope className='text-white' />
            {messageUnreadCount > 0 && <span className={`badge rounded-pill ${styles.unreadBadge}`}>{messageUnreadCount}</span>}
          </button>
          <ul className={`dropdown-menu dropdown-menu-end ${isOpen ? 'show' : ''} ${styles.messageDropdown}`} aria-labelledby="messageDropdown">
            <li><h6 className={`dropdown-header ${styles.dropdownHeader}`}>الرسائل</h6></li>
            {messages.map((message, index) => (
            //  <h1 onClick={() => router.push(`/chat/${message.conversationId}`)}>hello</h1> 

              <li key={index}>
{/* <h1 onClick={() => router.push(`/chat/${message.conversationId}`)}>{message.conversationId}</h1> */}
                <Link href={`/chat/${message.conversationId}`} 
                   className={`dropdown-item ${styles.messageItem}`}
                   onClick={(e) => handleMessageClick(e, message.conversationId)}>
                  <div className={styles.messageContent}>
                    <img src={message.senderAvatar} alt={message.senderName} className={styles.senderAvatar} />
                    <div className={`${styles.messageDetails}`}>
                      <p className={styles.projectTitle}>{message.projectTitle}</p>
                      <p className={styles.senderName}>{message.senderName}</p>
                      <p className={styles.messagePreview}>{message.content}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        <li><hr className="dropdown-divider" /></li>
        <li className='dropdown-item'>
          <Link href="/messages" className={`dropdown-item text-center ${styles.viewAllMessages}`}>
            عرض كل الرسائل
          </Link>
        </li>
      </ul>
    </div>
    </li>

    <li className={`nav-item ${styles.navItem}`}>
        <div className="dropdown" >
          <button 
            className={`btn btn-link nav-link dropdown-toggle ${styles.noArrow}`}
            type="button" 
            id="notificationDropdown" 
            data-bs-toggle="dropdown" 
            aria-expanded={showNotifications}
            onClick={toggleNotifications}
          >
            <FaBell className='text-white' />
            {notificationUnreadCount > 0 && <span className={`badge rounded-pill ${styles.unreadBadge}`}>{notificationUnreadCount}</span>}
          </button>
<ul className={`dropdown-menu dropdown-menu-end ${showNotifications ? 'show' : ''} ${styles.notificationDropdown}`} aria-labelledby="notificationDropdown">
  <li><h6 className={`dropdown-header ${styles.dropdownHeader}`}>الإشعارات</h6></li>
  {notifications.map((notification, index) => (
    <li key={index}>
      <div className={`dropdown-item ${styles.notificationItem}`}>
        <div className={styles.notificationContent}>
          <img src={notification.senderAvatar} alt={notification.senderName} className={styles.senderAvatar} />
          <div className={styles.notificationDetails}>
            <p className={styles.notificationText}>
              تم تحويل مبلغ {notification.amount}$ إليك من {notification.senderName}
            </p>
            <p className={styles.notificationTime}>
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
          </div>
              </div>
            </li>
          ))}
          {notifications.length === 0 && (
            <li><div className="dropdown-item text-center">لا توجد إشعارات</div></li>
          )}
        </ul>
      </div>  
    </li>
    </>
  );
}

