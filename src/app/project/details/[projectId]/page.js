'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaLock, FaLockOpen } from 'react-icons/fa';

import { FaTag } from "react-icons/fa6";
import { Rating } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { useAppContext } from '../../../context/AppContext';
import { FaEnvelope } from 'react-icons/fa';

function formatDateArabic(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diff / (1000 * 60));

  if (diffDays > 0) {
    return `منذ ${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
  } else if (diffHours > 0) {
    return `منذ ${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
  } else if (diffMinutes > 0) {
    return `منذ ${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
  } else {
    return 'منذ لحظات';
  }
}
export default function ProjectDetails() {

  const { getProjectById, isLoggedIn } = useAppContext();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();
  const [proposalForm, setProposalForm] = useState({
    deliveryTime: '',
    amount: '',
    proposal: '',
    receivables: ''
  });
  const [isProjectOwner, setIsProjectOwner] = useState(false);

  const [userId, setUserId] = useState(null);

  // const [loading, setLoading] = useState(true);

  const cookies = new Cookies();
  const token = cookies.get('token');
  const router = useRouter();






  const [proposals, setProposals] = useState([]);



  useEffect(() => {

    if (token) {
      let decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }

    

    let fetchProject = async () => {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProject();

  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'deliveryTime') {
      setProposalForm(prev => {
        const updatedForm = { ...prev, [name]: Math.max(1, parseInt(value)) };
        updatedForm.receivables = calculateEarnings();
        return updatedForm;
      });
    } else {
      setProposalForm(prev => {
        const updatedForm = { ...prev, [name]: value };
      // Update receivables when amount changes
      if (name === 'amount') {
          updatedForm.receivables = calculateEarnings();
        }
        return updatedForm;
      });

  };
}

  const calculateEarnings = () => {
    const price = parseFloat(proposalForm.amount);
    // setProposalForm(prev => ({ ...prev, receivables: price ? (price * 0.8).toFixed(2) : '0.00' }));
    return price ? (price * 0.85).toFixed(2) : '0.00';
  

  };
      



  const formatBudget = (budget) => {
    if (typeof budget === 'object' && budget !== null) {
      if ('min' in budget && 'max' in budget) {
        return `$${budget.min} - $${budget.max}`;
      } else {
        return JSON.stringify(budget); // Fallback for unexpected object structure
      }
    }
    return `$${budget}`; // For simple number value
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    console.log(userId);
    // console.log("userId");
    console.log(project.client._id);
    if (userId == project.client?._id) {
      Swal.fire({
        title: 'بلاش غباوة',
        text: 'لا يمكنك تقديم عرض على مشروعك الخاص',

        imageUrl: "/balaash.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });

      return;
    }

    const hasExistingProposal = project.proposals.some(proposal => proposal.freelancer._id == userId);
    if (hasExistingProposal) {
      Swal.fire({
        title: 'بلاش غباوة',
        text: 'ان مش قدمت قبل كدة هي شغلانة؟',

        imageUrl: "/slap.gif",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.BASE_URL}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...proposalForm,
          project: projectId,
          freelancer: userId
        })
      });
      if (response.ok) {
        Swal.fire({
          title: 'تم إضافة العرض بنجاح',
          icon: 'success'
        });
        // Refresh the page or update the proposals list
        window.location.reload();
      } else {
        throw new Error('Failed to add proposal');
      }
    } catch (error) {
      Swal.fire({
        title: 'فشل إضافة العرض',
        text: 'حاول مرة أخرى',
        icon: 'error'
      });
    }
  };


  const handleStartConversation = async (freelancerId, proposalId, hasChat) => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: projectId,
          freelancerId: freelancerId,
          proposalId: proposalId,
          clientId: project.client._id
        }),
      });
      if (response.ok) {
        const conversation = await response.json();
        console.log(conversation);

        if (conversation.message == 'Conversation already exists') {
          router.push(`/chat/${conversation.conversation._id}`);
        } else {
          router.push(`/chat/${conversation._id}`);
        }

      }
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };
  const handleStatusChange = async () => {
    const newStatus = project.status === 'open' ? 'closed' : 'open';
    try {
      const response = await fetch(`${process.env.BASE_URL}/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setProject(prevProject => ({ ...prevProject, status: newStatus }));
        Swal.fire({
          title: 'تم تحديث حالة المشروع',
          icon: 'success'
        });
      } else {
        throw new Error('Failed to update project status');
      }
    } catch (error) {
      Swal.fire({
        title: 'فشل تحديث حالة المشروع',
        text: 'حاول مرة أخرى',
        icon: 'error'
      });
    }
  };



  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">جاري التحميل...</span>
    </div>
  </div>;
  if (error) return <div className="text-center mt-5 text-danger">خطأ: {error}</div>;
  if (!project) return <div className="text-center mt-5">لم يتم العثور على المشروع</div>;

  return (
    <>
      <div dir="rtl" className="container-fluid pt-4 " style={{ backgroundColor: "#f0f0f0" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className='text-decoration-none' href="/"> الرئيسية /  </Link></li>

            <li className="breadcrumb-item"><Link className='text-decoration-none' href="/projects">  المشاريع  </Link></li>
            <li className="breadcrumb-item active" aria-current="page">{project.title}</li>
          </ol>
        </nav>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 gap-md-0 mb-4">
          <h4 className="mb-0 text-break">{project.title}</h4>
          <div className="d-flex flex-wrap gap-2">
            {/* {} */}
            {project.client?._id && userId == project.client?._id && (
              <button
                className={`btn ${project.status === 'open' ? 'btn-danger' : 'btn-success'} w-100 w-md-auto`}
                onClick={handleStatusChange}
              >
                
                {project.status === 'open' ? <FaLock className="ms-2" /> : <FaLockOpen className="ms-2" />}
                {project.status === 'open' ? 'إغلاق المشروع' : 'فتح المشروع'}
              </button>
            )}

            {!userId && (
              <Link 
                href="/login" 
                className="btn w-100 w-md-auto" 
                style={{backgroundColor: '#2386c8', borderRadius: '0', color: 'white'}}
              >
                سجل الان لتضيف مشروعك
              </Link>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">وصف المشروع</h5>
              </div>
              <div className="card-body m-2">
                <p className="card-text">{project.description}</p>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <div className="card-header">
                  <h5 className="card-title">المهارات المطلوبة</h5>
                </div>
                <div className='d-flex flex-wrap mt-3'>
                  {project.skills && project.skills.map((skill, index) => (
                    <span key={index} className="badge p-2 m-1" style={{borderRadius : '0',backgroundColor : '#2386c8' }} >  <FaTag /> {skill.name}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">أضف عرضك الآن</h5>

                {project.status == 'closed' ? (
                  <div className="alert alert-danger text-center">
                    تم إغلاق المشروع. لا يمكنك تقديم عرض.
                  </div>
                ) : userId ? (
                  <form onSubmit={handleSubmitProposal}>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <p className='mb-2 small text-muted'>مدة التسليم</p>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="مدة التسليم"
                            name="deliveryTime"
                            value={proposalForm.deliveryTime}
                            onChange={handleInputChange}
                            min="1"
                            required
                          />
                          <span className="input-group-text">أيام</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <p className='mb-2 small text-muted'>قيمة العرض</p>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="قيمة العرض"
                            name="amount"
                            value={proposalForm.amount}
                            onChange={handleInputChange}
                            required
                            min="1"
                          />
                          <span className="input-group-text">$</span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <p className='mb-2 small text-muted' >مستحقاتك </p>
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="مستحقاتك"
                            name="receivables"
                            value={calculateEarnings()}
                            disabled
                          />
                          <span className="input-group-text">$</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        placeholder="تفاصيل العرض"
                        name="proposal"
                        value={proposalForm.proposal}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-lg" style={{backgroundColor : '#2386c8',borderRadius : '0',color : 'white'}}>تقديم العرض</button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center">
                    <Link href="/login" className="btn " style={{backgroundColor : '#2386c8',borderRadius : '0',color : 'white'}}>
                      سجل الآن لتقدم عرضك
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-header mb-4">العروض المقدمة</h5>
                {project.proposals.length > 0 ? (
                  <div className="proposals-list">
                    {project.proposals.map((proposal, index) => (
                      <div key={index} className="proposal-item mb-3 pb-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex flex-grow-1">
                            <img
                              src={proposal.freelancer?.profilePicture || '/default-avatar.png'}
                              alt={proposal.freelancer?.firstName}
                              className="rounded-circle me-2"
                              style={{ width: '48px', height: '48px' }}
                            />
                            <div>
                              <div className="d-flex align-items-center">
                                <strong className="me-2">{proposal.freelancer?.firstName}</strong>
                                <div className="star-rating" dir="ltr">
                                  <Rating name="half-rating-read" value={proposal.freelancer?.averageRating} precision={0.5} readOnly />
                                </div>
                              </div>
                              <div className="d-flex text-muted small">
                                <span className='ms-2'>{proposal.freelancer?.jobtitle}</span>
                                <span>{proposal.createdAt ? formatDateArabic(proposal.createdAt) : 'Unknown Date'}</span>
                              </div>
                            </div>
                          </div>
                          {userId == project.client?._id && (
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleStartConversation(proposal.freelancer._id, proposal._id)}
                            >
                              <FaEnvelope className="ms-1" />
                              <span>بدء المحادثة</span>
                            </button>
                          )}
                        </div>
                        <p className="mb-1">
                          {proposal.proposal?.slice(0, 50)}
                          {proposal.proposal?.length > 50 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>لا يوجد عروض بعد.</p>
                )}

              </div>
            </div>
            {/* </div> */}





          </div>





          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title ">بطاقة المشروع</h5>
              </div>

              <ul className="p-0 list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>حالة المشروع</span>
                  <strong>{project.status || 'مفتوح'}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>تاريخ النشر</span>
                  <strong>{new Date(project.createdAt).toLocaleDateString('ar-EG')}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>الميزانية</span>

                  <strong>{formatBudget(project.budget)}</strong>

                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>مدة التنفيذ</span>
                  <strong>{project.deliveryTime} يوم</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>عدد العروض</span>
                  <strong>{project.proposals.length}</strong>
                </li>
              </ul>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">صاحب المشروع</h5>
              </div>

              <div className="card-body">
                <h6>{project.client?.firstName}</h6>
                {/* <p className="text-muted mb-2">{project.clientTitle || 'لقب العميل'}</p> */}
                <ul className="list-unstyled mb-0 p-0">
                  {/* <strong>{new Date(project.createdAt).toLocaleDateString('ar-EG')}</strong> */}

                  <li><small>تاريخ التسجيل: {new Date(project.client?.createdAt).toLocaleDateString('ar-EG')}</small></li>
                  {/* <li><small>معدل التوظيف: {project.clientHireRate || '0.00'}%</small></li>
                <li><small>المشاريع المفتوحة: {project.clientOpenProjects || 0}</small></li> */}
                </ul>
              </div>
            </div>
          </div>


          
        </div>

        {/* <div className="row mt-4">
        <div className="col-12">
          <h2 className="mb-3">أضف عرضك الآن</h2>
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">تقديم عرض</button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <h2 className="mb-3">العروض المقدمة</h2>
          {project.proposalsCount > 0 ? (
            <p>هنا يمكن عرض العروض المقدمة</p>
          ) : (
            <p>لا يوجد عروض بعد.</p>
          )}
        </div>
      </div> */}

        {/* <div className="row mt-4">
        <div className="col-12">
          <h2 className="mb-3">شارك المشروع</h2>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">Twitter</button>
            <button className="btn btn-outline-primary">Facebook</button>
            <button className="btn btn-outline-primary">LinkedIn</button>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}