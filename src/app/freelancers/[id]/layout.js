import Link from 'next/link';
import { FaUser, FaBriefcase } from 'react-icons/fa';
import React from 'react'
import styless from './layout.module.css'

export async function getFreelancer(id) {
  const res = await fetch(`${process.env.BASE_URL}/users/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch freelancer data');
  }
  return res.json();
}




export default async function FreelancerLayout({ children, params }) {
  const { id } = params;
  const freelancerData = await getFreelancer(id);
  const freelancer = freelancerData.data;

  if (!freelancer) return <div>Freelancer not found</div>;

  return (

    
    
 


    <div className="container-fluid" dir='rtl'>
      <div className="row">
        <div className="col-md-12 text-center pt-3">
          <div className="d-flex justify-content-center position-relative">
            <img
              src={freelancer.profilePicture || '/Default-user.png'}
              width={128}
              height={128}
              className="rounded-circle"
              alt={`${freelancer.firstName}`}
            />
          </div>
          <div className="mt-3">
            <h4 className="mt-2">
              {freelancer.firstName} {freelancer.lastName}
            </h4>
            <ul className="list-unstyled mt-2 list-inline p-0">
              <li className="list-inline-item m-2">
                <FaUser className="ms-2" />
                {freelancer.role === "freelancer" ? "مستقل" : "صاحب اعمال"}
              </li>
              <li className="list-inline-item">
                <FaBriefcase className="ms-2" />
                {freelancer.jobtitle}
              </li>
            </ul>
          </div>
          
          {/* Add the three links */}
          <div className="mt-3">
            <ul className="nav nav-tabs ">
              <li className="nav-item">
                <Link href={`/freelancers/${id}`} className={`nav-link active ${styless.medhat}`}  >الملف الشخصي</Link>
              </li>
              <li className="nav-item">
                <Link href={`/freelancers/${id}/reviews`} className="nav-link active"  >التقييمات</Link>
              </li>
              <li className="nav-item">
                <Link href={`/freelancers/${id}/portfolio`} className="nav-link active"  >معرض الأعمال</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Content area for nested routes */}
      <div className="row mt-4">
        <div className="col-md-12">
          {/* Pass the freelancer data to the children */}
          {children && React.cloneElement(children, { freelancer })}
        </div>
      </div>
    </div>
  );
}