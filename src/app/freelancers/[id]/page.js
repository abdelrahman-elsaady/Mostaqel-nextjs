
// 'use client';
import React from 'react'
import { getFreelancer } from './layout';
import { FaTag } from "react-icons/fa6";
import Rating from '@mui/material/Rating';
export default async function FreelancerProfile({params}) {

  const freelancerData  = await getFreelancer(params.id);
  const freelancer = freelancerData.data;   
  // console.log(freelancer.skills[0].name);
//  console.log(freelancer);

  return (
<>

<div className="row">

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">نبذة عني </h5>
            </div>
            <div className="card-body m-2">
              <p className="card-text">{freelancer.bio}</p>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-body">
              <div className="card-header">
              <h5 className="card-title"> مهاراتي</h5>
              </div>
              <div className='d-flex flex-wrap mt-3'>
                {freelancer.skills.length > 0 ? freelancer.skills.map((skill, index) => (
                  <span key={index} className="badge bg-primary mx-2 my-3"><FaTag />{skill.name}</span>
                )): <p className='text-center'>لا توجد مهارات</p>} 
              </div>
            </div>
          </div>
        </div>



        <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title text-muted "> احصائيات </h5>
              </div>

              <ul className="p-0 list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>التقييم</span>
                  <span className='me-2' dir="ltr">
                  <Rating  name="half-rating-read" value={freelancer.averageRating} precision={0.5} readOnly />
                  </span>
                  {/* <strong>{project.status || 'مفتوح'}</strong> */}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>تاريخ التسجيل</span>
                  <strong>{new Date(freelancer.createdAt).toLocaleDateString('ar-EG')}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>الدولة</span>

                  <strong>{freelancer.country}</strong>

                </li>
                
              </ul>
            </div>

            {/* <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title mb-0">صاحب المشروع</h5>
              </div>

              <div className="card-body">
                <h6>{project.client.firstName}</h6>
                <ul className="list-unstyled mb-0 p-0">

                  <li><small>تاريخ التسجيل: {new Date(project.client.createdAt).toLocaleDateString('ar-EG')}</small></li>
                <li><small>المشاريع المفتوحة: {project.clientOpenProjects || 0}</small></li> 
                </ul>
              </div>
            </div> */}


          </div>












      </div>









</>
   
    
  )
}