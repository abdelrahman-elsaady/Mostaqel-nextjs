





'use client';
import { MdPerson2 } from "react-icons/md";
import { BiAlarm } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";
import { useAppContext } from '../../context/AppContext';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
// import Cookies from 'universal-cookie';

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

export default function UserProposals() {
    const { token, userId,getFreelancerById } = useAppContext();
    const [userProposals, setUserProposals] = useState([]);
    const [filteredProposals, setFilteredProposals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProposals = async () => {
        try {
          const response = await getFreelancerById(userId)
          console.log(response.proposals);
          setUserProposals(response.proposals);
          setFilteredProposals(response.proposals);
          
        } catch (error) {
          console.error('Error fetching user proposals:', error);
        }
      };
  
      fetchUserProposals();
      setLoading(false);

    }, [userId, token]);
  
    useEffect(() => {
      const filtered = userProposals.filter(proposal => 
        proposal.project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProposals(filtered);
      setLoading(false);

    }, [userProposals, searchTerm]);
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    if (loading) return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  
    return (
      <>
      {/* <h1>hello</h1> */}
        <div dir="rtl" style={{backgroundColor:"#f0f0f0"}} className='py-5'>
          <div style={{ paddingTop: "20px" }}>
            <p style={{ display: "block" }}> الرئيسية / عروضي</p>
          </div>
  
          <div className="container-fluid" style={{ direction: "rtl" }}>
            <div>
              <nav className="navbar navbar-light">
                <a className="navbar-brand pe-3" href="#">
                  عروضي
                </a>
              </nav>
            </div>
  
            <div className="row mt-4">
              


              <aside className="col-lg-3 col-md-2 pe-5" style={{ marginRight: '60px' }}>
                <div className="mb-3">
                  <label htmlFor="search" className="form-label">بحث في عناوين المشاريع</label>
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </aside>
  
              

              <section className="col-lg-8 col-md-7" style={{ marginLeft: '30px' }}>
                <div className="list-group">
                  {/* {filteredProposals.length === 0 && (
                    <p>لا توجد عروض بعد</p>
                  )} */}
                     
                
                  {filteredProposals.length > 0 ? (
                    filteredProposals.map((proposal) => (
                      <div key={proposal._id} className="list-group-item list-group-item-action p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <Link className="mb-1" href={`/project/details/${proposal.project._id}`} style={{ textDecoration: 'none', color: "#2386c8" }}>
                            {proposal.project.title}
                          </Link>
                          <span className="badge bg-secondary">{proposal.project.status}</span>
                        </div>
  
                        <div className="mb-3" style={{fontSize: 12}}>
                          <small className="pe-3">
                            <MdPerson2 />
                            {proposal.project.client.firstName}
                          </small>
  
                          <small className="pe-3">
                            <BiAlarm />
                            نشر منذ {proposal.project.createdAt ? formatDateArabic(proposal.project.createdAt) : 'Unknown Date'}
                          </small>
                        </div>
  
                        <p className="mb-1">{proposal.proposal}</p>
                      </div>
                    ))
                  ) : (
                    <p>لا توجد عروض  </p>
                  )}
                  
                </div>

              </section>
            </div>
          </div>
        </div>
      </>
    );
  }

// 'use client';
// import { MdPerson2 } from "react-icons/md";
// import { BiAlarm } from "react-icons/bi";
// import { useAppContext } from '../context/AppContext';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from "next/link";

// function formatDateArabic(dateString) {
//   // ... (keep the existing formatDateArabic function)
// }

// export default function UserProposals() {
//   const { token, userId } = useAppContext();
//   const [userProposals, setUserProposals] = useState([]);
//   const [filteredProposals, setFilteredProposals] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProposals = async () => {
//       try {
//         const response = await axios.get(`/api/users/${userId}/proposals`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserProposals(response.data);
//         setFilteredProposals(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user proposals:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserProposals();
//   }, [userId, token]);

//   useEffect(() => {
//     const filtered = userProposals.filter(proposal => 
//       proposal.project.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredProposals(filtered);
//   }, [userProposals, searchTerm]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   if (loading) return (
//     <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">جاري التحميل...</span>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div dir="rtl" style={{backgroundColor:"#f0f0f0"}}>
//         <div style={{ paddingTop: "20px" }}>
//           <p style={{ display: "block" }}> الرئيسية / عروضي</p>
//         </div>

//         <div className="container-fluid" style={{ direction: "rtl" }}>
//           <div>
//             <nav className="navbar navbar-light">
//               <a className="navbar-brand pe-3" href="#">
//                 عروضي
//               </a>
//             </nav>
//           </div>

//           <div className="row mt-4">
//             {/* sidebar */}
//             <aside className="col-lg-3 col-md-2 pe-5" style={{ marginRight: '60px' }}>
//               <div className="mb-3">
//                 <label htmlFor="search" className="form-label">بحث في عناوين المشاريع</label>
//                 <input
//                   type="text"
//                   id="search"
//                   className="form-control"
//                   style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </div>
//             </aside>

//             {/* content */}
//             <section className="col-lg-8 col-md-7" style={{ marginLeft: '30px' }}>
//               <div className="list-group">
//                 {filteredProposals.length > 0 ? (
//                   filteredProposals.map((proposal) => (
//                     <div key={proposal._id} className="list-group-item list-group-item-action p-4">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <Link className="mb-1" href={`/project/details/${proposal.project._id}`} style={{ textDecoration: 'none', color: "#2386c8" }}>
//                           {proposal.project.title}
//                         </Link>
//                         <span className="badge bg-secondary">{proposal.project.status}</span>
//                       </div>

//                       <div className="mb-3" style={{fontSize: 12}}>
//                         <small className="pe-3">
//                           <MdPerson2 />
//                           {proposal.project.client.firstName}
//                         </small>

//                         <small className="pe-3">
//                           <BiAlarm />
//                           نشر منذ {proposal.project.createdAt ? formatDateArabic(proposal.project.createdAt) : 'Unknown Date'}
//                         </small>
//                       </div>

//                       <p className="mb-1">{proposal.title}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>لا توجد عروض مطابقة للبحث</p>
//                 )}
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }