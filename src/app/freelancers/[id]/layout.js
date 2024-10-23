import Link from 'next/link';
import { FaUser, FaBriefcase } from 'react-icons/fa';
import React from 'react'
import styless from './layout.module.css'
import { cookies } from 'next/headers'



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
  const cookieStore = cookies()
  const token = cookieStore.get('token')

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
                {freelancer.jobTitle}
              </li>
            </ul>
          </div>
          


          <div className="mt-3  ">
            <ul className="nav nav-tabs ">
<li className="nav-item">
    <Link href={`/freelancers/${id}`} className={`nav-link ${styless.navLink}`}>الملف الشخصي</Link>
  </li>
  <li className="nav-item">
    <Link href={`/freelancers/${id}/reviews`} className={`nav-link ${styless.navLink}`}>التقييمات</Link>
  </li>
  <li className="nav-item">
    <Link href={`/freelancers/${id}/portfolio`} className={`nav-link ${styless.navLink}`}>معرض الأعمال</Link>
  </li>
            {token && (
              <li className="nav-item position-absolute start-0 ">
              {/* <div className="mt-3 position-absolute start-0 "> */}
                <Link href={`/portifolio/create`} className="btn btn-primary ms-2"style={{borderRadius:'0px'}}>
                  اضف عمل
                </Link>
                <Link href={`/account/profile`} className="btn btn-primary " style={{borderRadius:'0px'}}>
                  تعديل الملف الشخصي
                </Link>
              {/* </div> */}
              </li>
            )}
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