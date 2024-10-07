
// 'use client';
import React from 'react'
import { getFreelancer } from './layout';
import { FaTag } from "react-icons/fa6";

export default async function FreelancerProfile({params}) {

  const freelancerData  = await getFreelancer(params.id);
  const freelancer = freelancerData.data;   
  // console.log(freelancer.skills[0].name);
 

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
      </div>

</>
   
    
  )
}