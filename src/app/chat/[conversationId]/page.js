'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
// import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import { Rating } from '@mui/material';
import Pusher from 'pusher-js';

import styles from '../ChatMessage.module.css';

// import './sssss.css';
export default function ChatPage() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);

  
  const [pusher, setPusher] = useState(null);

  // const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const [clientId, setClientId] = useState(null);
  const [projectStatus, setProjectStatus] = useState('open');
  const [showReview, setShowReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [conversationStatus, setConversationStatus] = useState('open');
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [review, setReview] = useState({
    professionalism: 1,
    communication: 1,
    qualityOfWork: 1,
    expertise: 1,
    onTimeDelivery: 1,
    wouldWorkAgain: 1,
    // comment: ''
  });
  const [reviewComment, setReviewComment] = useState('');
  const [role, setRole] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {


    if (conversation) {
      setProjectStatus(conversation.projectId.status);
    }
    const cookies = new Cookies();
    const token = cookies.get('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }

    fetchConversation();
    checkExistingReview();

    const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    setPusher(pusherInstance);

    return () => {
      if (pusherInstance) {
        pusherInstance.disconnect();
      }
    };

    // socketRef.current = io(`${process.env.BASE_URL}`);
    // socketRef.current.on('connect', () => {
    //   console.log('Connected to Socket.IO server');
    //   socketRef.current.emit('joinConversation', conversationId);
    // });
    // socketRef.current.on('newMessage', handleNewMessage);

    // return () => {
    //   if (socketRef.current) {
    //     socketRef.current.disconnect();
    //   }
    // };


  }, [conversationId, clientId]);

  useEffect(() => {
    if (pusher && conversationId) {
      console.log('Subscribing to chat channel:', `conversation-${conversationId}`);
      const channel = pusher.subscribe(`conversation-${conversationId}`);
      
      channel.bind('new-message', (newMessage) => {
        console.log('Received new chat message:', newMessage);
        
        setMessages(prevMessages => {
          // Check if message already exists to prevent duplicates
          const messageExists = prevMessages.some(msg => msg._id === newMessage._id);
          if (!messageExists) {
            // Important: Ensure the message object structure matches your existing messages
            const formattedMessage = {
              ...newMessage,
              senderId: {
                _id: newMessage.senderId._id,
                firstName: newMessage.senderId.firstName,
                profilePicture: newMessage.senderId.profilePicture
              }
            };
            return [...prevMessages, formattedMessage];
          }
          return prevMessages;
        });
      });

      // Debug: Log connection status
      pusher.connection.bind('connected', () => {
        console.log('Connected to Pusher');
      });

      pusher.connection.bind('error', (err) => {
        console.error('Pusher connection error:', err);
      });

      return () => {
        console.log('Unsubscribing from chat channel');
        channel.unbind('new-message');
        pusher.unsubscribe(`conversation-${conversationId}`);
      };
    }
  }, [pusher, conversationId]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0 && userId) {
      const unreadMessageIds = messages
        .filter(msg => !msg.readBy.includes(userId))
        .map(msg => msg._id);
      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds);
      }
    }
  }, [messages, userId]);

  const checkExistingReview = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/reviews`, {
        headers: {
          'Authorization': `Bearer ${new Cookies().get('token')}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const reviews = await response.json();
        console.log(reviews.users);
        const existingReview = reviews.users.find(review =>
          review.client == conversation.client._id &&
          review.project == conversation.projectId._id &&
          review.freelancer == conversation.freelancerId._id
        );
        console.log(existingReview);
        if (existingReview) {
          setReviewSubmitted(true);
        }
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error checking existing review:', error);
    }
  };

  const markMessagesAsRead = async (messageIds) => {
    try {
      const promises = messageIds.map(id =>
        fetch(`${process.env.BASE_URL}/messages/read/${id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${new Cookies().get('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        })
      );
      await Promise.all(promises);
      // Update local state to reflect that messages have been read
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          messageIds.includes(msg._id) ? { ...msg, readBy: [...msg.readBy, userId] } : msg
        )
      );
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  const fetchConversation = async () => {
    try {
      const conversationResponse = await fetch(`${process.env.BASE_URL}/conversations/${conversationId}`);
      if (!conversationResponse.ok) {
        throw new Error('Failed to fetch conversation');
      }
      const conversationData = await conversationResponse.json();
      setConversation(conversationData);
      setConversationStatus(conversationData.status);
      setClientId(conversationData.client._id);
      if (conversationData.client._id == userId) {
        setRole('client');
      } else {
        setRole('freelancer');
      }
      const messagesResponse = await fetch(`${process.env.BASE_URL}/messages/${conversationId}`);
      if (!messagesResponse.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messagesData = await messagesResponse.json();
      setMessages(messagesData);

    } catch (error) {
      console.error('Error fetching conversation and messages:', error);
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prevMessages) => {
      const messageExists = prevMessages.some(msg => msg._id === message._id);
      if (!messageExists) {
        const newMessages = [...prevMessages, message];
        setTimeout(scrollToBottom, 0);
        return newMessages;
      }
      return prevMessages;
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch(`${process.env.BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${new Cookies().get('token')}`,
        },
        body: JSON.stringify({ 
          content: newMessage, 
          conversationId: conversationId, 
          senderId: userId 
        }),
      });

      if (response.ok) {
        setNewMessage('');
        // Note: We don't need to manually update messages here
        // as Pusher will handle the real-time update
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };


  const handleSendMoney = async () => {
    const result = await Swal.fire({
      title: 'تأكيد التحويل',
      text: `هل أنت متأكد من تحويل ${conversation.proposalId.amount}$ إلى المستقل؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالتحويل',
      cancelButtonText: 'إلغاء'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.BASE_URL}/transactions/transfer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split('=')[1]}`
          },
          body: JSON.stringify({
            senderId: conversation.client._id,
            receiverId: conversation.freelancerId._id,
            amount: conversation.proposalId.amount
          })
        });

        if (response.ok) {
          Swal.fire(
            'تم التحويل!',
            'تم تحويل المبلغ بنجاح.',
            'success'
          )
          // socketRef.current.emit('sendMoney', {
          //   senderId: userId,
          //   receiverId: conversation.freelancerId._id,
          //   amount: conversation.proposalId.amount
          // });
        } else {
          throw new Error('Failed to transfer money');
        }
      } catch (error) {
        Swal.fire(
          'خطأ!',
          'حدث خطأ أثناء تحويل المبلغ.',
          'error'
        );
      }
    }
  };

  // const scrollToBottom = () => {
  // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  if (!conversation) {
    return <div>Loading...</div>;
  }



  const handleAcceptProposal = async () => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد قبول هذا العرض وإغلاق المشروع؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، اقبل العرض',
      cancelButtonText: 'إلغاء'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${process.env.BASE_URL}/projects/${conversation.projectId._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${new Cookies().get('token')}`,
            },
            body: JSON.stringify({ status: 'closed' }),
          });

          if (response.ok) {
            setProjectStatus('closed');
            Swal.fire(
              'تم قبول العرض!',
              'تم تغيير حالة المشروع بنجاح.',
              'success'
            );
            setShowReview(true);
          } else {
            throw new Error('Failed to update project status');
          }
        } catch (error) {
          console.error('Error updating project status:', error);
          Swal.fire(
            'خطأ!',
            'حدث خطأ أثناء تحديث حالة المشروع.',
            'error'
          );
        }
      }
    });
  };
  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${new Cookies().get('token')}`,
        },
        body: JSON.stringify({
          professionalism: review.professionalism,
          communication: review.communication,
          qualityOfWork: review.qualityOfWork,
          expertise: review.expertise,
          onTimeDelivery: review.onTimeDelivery,
          wouldHireAgain: review.wouldWorkAgain,
          // comment: reviewComment,
          project: conversation.projectId._id,
          freelancer: conversation.freelancerId._id,
          client: conversation.client._id,
          comment: reviewComment // Add this state variable
        }),
      });
      console.log(response);
      if (response.status == 200) {
        Swal.fire(
          'تم إرسال التقييم!',
          'شكراً لك على تقييمك.',
          'success'
        );
        setShowReview(false);
        setReviewComment(''); // Reset the comment
        setReviewSubmitted(true);

      } else {
        throw new Error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire(
        'خطأ!',
        'حدث خطأ أثناء إرسال التقييم.',
        'error'
      );
    }
  };
  const handleCancelConversation = async () => {
    const result = await Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هل تريد إلغاء هذه المحادثة؟",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم، قم بالإلغاء',
      cancelButtonText: 'لا، احتفظ بالمحادثة'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${process.env.BASE_URL}/conversations/${conversationId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${new Cookies().get('token')}`,
          },
          body: JSON.stringify({ status: 'closed' }),
        });

        if (response.ok) {
          setConversationStatus('closed');
          Swal.fire(
            'تم الإلغاء!',
            'تم إلغاء المحادثة بنجاح.',
            'success'
          );
        } else {
          throw new Error('Failed to update conversation status');
        }
      } catch (error) {
        console.error('Error updating conversation status:', error);
        Swal.fire(
          'خطأ!',
          'حدث خطأ أثناء إلغاء المحادثة.',
          'error'
        );
      }
    }
  };



  const { proposalId, freelancerId } = conversation;


  // console.log(proposalId);
  // console.log(freelancerId);
  // console.log(conversation);

  return (

    <div className="container-fluid py-5" style={{ backgroundColor: '#f5f5f5' }} >
      <div className='' dir='rtl'>
        <h5 className='mb-3'>الرئيسة/الرسائل</h5>
        <h5 className='mb-3'>{conversation.projectId.title}</h5>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className='d-flex justify-content-between mb-2 '>
            {userId === conversation.client._id && (
              <button
                className="btn btn-success w-40"
                onClick={handleSendMoney}
              >
                <p className='mb-0'>
                  تحويل المبلغ للمستقل
                </p>
                <p className='mb-0'>
                  $ {proposalId.amount}
                </p>
              </button>
            )}
            {(conversationStatus === 'open' && userId == conversation.client._id )&& (
              <button
                className="btn btn-danger w-40 "
                onClick={handleCancelConversation}
              >
                الغاء المحادثة
              </button>
            )}
          </div>
          <div className="card">
            <div className="card-body" dir='rtl'>
              <h5 className="card-title mb-3">صاحب العرض</h5>
              <div className="d-flex align-items-center mb-3 ms-3">
                <img
                  src={freelancerId.profilePicture || '/default-avatar.png'}
                  alt={freelancerId.firstName}
                  width={64}
                  height={64}
                  className="rounded-circle ms-3"
                />
                <div>
                  <h5 className="mb-0">{freelancerId.firstName} {freelancerId.lastName}</h5>
                  <p className="text-muted mb-0">{freelancerId.jobTitle}</p>
                </div>
              </div>
              <p className="text-muted">تاريخ العرض: {new Date(proposalId.createdAt).toLocaleString('ar-EG', { month: 'long', day: '2-digit', year: 'numeric' })}</p>
              <hr />
              <h6 className='text-center mb-3'>تفاصيل العرض</h6>
              <ul className='list-unstyled p-0'>
                <li className='list-group-item mb-2'>
                  <strong>المبلغ:</strong>
                  <span className='float-start'> {proposalId.amount} $</span>
                </li>
                <li className='list-group-item mb-2'>
                  <strong> مدة التنفيذ:</strong>
                  <span className='float-start'>{proposalId.deliveryTime} يوم</span>
                </li>
                {/* <li className='list-group-item mb-2'>
                <strong>العرض:</strong>
                </li> */}
                <li className='list-group-item mb-2'>
                  <p className=''>{proposalId.proposal}</p>
                </li>
              </ul>
            </div>
          </div>


          {userId == conversation.client._id && (
            <>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleAcceptProposal}
                disabled={projectStatus === 'closed'}
              >
                {projectStatus == 'closed' ? 'تم قبول العرض' : 'قبول العرض'}
              </button>

              <div className="mt-3" dir=''>
                <h6 className="text-center mb-3">
                  {reviewSubmitted ? 'تم ارسال التقييم بنجاح' : 'تقييم المستقل'}
                </h6>
                {(!reviewSubmitted && projectStatus == 'closed') && (
                  <>                  <div className="mb-2 d-flex justify-content-between align-items-start">
                    <Rating
                      name="professionalism"
                      value={review.professionalism}
                      onChange={(event, newValue) => {
                        setReview(prev => ({ ...prev, professionalism: newValue }));
                      }}
                    />
                    <span className=' '>الاحترافية بالتعامل</span>
                  </div>
                    <div className="mb-2 d-flex justify-content-between align-items-start">
                      <Rating
                        name="communication"
                        value={review.communication}
                        onChange={(event, newValue) => {
                          setReview(prev => ({ ...prev, communication: newValue }));
                        }}
                      />
                      <span>التواصل والمتابعة</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between align-items-start">
                      <Rating
                        name="qualityOfWork"
                        value={review.qualityOfWork}
                        onChange={(event, newValue) => {
                          setReview(prev => ({ ...prev, qualityOfWork: newValue }));
                        }}
                      />
                      <span>جودة العمل المسلّم</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between align-items-start">
                      <Rating
                        name="expertise"
                        value={review.expertise}
                        onChange={(event, newValue) => {
                          setReview(prev => ({ ...prev, expertise: newValue }));
                        }}
                      />
                      <span>الخبرة بمجال المشروع</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between align-items-start">
                      <Rating
                        name="onTimeDelivery"
                        value={review.onTimeDelivery}
                        onChange={(event, newValue) => {
                          setReview(prev => ({ ...prev, onTimeDelivery: newValue }));
                        }}
                      />
                      <span>التسليم فى الموعد</span>
                    </div>
                    <div className="mb-2 d-flex justify-content-between align-items-start">
                      <Rating
                        name="wouldWorkAgain"
                        value={review.wouldWorkAgain}
                        onChange={(event, newValue) => {
                          setReview(prev => ({ ...prev, wouldWorkAgain: newValue }));
                        }}
                      />
                      <span>التعامل معه مرّة أخرى</span>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="reviewComment" className="form-label">تعليق إضافي</label>
                      <textarea
                        className="form-control"
                        id="reviewComment"
                        rows="3"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={handleReviewSubmit}
                    >
                      ارسال التقييم
                    </button>
                  </>
                )}
              </div>

            </>
          )}


        </div>





        <div className="col-md-8" dir='rtl'>
          <div className="card">
            <div className="card-body">
              {conversationStatus === 'closed' ? (
                <div className="alert alert-warning text-center">
                  تم إغلاق المحادثة
                </div>
              ) : (
                <>
                  
                  <div ref={messagesContainerRef} className={`${styles.chatMessages} chat-messages`} style={{ height: '400px', overflowY: 'auto', padding: '10px' }}>
                    {messages.map((message, index) => (
                     <div key={index} className={`${styles.message} ${message.senderId._id === userId ? styles.sent : styles.received}`}>

                        <div className={styles.messageContent}>
                          <p>{message.content}</p>
                          <span className={styles.messageTime}>
                            {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                          </span>
                        </div>
                        {message.senderId._id == userId && (
                          <p className='text-muted'>انا</p>
                        )}
                        {message.senderId._id !== userId && (
                          <img
                            src={message.senderId._id !== conversation.client._id ? conversation.freelancerId.profilePicture : conversation.client.profilePicture}
                            alt="Sender Avatar"
                            width={30}
                            height={30}
                            className={styles.senderAvatar}
                          />
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <form onSubmit={sendMessage} className="mt-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="اكتب رسالتك..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary" style={{ borderRadius: '5px' }}>ارسال</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}







