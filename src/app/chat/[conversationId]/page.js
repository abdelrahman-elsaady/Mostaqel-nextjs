'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
// import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';
import { Rating } from '@mui/material';
import * as Ably from 'ably';
import { FiPaperclip, FiFile, FiFileText } from 'react-icons/fi';
import { AiOutlineFilePdf, AiOutlineFileWord } from 'react-icons/ai';

import styles from '../ChatMessage.module.css';

// import './sssss.css';

// Add these style changes at the top of the component
const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '2rem 1rem',
  },
  breadcrumb: {
    backgroundColor: 'transparent',
    padding: '0.5rem 0',
    marginBottom: '1.5rem',
  },
  sidePanel: {
    marginBottom: '1.5rem',
  },
  actionButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  proposalCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: 'none',
  },
  chatCard: {
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: 'none',
    height: 'calc(100vh - 200px)',
  },
  messageInput: {
    borderRadius: '20px',
    padding: '0.75rem',
    border: '1px solid #dee2e6',
  },
  sendButton: {
    borderRadius: '20px',
    padding: '0.75rem 1.5rem',
  },
  attachButton: {
    borderRadius: '20px',
    padding: '0.75rem',
    marginRight: '0.5rem',
  }
};

export default function ChatPage() {
  const { conversationId } = useParams();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState(null);

  
  const [ably, setAbly] = useState(null);

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
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const pusherConfig = {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    forceTLS: true
  };

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
  
    // Initialize Ably
    const ably = new Ably.Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
      clientId: userId // if you have userId available
    });

    setAbly(ably);

    return () => {
      if (ably) {
        ably.close();
      }
    };
  }, [conversationId, clientId]);

  // Subscribe to conversation updates
  useEffect(() => {
    if (ably && conversationId && userId) {
      console.log('Subscribing to Ably channels...');
      
      // Subscribe to conversation channel
      const conversationChannel = ably.channels.get(`conversation-${conversationId}`);
      
      const messageHandler = (message) => {
        console.log('Received message from Ably:', message.data);
        handleNewMessage(message.data);
      };

      conversationChannel.subscribe('new-message', messageHandler);

      // Subscribe to user notifications
      const userChannel = ably.channels.get(`user-${userId}`);
      userChannel.subscribe('message-notification', (message) => {
        console.log('Received notification:', message.data);
        // Handle notification if needed
      });

      return () => {
        console.log('Unsubscribing from Ably...');
        conversationChannel.unsubscribe('new-message', messageHandler);
        userChannel.unsubscribe();
        conversationChannel.detach();
        userChannel.detach();
      };
    }
  }, [ably, conversationId, userId]);

  useEffect(() => {
    if (messages.length > 0) {
      const scrollTimeout = setTimeout(() => {
        scrollToBottom('smooth');
      }, 100);
      return () => clearTimeout(scrollTimeout);
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom('auto');
    }
  }, []); // Run once on mount

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
        const formattedMessage = {
          ...message,
          senderId: {
            _id: message.senderId
          }
        };
        const newMessages = [...prevMessages, formattedMessage];
        // Trigger scroll after adding new message
        setTimeout(scrollToBottom, 100);
        return newMessages;
      }
      return prevMessages;
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const messageContent = newMessage.trim();
    if (messageContent === '') return;

    // Clear input immediately for better UX
    setNewMessage('');

    try {
      const response = await fetch(`${process.env.BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${new Cookies().get('token')}`,
        },
        body: JSON.stringify({
          content: messageContent,
          conversationId: conversationId,
          senderId: userId
        }),
      });

      if (!response.ok) {
        console.error('Failed to send message');
        // Optionally restore the message if sending failed
        setNewMessage(messageContent);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally restore the message if sending failed
      setNewMessage(messageContent);
    }
  };

  const scrollToBottom = (behavior = 'smooth') => {
    if (messagesContainerRef.current) {
      const scrollHeight = messagesContainerRef.current.scrollHeight;
      const height = messagesContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: behavior
      });
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
          'شكراً لك على تقييك.',
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
        'حدث خطأ أثناء إرسال تقييم.',
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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire(
          'خطأ!',
          'نوع الملف غير مدعوم. يرجى اخ��يار ملف PDF أو Word أو TXT أو صورة.',
          'error'
        );
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        Swal.fire(
          'خطأ!',
          'حجم الملف كبير جدًا. الحد الأقصى هو 10 ميجابايت.',
          'error'
        );
        return;
      }

      setSelectedFile(file);
      handleFileSend(file);
    }
  };

  const handleFileSend = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('conversationId', conversationId);
      formData.append('senderId', userId);

      const response = await fetch(`${process.env.BASE_URL}/messages/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${new Cookies().get('token')}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      // Clear the selected file
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Swal.fire(
        'خطأ!',
        'حدث خطأ أثناء رفع الملف.',
        'error'
      );
    }
  };

  const renderMessage = (message) => {
    if (message.fileUrl) {
      const fileName = message.fileUrl.split('/').pop();
      const fileExtension = fileName.split('.').pop().toLowerCase();
      
      // Handle image files
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        return (
          <div className={styles.fileMessage}>
            <img 
              src={message.fileUrl} 
              alt="Shared image" 
              className={styles.sharedImage}
              onClick={() => window.open(message.fileUrl, '_blank')}
            />
            <div className={styles.downloadLinks}>
              <a 
                href={message.fileUrl} 
                download={fileName}
                className={styles.downloadLink}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                فتح الصورة
              </a>
            </div>
          </div>
        );
      } else {
        // Handle other file types
        let FileIcon = FiFile;
        let fileType = 'ملف';
        
        if (fileExtension === 'pdf') {
          FileIcon = AiOutlineFilePdf;
          fileType = 'PDF م��ف';
        } else if (['doc', 'docx'].includes(fileExtension)) {
          FileIcon = AiOutlineFileWord;
          fileType = 'Word ملف';
        } else if (fileExtension === 'txt') {
          FileIcon = FiFileText;
          fileType = 'نص ملف';
        }

        return (
          <div className={styles.fileMessage}>
            <div className={styles.fileInfo}>
              <FileIcon className={styles.fileIcon} />
              <span>{fileName}</span>
            </div>
            <div className={styles.fileDetails}>
              <span className={styles.fileType}>{fileType}</span>
              <span className={styles.fileSize}>
                {message.fileSize ? `${(message.fileSize / 1024 / 1024).toFixed(2)} MB` : ''}
              </span>
            </div>
            <div className={styles.downloadLinks}>
              <a 
                href={message.fileUrl} 
                className={styles.downloadLink}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(message.fileUrl, '_blank');
                }}
              >
                فتح الملف
              </a>
              {/* <a 
                href={message.fileUrl} 
                download={fileName}
                className={styles.downloadLink}
              >
                تحميل الملف
              </a> */}
            </div>
          </div>
        );
      }
    }
    
    return <p>{message.content}</p>;
  };

  return (
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb} dir='rtl'>
        <h5 className='mb-2'>الرئيسة / الرسائل</h5>
        <h4 className='mb-3'>{conversation?.projectId.title}</h4>
      </div>

      <div className="row">
        {/* Side Panel */}
        <div className="col-lg-4 col-md-12" style={styles.sidePanel}>
          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            {userId === conversation?.client._id && (
              <button
                className="btn btn-success flex-grow-1"
                onClick={handleSendMoney}
              >
                <div>تحويل المبلغ للمستقل</div>
                <div>$ {proposalId?.amount}</div>
              </button>
            )}
            {(conversationStatus === 'open' && userId == conversation?.client._id) && (
              <button
                className="btn btn-outline-danger flex-grow-1"
                onClick={handleCancelConversation}
              >
                الغاء المحادثة
              </button>
            )}
          </div>

          {/* Proposal Card */}
          <div className="card" style={styles.proposalCard}>
            <div className="card-body" dir='rtl'>
              <h5 className="card-title mb-3">صاب العرض</h5>
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

          {/* Accept Proposal & Review Section */}
          {userId == conversation?.client._id && (
            <div className="mt-3">
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
          )}
        </div>

        {/* Chat Section */}
        <div className="col-lg-8 col-md-12">
          <div className="card" style={styles.chatCard}>
            <div className="card-body d-flex flex-column">
              {conversationStatus === 'closed' ? (
                <div className="alert alert-warning text-center">
                  تم إغلاق المحادثة
                </div>
              ) : (
                <>
                  {/* Messages Container */}
                  <div 
                    ref={messagesContainerRef}
                    className={`${styles.chatMessages} flex-grow-1`}
                    style={{ 
                      overflowY: 'auto',
                      marginBottom: '1rem',
                      padding: '1rem'
                    }}
                  >
                    {messages.map((message, index) => (
                      <div key={index} className={`${styles.message} ${message.senderId._id === userId ? styles.sent : styles.received}`}>
                        <div className={styles.messageContent}>
                          {renderMessage(message)}
                          <span className={styles.messageTime}>
                            {new Date(message.createdAt).toLocaleTimeString('en-US', { 
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                        </div>
                        {message.senderId._id == userId && (
                          <p className='text-muted'></p>
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

                  {/* Message Input Form */}
                  <form onSubmit={sendMessage} className="mt-auto">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        style={styles.messageInput}
                        placeholder="اكتب رسالتك..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="d-none"
                        id="fileInput"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                      />
                      <label 
                        htmlFor="fileInput" 
                        className="btn btn-outline-secondary"
                        style={styles.attachButton}
                      >
                        <FiPaperclip />
                      </label>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={styles.sendButton}
                      >
                        ارسال
                      </button>
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







