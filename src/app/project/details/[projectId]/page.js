'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaTag } from "react-icons/fa6";
import { FaStar, FaRegStar } from 'react-icons/fa';
// import { formatDistanceToNow } from 'date-fns';
// import { ar } from 'date-fns/locale';
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


  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();
  // const [proposals, setProposals] = useState([]);


  const [proposals, setProposals] = useState([]);
          useEffect(() => {
            const fetchProjectAndProposals = async () => {
              try {
                // Ensure projectId is a string
                const id = projectId.toString();
                
                const [projectResponse, proposalsResponse] = await Promise.all([
                  fetch(`http://localhost:3344/projects/${id}`),
                  fetch(`http://localhost:3344/proposals/project/${id}`)
                ]);
        
                if (!projectResponse.ok) {
                  throw new Error('Failed to fetch project data');
                }
        
                const projectData = await projectResponse.json();
                setProject(projectData);
        
                if (proposalsResponse.ok) {
                  const proposalsData = await proposalsResponse.json();
                  setProposals(proposalsData.proposals);
                  console.log(proposalsData.proposals);
                } else {
                  console.log('No proposals found or error fetching proposals');
                  setProposals([]);
                }
        
                setLoading(false);
              } catch (err) {
                setError(err.message);
                setLoading(false);
              }
            };
        
            fetchProjectAndProposals();
          }, [projectId]);


  const formatBudget = (budget) => {
    if (typeof budget === 'object' && budget !== null) {
      if ('min' in budget && 'max' in budget) {
        return `$${budget.min} - $${budget.max}`;
      } else {
        return JSON.stringify(budget); // Fallback for unexpected object structure
      }
    }
    return `$${budget}`; // For simple number values
  };



  if (loading) return <div className="text-center mt-5">جاري التحميل...</div>;
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

      <div className="d-flex justify-content-between align-items-center mb-4">
      <h4 className="mb-0">{project.title}</h4>
      <Link href="/login" className="btn btn-primary">
        سجل الان لتضيف مشروعك
      </Link>
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
                  <span key={index} className="badge bg-primary mx-2 my-3"><FaTag />{skill.name}</span>
                ))}
              </div>
            </div>
          </div>

        <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-4">أضف عرضك الآن</h5>
              <div className=" text-center">
                <button className="btn btn-primary btn-lg ">  سجل الان لتقدم عرضك </button>
              </div>
            </div>
          </div>



<div className="card mb-4">
  <div className="card-body">
    <h5 className="card-header mb-4">العروض المقدمة</h5>
    {proposals.length > 0 ? (
      <div className="proposals-list">
        {proposals.map((proposal, index) => (
          <div key={index} className="proposal-item mb-3 pb-3 border-bottom">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex">
                <img 
                  src={proposal.freelancer.profilePicture || '/default-avatar.png'} 
                  alt={proposal.freelancer.firstName} 
                  className="rounded-circle me-2" 
                  style={{width: '48px', height: '48px'}} 
                />
                <div>
                  <div className="d-flex align-items-center">
                    <strong className="me-2">{proposal.freelancer.firstName}</strong>
                    <div className="star-rating">
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(proposal.freelancer.rating) ? 
                          <FaStar key={i} className="text-warning" /> : 
                          <FaRegStar key={i} className="text-warning" />
                      ))}
                    </div>
                  </div>
                  <div className="d-flex text-muted small">
                    <span className='ms-2'>

                    {proposal.freelancer.jobtitle}
                    </span>
                    
                    <span>

                    {proposal.createdAt ? formatDateArabic(proposal.createdAt) : 'Unknown Date'}
                    </span>
                    </div>
                </div>
              </div>
        
            </div>
            <p className="mb-1">{proposal.proposal}</p>
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
                <strong>{project.deliveryTime}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>عدد العروض</span>
                <strong>{project.proposalsCount || 0}</strong>
              </li>
            </ul>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title mb-0">صاحب المشروع</h5>
            </div>
          
            <div className="card-body">
              <h6>{project.client.firstName }</h6>
              {/* <p className="text-muted mb-2">{project.clientTitle || 'لقب العميل'}</p> */}
              <ul className="list-unstyled mb-0 p-0">
                                {/* <strong>{new Date(project.createdAt).toLocaleDateString('ar-EG')}</strong> */}

                <li><small>تاريخ التسجيل: {new Date(project.client.createdAt).toLocaleDateString('ar-EG')}</small></li>
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