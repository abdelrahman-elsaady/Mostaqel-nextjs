'use client';
import React, { useState, useEffect } from "react";
import { useAppContext } from './../context/AppContext';
import Link from 'next/link';
import { Rating } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export default function Freelancers() {
  const { freelancers, fetchFreelancers } = useAppContext();
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [freelancersPerPage] = useState(8);

  useEffect(() => {
    const loadFreelancers = async () => {
      await fetchFreelancers();
      setLoading(false);
    };
    loadFreelancers();
  }, []);

  useEffect(() => {
    const filtered = freelancers.filter(freelancer => {
      const categoryMatch = selectedCategories.length === 0 || 
        (freelancer.category ? selectedCategories.includes(freelancer.category.name) : false);
      const searchMatch = freelancer.firstName.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredFreelancers(filtered);
    setPage(1);
  }, [freelancers, selectedCategories, searchTerm]);





  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastFreelancer = page * freelancersPerPage;
  const indexOfFirstFreelancer = indexOfLastFreelancer - freelancersPerPage;
  const currentFreelancers = filteredFreelancers.slice(indexOfFirstFreelancer, indexOfLastFreelancer);

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

  if (loading) return  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">جاري التحميل...</span>
  </div>
</div>;

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

           
          </aside>

          {/* content */}
          <section className="col-lg-8 col-md-7" style={{ marginLeft: '50px' }}>
            <div className="list-group">
            {currentFreelancers.length > 0 ? ( 
              
              currentFreelancers.map((freelancer, index) => (
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
                   

                    </div>
                  </div>
                  <div className="d-flex text-muted small">
                   <span className='me-2' dir="ltr">
                    <Rating  name="half-rating-read" value={freelancer.averageRating} precision={0.5} readOnly />
                   </span>
                    <span className='me-2'>

                    {freelancer.jobtitle}

                    </span>
                    <span className='ms-2'>

                    {/* {freelancer.projectCompletionRate} % */}
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
            <div className="d-flex justify-content-center mt-4">
          <Pagination
            count={Math.ceil(filteredFreelancers.length / freelancersPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
          </section>
        </div>
      </div>
    </>
  );
}
