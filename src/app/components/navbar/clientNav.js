// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { FaEnvelope } from "react-icons/fa";
// import styles from "./navbar.module.css";

// export default function ConversationModal({ userId }) {
//   const [conversations, setConversations] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const router = useRouter();

//   const fetchConversations = async () => {
//     try {
//       const response = await fetch(`${process.env.BASE_URL}/conversations/user/${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${document.cookie.split('=')[1]}`
//         }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setConversations(data);
//         const unread = data.filter(conv => conv.hasUnreadMessages).length;
//         setUnreadCount(unread);
//       } else {
//         console.error('Failed to fetch conversations');
//       }
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//     }
//   };

//   const handleMessageClick = () => {
//     fetchConversations();
//     setIsModalOpen(true);
//   };

//   const handleConversationClick = (conversationId) => {
//     router.push(`/chat/${conversationId}`);
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <button className="nav-link text-white" onClick={handleMessageClick}>
//         <FaEnvelope />
//         {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount}</span>}
//       </button>

//       {isModalOpen && (
//         <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">المحادثات</h5>
//                 <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
//               </div>
//               <div className="modal-body">
//                 {conversations.map(conv => (
//                   <div key={conv._id} className="conversation-item" onClick={() => handleConversationClick(conv._id)}>
//                     <img src={conv.otherUser.profilePicture} alt={conv.otherUser.firstName} className="avatar" />
//                     <div>
//                       <h6>{conv.project.title}</h6>
//                       <p>{conv.otherUser.firstName} {conv.otherUser.lastName}</p>
//                     </div>
//                     {conv.hasUnreadMessages && <span className="unread-indicator"></span>}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }