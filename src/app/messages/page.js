
'use client'


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
export default function FreelancerChats() {

  const [conversations, setConversations] = useState([]);
  // const router = useRouter();
  const [userId, setUserId] = useState('');

  let cookies = new Cookies();
  const [token, setToken] = useState( );
const [loading, setLoading] = useState(true);



  useEffect(() => {

    let token = cookies.get('token');

    setToken(token);
 
    if(token){  
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
          console.log(userId);
    const fetchConversations = async () => {
      try {

    
        const response = await axios.get(`${process.env.BASE_URL}/conversations/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
           
        const data = response.data.conversations;
        setConversations(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();
    
  }, [userId]);



  if(loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">جاري التحميل...</span>
  </div>
</div>;

  return (
    <div className="container-fluid py-5" style={{ direction: "rtl", backgroundColor: "#f0f0f0" }}>
      <div>
        <nav className="navbar navbar-light">
          <a className="navbar-brand pe-3" style={{ marginRight: "75px" }} href="#">
            <h3>الرسائل</h3>
          </a>
        </nav>
      </div>

      <div className="row mt-4">
        <section className="col-lg-8 col-md-7 mx-auto">
          <div className="list-group">
            {conversations.length > 0 ? (
              conversations.map((conversation) => (
                <Link href={`/chat/${conversation._id}`} key={conversation._id} className="text-decoration-none">
                  <div className="list-group-item list-group-item-action p-4">
                      <h5 className="mb-2 text-primary">{conversation.projectId.title}</h5>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex">
                        <img 
                          src={userId == conversation.client._id ? conversation.freelancerId.profilePicture : conversation.client.profilePicture || '/default-avatar.png'} 
                          alt={userId == conversation.client._id ? conversation.freelancerId.firstName : conversation.client.firstName} 
                          className="rounded-circle " 
                          style={{width: '48px', height: '48px'}} 
                        />
                        <div>
                          <div className="d-flex align-items-center">
                            <strong className="me-2">{userId == conversation.client._id ? conversation.freelancerId.firstName : conversation.client.firstName}</strong>
                          </div>
                          <div className="text-muted small me-2">
                            {userId == conversation.client._id ? conversation.freelancerId.jobTitle : conversation.client.jobTitle}
                          </div>
                        </div>
                      </div>
                      <div className="text-muted small">
                        {/* {new Date(conversation.lastMessage.createdAt).toLocaleString()} */}
                      </div>
                    </div>
                    <p className="mb-1">{conversation.lastMessage.content}</p>
                  </div>
                  </Link>
              ))
            ) : (
              <h4>لا توجد محادثات</h4>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}