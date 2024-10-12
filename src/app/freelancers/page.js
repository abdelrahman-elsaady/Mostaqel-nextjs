'use client';
import React, { useState, useEffect } from "react";
import { useAppContext } from './../context/AppContext';
import Link from 'next/link';
import { Rating } from '@mui/material';

export default function Freelancers() {
  const { freelancers, fetchFreelancers } = useAppContext();
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    fetchFreelancers();
  }, []);

  useEffect(() => {
    const filtered = freelancers.filter(freelancer => {
      const categoryMatch = selectedCategories.length === 0 || 
        (freelancer.category ? selectedCategories.includes(freelancer.category.name) : false);
      const searchMatch = freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredFreelancers(filtered);
  }, [freelancers, selectedCategories, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
        <div className="mb-3">
          <label htmlFor="search" className="form-label">بحث</label>
          <input
            type="text"
            id="search"
            className="form-control"
            style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <p className="mb-3">التخصص</p>
          {['البرمجة وتطوير الويب'  ,'التصميم والوسائط المتعددة','الكتابة والترجمة','التسويق الرقمي','البيانات والتحليل','مهارات متخصصة','الصوت والفيديو','إدارة الأعمال'].map((category, index) => (
            <div className="form-check" key={index}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`category${index + 1}`}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label className="form-check-label" htmlFor={`category${index + 1}`}>
                {category}
              </label>
            </div>
          ))}
        </div>

            {/* skills */}
            {/* <div className="mt-4">
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
            </div> */}

            {/* delivery */}
            {/* <div className="mt-4">
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
            </div> */}
          </aside>

          {/* content */}
          <section className="col-lg-8 col-md-7" style={{ marginLeft: '50px' }}>
            <div className="list-group">
            {filteredFreelancers.length > 0 ? ( 
              
              filteredFreelancers.map((freelancer, index) => (
          <div className="proposals-list" key={freelancer._id}>
          <Link href={`/freelancers/${freelancer._id}`}  className="text-decoration-none">

          <div  className="list-group-item list-group-item-action p-4">
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

          </div>
        ))
    ) : (
      <h4>  مفييييييييشششش</h4>
    )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
