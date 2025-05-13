'use client';
import React, { useState, useEffect } from "react";
import { useAppContext } from './../context/AppContext';
import Link from 'next/link';
import { Rating } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { IoFilterSharp } from "react-icons/io5";

export default function Freelancers() {
  const { freelancers, fetchFreelancers, paginationInfo, categories, fetchCategories } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchFreelancers(page, searchTerm, selectedCategories[0] || ''),
        fetchCategories()
      ]);
      setLoading(false);
    };
    loadData();
  }, [page, selectedCategories]);

  const handleSearch = () => {
    setPage(1);
    fetchFreelancers(1, searchTerm, selectedCategories[0] || '');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [category]
    );
    setPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderCategoryFilters = () => (
    <div>
      <p className="mb-3">التخصص</p>
      {categories.map((category) => (
        <div className="form-check py-2" key={category._id}>
          <input
            type="checkbox"
            className="form-check-input"
            id={`category${category._id}`}
            checked={selectedCategories.includes(category.name)}
            onChange={() => handleCategoryChange(category.name)}
          />
          <label className="form-check-label" htmlFor={`category${category._id}`}>
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );

  const renderSearchInput = () => (
    <div className="mb-3">
      <label htmlFor="search" className="form-label">بحث</label>
      <div className="input-group">
        <input
          type="text"
          id="search"
          className="form-control"
          style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ابحث عن مستقل..."
        />
        <button 
          className="btn btn-primary" 
          type="button"
          onClick={handleSearch}
          style={{ borderRadius: '10px' }}
        >
          بحث
        </button>
      </div>
    </div>
  );

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">جاري التحميل...</span>
    </div>
  </div>;

  return (
    <>
      <div className="container-fluid mb-5" style={{ direction: "rtl", backgroundColor: "#f0f0f0", paddingBottom: '80px' }}>
        <div style={{ paddingTop: "20px" }}>
          <p style={{ display: "block" }}> الرئيسية / المستقلين</p>
        </div>

        <div className="d-flex justify-content-between">
          <div >
            <nav className="navbar navbar-light ">
              <a className="navbar-brand pe-3" style={{ marginRight: "75px" }} href="#">
                <h3>جميع المستقلين</h3>
              </a>
            </nav>
          </div>
          <div className="d-md-none  m-3">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterOffcanvas"
              aria-controls="filterOffcanvas"
            >
              <IoFilterSharp />
            </button>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="filterOffcanvas"
          aria-labelledby="filterOffcanvasLabel"
          style={{ direction: "rtl" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            > عرض النتائج</button>
          </div>
          <div className="offcanvas-body">
            {renderSearchInput()}
            {renderCategoryFilters()}
          </div>
        </div>

        <div className="row mt-4">
          <aside className="col-lg-3 col-md-2 pe-5 d-none d-md-block" style={{ marginRight: '40px' }}>
            {renderSearchInput()}
            {renderCategoryFilters()}
          </aside>

          <section className="col-lg-8 col-md-7" style={{ marginLeft: '50px' }}>
            <div className="list-group">
              {freelancers.length > 0 ? (
                freelancers.map((freelancer) => (
                  <div className="proposals-list" key={freelancer._id}>
                    <Link href={`/freelancers/${freelancer._id}`} className="text-decoration-none">
                      <div className="list-group-item list-group-item-action p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex">
                            <img
                              src={freelancer.profilePicture || '/default-avatar.png'}
                              alt={freelancer.firstName}
                              className="rounded-circle me-2"
                              style={{ width: '64px', height: '64px' }}
                            />
                            <div>
                              <div className="d-flex align-items-center">
                                <strong className="me-2">{freelancer.firstName}</strong>
                                <div className="star-rating" dir="ltr">
                                </div>
                              </div>
                              <div className="d-flex text-muted small">
                                <span className='me-2' dir="ltr">
                                  <Rating name="half-rating-read" value={freelancer.averageRating} precision={0.5} readOnly />
                                </span>
                                <span className='me-2'>
                                  {freelancer.jobtitle}
                                </span>
                                <span className='ms-2'>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mb-1">
                          {freelancer.bio?.slice(0, 150)}
                          {freelancer.bio?.length > 150 ? '...' : ''}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <h4>لا يوجد نتائج</h4>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4">
              {paginationInfo && (
                <Pagination
                  count={paginationInfo.totalPages}
                  page={paginationInfo.currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
