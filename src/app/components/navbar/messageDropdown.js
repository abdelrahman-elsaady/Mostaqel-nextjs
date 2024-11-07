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
    fetchNotifications();
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
          
          let saveProposal = async (req, res) => {
            let newProposal = req.body;
            try {
              // Save the proposal
              let savedProposal = await proposalModel.create(newProposal);
          
              // Update related collections in parallel for better performance
              await Promise.all([
                projectModel.findByIdAndUpdate(newProposal.project, { 
                  $push: { proposals: savedProposal._id } 
                }),
                userModel.findByIdAndUpdate(newProposal.freelancer, { 
                  $push: { proposals: savedProposal._id } 
                })
              ]);
          
              // Get project and freelancer details in parallel
              const [project, freelancer] = await Promise.all([
                projectModel.findById(newProposal.project).populate('client'),
                userModel.findById(newProposal.freelancer)
              ]);
          
              // Get Ably instance
              const ably = req.app.get('ably');
          
              // Send notifications in parallel
              await Promise.all([
                // Project channel notification
                ably.channels.get(`project-${project._id}`).publish('new-proposal', {
                  _id: savedProposal._id,
                  freelancerId: freelancer._id,
                  projectId: project._id,
                  amount: newProposal.amount,
                  createdAt: savedProposal.createdAt
                }),
          
                // User channel notification
                ably.channels.get(`user-${project.client._id}`).publish('proposal-notification', {
                  type: 'proposal',
                  _id: savedProposal._id,
                  projectId: project._id,
                  projectTitle: project.title,
                  freelancerId: freelancer._id,
                  freelancerName: freelancer.firstName,
                  freelancerAvatar: freelancer.profilePicture,
                  proposalAmount: newProposal.amount,
                  timestamp: new Date()
                })
              ]);
          
              res.status(200).json({ 
                message: "proposal saved successfully", 
                data: savedProposal 
              });
          
            } catch (err) {
              console.error('Error saving proposal:', err);
              res.status(500).json({ 
                message: "Error saving proposal", 
                error: err.message 
              });
            }
          };(prevMessages => {
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

  useEffect(() => {
    if (ably && userId) {
      const channel = ably.channels.get(`user-${userId}`);
      
      channel.subscribe('proposal-notification', (message) => {
        console.log('Received proposal notification:', message.data);
        
        setNotifications(prev => [{
          type: 'proposal',
          projectId: message.data.projectId,
          projectTitle: message.data.projectTitle,
          freelancerId: message.data.freelancerId,
          freelancerName: message.data.freelancerName,
          freelancerAvatar: message.data.freelancerAvatar,
          amount: message.data.proposalAmount,
          timestamp: message.data.timestamp
        }, ...prev]);
        
        setNotificationUnreadCount(prev => prev + 1);
      });

      return () => {
        channel.unsubscribe('proposal-notification');
      };
    }
  }, [ably, userId]);

  const toggleNotifications = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotificationUnreadCount(0);
      // Mark notifications as read in the backend
      try {
        await fetch(`${process.env.BASE_URL}/notifications/markAsRead/${userId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
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

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/notifications/${userId}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.split('=')[1]}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        // Set initial unread count
        const unreadCount = data.filter(notif => !notif.read).length;
        setNotificationUnreadCount(unreadCount);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
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
        
        // Update local state and reset unread count
        setMessages(prevMessages => 
          prevMessages.map(msg => ({
            ...msg,
            readBy: unreadMessageIds.includes(msg._id) ? [...msg.readBy, userId] : msg.readBy
          }))
        );
        setMessageUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  useEffect(() => {
    if (ably && userId) {
      const channel = ably.channels.get(`user-${userId}`);
      
      const handleNewNotification = async (message) => {
        try {
          // Save notification to backend
          const response = await fetch(`${process.env.BASE_URL}/notifications`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${document.cookie.split('=')[1]}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(message.data)
          });
          
          if (response.ok) {
            const savedNotification = await response.json();
            setNotifications(prev => [savedNotification, ...prev].slice(0, 3));
            setNotificationUnreadCount(prev => prev + 1);
          }
        } catch (error) {
          console.error('Error saving notification:', error);
        }
      };

      channel.subscribe('money-received', handleNewNotification);
      channel.subscribe('proposal-notification', handleNewNotification);

      return () => {
        channel.unsubscribe('money-received');
        channel.unsubscribe('proposal-notification');
      };
    }
  }, [ably, userId]);

  return (
    <>
   <li className={`nav-item ${styles.navItem} mt-1` }>
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

    <li className={`nav-item ${styles.navItem} mt-1`}>
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
          <img src={notification.freelancerAvatar} alt={notification.freelancerName} className={styles.senderAvatar} />
          <div className={styles.notificationDetails}>
            <p className={styles.notificationText} >
              {notification.type === 'money' ? (
                `     ${notification.senderName} اليك من ${notification.amount}$  تم تحويل مبلغ`
              ) : (
                // <Link href={`/project/details/${notification.projectId}`}>
                <Link href={`/project/details/${notification.projectId}`}>
                    {notification.projectTitle} لمشروعك {notification.amount} $ عرضا بقيمة {notification.freelancerName}  قدم 

                 </Link>
              )}
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

