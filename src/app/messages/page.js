
'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Link from 'next/link';

export default function Messages() {
  const { isLoggedIn, userId, token } = useAppContext();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchConversations();
    }
  }, [isLoggedIn]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`http://localhost:3344/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Your Conversations</h2>
      <ul className="list-group">
        {conversations.map((conversation) => (
          <li key={conversation._id} className="list-group-item">
            <Link href={`chat?conversationId=${conversation._id}`}>
              {conversation.projectId.title} - 
              {conversation.client === userId ? 'Freelancer' : 'Client'}: 
              {conversation.client === userId ? conversation.freelancerId.firstName : conversation.client.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}










// 'use client';

// import { useState, useEffect } from 'react';
// import { useAppContext } from '../context/AppContext';
// import { io } from 'socket.io-client';
// import { useParams } from 'next/navigation';
// export default function Messages( {searchParams}) {
//   const { isLoggedIn, userId, token } = useAppContext();
//   const [conversations, setConversations] = useState([]);
//   const [selectedConversation, setSelectedConversation] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [socket, setSocket] = useState(null);
//   const { conversationId } = searchParams;

// // const [conversationIdd, setConversationId] = useState(null)

//   console.log(conversationId)
//   useEffect(() => {
//     if (isLoggedIn) {
//       // Fetch conversations
//       fetchConversations();

//       // Initialize socket connection
//       const newSocket = io('http://localhost:3344', {
//         transports: ['websocket', 'polling'], // Allow fallback to polling
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//         timeout: 10000, // Increase timeout
//       });
  
//       newSocket.on('connect', () => {
//         console.log('Socket connected successfully');
//         setSocket(newSocket);
//       });
  
//       newSocket.on('connect_error', (error) => {
//         console.error('Socket connection error:', error);
//         console.log('Error details:', error.description);
//       });
  
//       newSocket.on('error', (error) => {
//         console.error('Socket general error:', error);
//       });
  
//       return () => {
//         if (newSocket) {
//           console.log('Closing socket connection');
//           newSocket.close();
//         }
//       };
//     }
//   }, [isLoggedIn]);

//   useEffect(() => {
//     if (socket) {
//       socket.on('newMessage', (message) => {
//         if (message.conversationId === selectedConversation?._id) {
//           setMessages((prevMessages) => [...prevMessages, message]);
//         }
//         // Update conversation list or show notification
//       });
//     }
//   }, [socket, selectedConversation]);

//   const fetchConversations = async () => {
//     try {
//       const response = await fetch(`http://localhost:3344/conversations`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data)
//         setConversations(data);
//       }
//     } catch (error) {
//       console.error('Error fetching conversations:', error);
//     }
//   };

//   const fetchMessages = async (conversationId) => {
//     try {
//       const response = await fetch(`http://localhost:3344/messages/${selectedConversation._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (response.ok) {
//         console.log(response.body)
//         const data = await response.json();
//         setMessages(data);
//       }
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() && selectedConversation) {
//       try {
//         const response = await fetch(`http://localhost:3344/messages`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             conversationId: selectedConversation._id,
//             content: newMessage,
//             senderId: userId
//           }),
//         });
//         if (response.ok) {
//           const sentMessage = await response.json();
//           setMessages((prevMessages) => [...prevMessages, sentMessage]);
//           setNewMessage('');
//           socket.emit('sendMessage', sentMessage);
//         }
//       } catch (error) {
//         console.error('Error sending message:', error);
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-4">
//           <h2>Conversations</h2>
//           <ul className="list-group">
//             {conversations.map((conversation) => (
//               <li
//                 key={conversation._id}
//                 className={`list-group-item ${selectedConversation?._id === conversation._id ? 'active' : ''}`}
//                 onClick={() => {
//                   setSelectedConversation(conversation);
//                   fetchMessages(conversation._id);
//                 }}
//               >
//                 {conversation.projectId.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="col-md-8">
//           {selectedConversation ? (
//             <>
//               <h2>{selectedConversation.projectId.title}</h2>
//               <div className="messages-container" style={{ height: '400px', overflowY: 'scroll' }}>
//                 {messages.map((message) => (
//                   <div key={message._id} className={`message ${message.sender === userId ? 'sent' : 'received'}`}>
//                     <p>{message.content}</p>
//                     <small>{new Date(message.createdAt).toLocaleString()}</small>
//                   </div>
//                 ))}
//               </div>
//               <div className="input-group mt-3">
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                 />
//                 <button className="btn btn-primary" onClick={handleSendMessage}>
//                   Send
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p>Select a conversation to start messaging</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }