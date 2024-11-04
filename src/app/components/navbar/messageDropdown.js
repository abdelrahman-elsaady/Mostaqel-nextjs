'use client';

import { useState, useEffect, useRef } from 'react';
import { FaEnvelope ,FaBell} from "react-icons/fa";
import Link from 'next/link';
// import { io } from 'socket.io-client';
import styles from "./navbar.module.css";
import { useRouter } from 'next/navigation'
import * as Ably from 'ably';


export default function MessageDropdown({ userId }) {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [messageUnreadCount, setMessageUnreadCount] = useState(0);
  const [notificationUnreadCount, setNotificationUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  // const socketRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [ably, setAbly] = useState(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter()

  useEffect(() => {
    fetchMessages();
    document.addEventListener('mousedown', handleClickOutside);
  
    // Initialize Ably
    const ablyInstance = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY
    });
    setAbly(ablyInstance);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (ablyInstance) {
        ablyInstance.close();
      }
    };
  }, []);

  useEffect(() => {
    if (ably && userId) {
      // Subscribe to user-specific channel
      const channel = ably.channels.get(`user-${userId}`);
      
      // Handle message notifications with proper error handling and logging
      const handleMessageNotification = (message) => {
        try {
          console.log('Received message notification:', message.data);
          
          setMessages(prevMessages => {
            // Ensure we're not adding duplicate messages
            const exists = prevMessages.some(msg => msg._id === message.data._id);
            if (!exists) {
              // Add new message to the beginning of the array
              const updatedMessages = [message.data, ...prevMessages].slice(0, 1);
              setMessageUnreadCount(prev => prev + 1);
              return updatedMessages;
            }
            return prevMessages;
          });
        } catch (error) {
          console.error('Error handling message notification:', error);
        }
      };

      // Subscribe to message notifications
      channel.subscribe('message-notification', handleMessageNotification);

      // Debug logging
      channel.on('attached', () => {
        console.log(`Successfully attached to channel user-${userId}`);
      });

      channel.on('error', (error) => {
        console.error('Ably channel error:', error);
      });

      return () => {
        console.log(`Cleaning up subscription for user-${userId}`);
        channel.unsubscribe('message-notification');
      };
    }
  }, [ably, userId]);

  useEffect(() => {
    if (ably && userId) {
      // Subscribe to user-specific channel
      const channel = ably.channels.get(`user-${userId}`);
      
      // Handle money transfer notifications
      channel.subscribe('money-received', (message) => {
        console.log('Received money transfer notification:', message.data);
        
        setNotifications(prev => [{
          type: 'money',
          senderId: message.data.senderId,
          senderName: message.data.senderName,
          senderAvatar: message.data.senderAvatar,
          amount: message.data.amount,
          timestamp: new Date()
        }, ...prev]);
        setNotificationUnreadCount(prev => prev + 1);
      });

      return () => {
        channel.unsubscribe('money-received');
      };
    }
  }, [ably, userId]);

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
        // Set initial unread count
        const unreadCount = data.filter(msg => !msg.readBy.includes(userId)).length;
        setMessageUnreadCount(unreadCount);
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

