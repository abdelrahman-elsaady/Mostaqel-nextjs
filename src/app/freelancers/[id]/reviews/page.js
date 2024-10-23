// 'use client';
import React from 'react'
// import { getFreelancer } from './layout';
// import { FaTag } from "react-icons/fa6";
import { Rating } from '@mui/material';

export default async function Reviews({params}) {

  const res = await fetch(`${process.env.BASE_URL}/reviews/freelancer/${params.id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch freelancer data');
  }
  const reviews = await res.json();
  console.log(reviews.reviews);

  
  let ratingBreakdown =reviews.ratingBreakdown

  return (

<>



{/* <div className='row'== */}
<div className="row" >


  {reviews.reviews.length > 0 ? (
    <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title"> التقييمات </h5>
            </div>
            <div className="card-body m-2">
              <ul className='list-group list-group-flush p-0 m-0'dir='ltr'>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.professionalism} precision={0.5} readOnly />
                  <span>الاحترافية بالتعامل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.communication} precision={0.5} readOnly />
                  <span>التواصل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.qualityOfWork} precision={0.5} readOnly />
                  <span>جودة العمل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.expertise} precision={0.5} readOnly />
                  <span>الخبرة</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.onTimeDelivery} precision={0.5} readOnly />
                  <span>التسليم بالوقت</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={ratingBreakdown.wouldHireAgain} precision={0.5} readOnly />
                  <span>التعامل مره اخرى</span>
                </li>
              </ul> 
            </div>


          </div>




          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">آراء العملاء</h5>
            </div>
            {reviews.reviews.map((review  ,index)=>(
            <div className="card-body m-2" key={index}>
              <h6>{review.project.title}</h6>
              <ul className='list-group list-group-flush p-0 m-0'dir='ltr'>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={review.professionalism} precision={0.5} readOnly />
                  <span>الاحترافية بالتعامل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                    <Rating  name="half-rating-read" value={review.communication} precision={0.5} readOnly />
                  <span>التواصل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={review.qualityOfWork} precision={0.5} readOnly />
                  <span>جودة العمل</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={review.expertise} precision={0.5} readOnly />
                  <span>الخبرة</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={review.onTimeDelivery} precision={0.5} readOnly />
                  <span>التسليم بالوقت</span>
                </li>
                <li className='list-group-item d-flex justify-content-between' >
                  <Rating  name="half-rating-read" value={review.wouldHireAgain} precision={0.5} readOnly />
                  <span>التعامل مره اخرى</span>
                </li>
              </ul> 

              <div className='mt-2 list-group '>
              <div className="list-group-item d-flex">
                <img 
                  src={review.client.profilePicture || '/default-avatar.png'} 
                  alt={review.client.firstName} 
                  className="rounded-circle me-2" 
                  style={{width: '48px', height: '48px'}} 
                />
                <div>
                  <div className=" ">
                    <strong className="me-2">{review.client.firstName}</strong>
                  </div>
                    <h6 className='ms-2 small'>

                      صاحب المشروع
                      </h6>
                    <h6 className='ms-2 mt-2'>

                      {review.comment}
                      </h6>

                </div>
              </div>
              </div>



            </div>
            ))}
          </div>
          </div>
  ) : (
    <div className="col-lg-8">
      <div className="card mb-4">
        <div className="card-body">
          <p>    لسه مفييش </p>
        </div>
      </div>
    </div>
  )}

           <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title text-muted "> احصائيات </h5>
              </div>

              <ul className="p-0 list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>التقييم</span>
                  <span className='me-2' dir="ltr"> 
                  <Rating  name="half-rating-read" value={reviews.freelancer.averageRating} precision={0.5} readOnly />
                  </span>

                  {/* <strong>{project.status || 'مفتوح'}</strong> */}
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>تاريخ التسجيل</span>
                  <strong>{new Date(reviews.freelancer.createdAt).toLocaleDateString('ar-EG')}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>الدولة</span>

                  <strong>{reviews.freelancer.country}</strong>

                </li>
                
              </ul>
            </div>
            </div>







</div>



     
</>
  )
}
