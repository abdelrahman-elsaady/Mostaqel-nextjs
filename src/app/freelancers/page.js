import React from "react";
import axios from "axios";
import { FaStar, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import { Rating } from '@mui/material';
async function getFreelancers() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/users`);
    return response.data.users;
  } catch (err) {
    console.error("Error fetching freelancers:", err);
    return [];
  }
}

export default async function Projects() {

  const freelancers = await getFreelancers();

 console.log(freelancers);
  return (
    <>




                                   
       

      {/* <div style={{ paddingTop: "20px" }}>
        <p style={{ display: "block", marginRight: "100px" }}> الرئيسية</p>
      </div> */}

      <div className="container-fluid" style={{ direction: "rtl",backgroundColor: "#f0f0f0" }} >
        <div >
          <nav className="navbar navbar-light ">
            <a className="navbar-brand pe-3" style={{ marginRight: "75px" }} href="#">
              <h3>ابحث عن مستقلين</h3>
            </a>

          </nav>
        </div>

        <div className="row mt-4">
          {/* sidebar */}
          <aside className="col-lg-3 col-md-2 pe-5" style={{ marginRight: '40px' }}>
            {/* search */}
            <div className="mb-3">
              <label htmlFor="search" className="form-label">
                بحث
              </label>
              <input
                type="text"
                id="search"
                className="form-control"
                style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}
              />
            </div>

            {/*filters */}
            <div>
              <p className="mb-3">التخصص</p>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category1"
                />

                <label className="form-check-label" htmlFor="category1">

                  أعمال وخدمات استشارية
                </label>



              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category2"
                />
                <label className="form-check-label" htmlFor="category2">
                  برمجة، تطوير المواقع والتطبيقات
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category3"
                />
                <label className="form-check-label" htmlFor="category3">
                  هندسة، عمارة وتصميم داخلي
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category4"
                />
                <label className="form-check-label" htmlFor="category4">
                  تصميم، فيديو وصوتيات
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category5"
                />
                <label className="form-check-label" htmlFor="category5">
                  تسويق إلكتروني ومبيعات
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category6"
                />
                <label className="form-check-label" htmlFor="category6">
                  كتابة، تحرير، ترجمة ولغات
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category7"
                />
                <label className="form-check-label" htmlFor="category7">
                  دعم، مساعدة وإدخال بيانات
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="category8"
                />
                <label className="form-check-label" htmlFor="category8">
                  تدريب وتعليم عن بُعد
                </label>
              </div>
            </div>

            {/* skills */}
            <div className="mt-4">
              <p>المسمي الوظيفي</p>
              <input
                type="text"
                className="form-control"
                style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}

              />
            </div>
            <div className="mt-4">
              <p>المهارات</p>
              <input
                type="text"
                className="form-control"
                style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}

              />
            </div>

            {/* delivery */}
            <div className="mt-4">
              <div>
                <p>التقييم</p>
                  <div className="rating">
                    <i className="bi bi-star fs-1"></i>
                    <i className="bi bi-star fs-1"></i>
                    <i className="bi bi-star fs-1"></i>
                    <i className="bi bi-star fs-1"></i>
                    <i className="bi bi-star fs-1"></i>
                  </div>
                
              </div>
              <br />

              <p>المستقلون </p>
              <div className="form-check">
                <label className="form-check-label" htmlFor="delivery1">
                  هوية موثقة                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="delivery2"
                />
                <label className="form-check-label" htmlFor="delivery2">
                  المتصلون الان
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="delivery3"
                />
                <label className="form-check-label" htmlFor="delivery3">
                  أضافوا عروضا علي مشاريعي
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="delivery4"
                />
                <label className="form-check-label" htmlFor="delivery4">
                  وظفتهم سابقا
                </label>

              </div>
            </div>
          </aside>

          {/* content */}
          <section className="col-lg-8 col-md-7" style={{ marginLeft: '50px' }}>
            <div className="list-group">
            {freelancers.length > 0 ? (
      <div className="proposals-list">

        {freelancers.map((freelancer, index) => (
          <Link href={`/freelancers/${freelancer._id}`} key={index} className="text-decoration-none">

          <div key={index} className="list-group-item list-group-item-action p-4">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex">
                <img 
                  src={freelancer.profilePicture || '/default-avatar.png'} 
                  alt={freelancer.firstName} 
                  className="rounded-circle me-2" 
                  style={{width: '48px', height: '48px'}} 
                />
                <div>
                  <div className="d-flex align-items-center">
                    <strong className="me-2">{freelancer.firstName}</strong>
                    <div className="star-rating" dir="ltr">
                    {/* <Rating name="read-only " value={freelancer.averageRating} readOnly /> */}
                   
                    <Rating  name="half-rating-read" value={freelancer.averageRating} precision={0.5} readOnly />

                    </div>
                  </div>
                  <div className="d-flex text-muted small">
                    <span className='ms-2'>

                    {freelancer.jobtitle}
                    </span>
                    
                    <span>

                    {freelancer.projectCompletionRate} %
                    </span>
                    </div>
                </div>
              </div>
        
            </div>
            <p className="mb-1">{freelancer.bio}</p>
          </div>
          </Link>

        ))}
      </div>
    ) : (
      <p>لا يوجد عروض بعد.</p>
    )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
