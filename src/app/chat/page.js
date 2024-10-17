




'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

export default function ConversationPage({searchParams}) {
  const { conversationId } = searchParams;
  const { isLoggedIn, userId, token } = useAppContext();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');



  useEffect(() => {
    if (isLoggedIn) {
      fetchConversation();
      fetchMessages();
    }
  }, [isLoggedIn, conversationId]);

  const fetchConversation = async () => {
    try {
      const response = await fetch(`http://localhost:3344/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setConversation(data);
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3344/messages/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const response = await fetch(`http://localhost:3344/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            conversationId: conversationId,
            content: newMessage,
            senderId: userId
          }),
        });
        if (response.ok) {
          const sentMessage = await response.json();
          setMessages((prevMessages) => [...prevMessages, sentMessage]);
          setNewMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (!conversation) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{conversation.projectId.title}</h2>
      <div className="messages-container" style={{ height: '400px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <div key={message._id} className={`message ${message.sender === userId ? 'sent' : 'received'}`}>
            <p>{message.content}</p>
            <small>{new Date(message.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}