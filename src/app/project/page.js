

'use client';
import { MdPerson2 } from "react-icons/md";
import { BiAlarm } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";
import { useAppContext } from '../context/AppContext';

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

export default function Projects() {

  // const cookies = new Cookies();
  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // console.log(cookies.get('token'));
  
  const { projects, fetchProjects, isLoggedIn ,token} = useAppContext();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(token);
  useEffect(() => {
    fetchProjects();
    // setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(project => {
      const categoryMatch = selectedCategories.length === 0 || 
        (project.category ? selectedCategories.includes(project.category.name) : false);
      const searchMatch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
    setFilteredProjects(filtered);
    console.log(projects);
    setLoading(false);
  }, [projects, selectedCategories, searchTerm]);


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

      <div dir="rtl" style={{backgroundColor:"#f0f0f0"}}>

        <div style={{ paddingTop: "20px" }}>
          <p style={{ display: "block" }}> الرئيسية / المشاريع</p>
        </div>

        <div className="container-fluid" style={{ direction: "rtl" }}>
          <div >
            <nav className="navbar navbar-light ">
              <a className="navbar-brand pe-3" href="#">
                المشاريع المفتوحة
              </a>

           
            </nav>
          </div>

          <div className="row mt-4">
            {/* sidebar */}
            <aside className="col-lg-3 col-md-2 pe-5" style={{ marginRight: '60px' }}>
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
          <h5 className="mb-3">التصنيف</h5>
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
            <section className="col-lg-8 col-md-7" style={{ marginLeft: '30px' }}>
              <div className="list-group">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div key={project._id} className="list-group-item list-group-item-action p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Link className="mb-1" href={`/project/details/${project._id}`} style={{ textDecoration: 'none', color: "#2386c8" }}>{project.title}</Link>
                      <button className="btn btn-sm btn-info" style={{ backgroundColor: "#2386c8", border: 'none', borderRadius: '0px' }}>
                        <i className="bi bi-plus" style={{ color: '#fff', fontSize: 'bold' }}></i>
                        {/* <a href="#" style={{ textDecoration: 'none', color: '#fff' }}> مشروع مماثل</a> */}
                      </button>
                    </div>

                    <div className="mb-3" style={{fontSize:12 }}>

                      <small className="pe-3">
                        <MdPerson2 />
                        {project.client.firstName}
                      </small>

                      <small className="pe-3">
                        <BiAlarm />
                      {project.createdAt ? formatDateArabic(project.createdAt) : 'Unknown Date'}
                      </small >

                      <small className="pe-3">
                        <MdOutlineLocalActivity />
                        {project.proposals.length > 0 ? `${project.proposals.length} عرض` : 'أضف أول عرض'}
                      </small>

                    </div>
                    <p className="mb-1">{project.description}</p>

                  </div>
                  ))
                ) : (
                  <p>المشروع اللي بتدور عليه مش موجود ينجم</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
