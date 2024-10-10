

'use client';
import { MdPerson2 } from "react-icons/md";
import { BiAlarm } from "react-icons/bi";
import { MdOutlineLocalActivity } from "react-icons/md";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import Cookies from 'universal-cookie';

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

  const cookies = new Cookies();
  console.log(cookies.get('token'));
  
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      let url = process.env.BASE_URL
      console.log('API URL:', url); 
      try {
        const response = await axios.get(`${process.env.BASE_URL}/projects`);
        console.log('Fetched projects:', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message || 'An error occurred while fetching projects');
      } finally {
        setIsLoading(false);
      }
    }


    fetchProjects();


  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (

    <>

      <div dir="rtl">

        <div style={{ paddingTop: "20px" }}>
          <p style={{ display: "block" }}> الرئيسية / المشاريع</p>
        </div>

        <div className="container-fluid" style={{ direction: "rtl" }}>
          <div >
            <nav className="navbar navbar-light ">
              <a className="navbar-brand pe-3" href="#">
                المشاريع المفتوحة
              </a>

              <div
                className="d-flex justify-content-between align-items-center "
                style={{ marginLeft: "5%" }}
              >
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    style={{ backgroundColor: '#ffffff', border: '1px solid #000', borderRadius: '0px' }}
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    الاحدث
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">
                      الاقدم
                    </a>
                    <a className="dropdown-item" href="#">
                      الاكثر عروضا
                    </a>
                    <a className="dropdown-item" href="#">
                      الاقل عروضا
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="row mt-4">
            {/* sidebar */}
            <aside className="col-lg-3 col-md-2 pe-5" style={{ marginRight: '60px' }}>
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
                <h5 className="mb-3">التصنيف</h5>
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
                <h5>المهارات</h5>
                <input
                  type="text"
                  className="form-control"
                  style={{ borderRadius: '0px', backgroundColor: '#fafafa' }}

                />
              </div>

              {/* delivery */}
              <div className="mt-4">
                <h5>مدة التسليم</h5>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="delivery1"
                  />
                  <label className="form-check-label" htmlFor="delivery1">
                    أقل من أسبوع واحد
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="delivery2"
                  />
                  <label className="form-check-label" htmlFor="delivery2">
                    من 1 إلى 2 أسابيع
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="delivery3"
                  />
                  <label className="form-check-label" htmlFor="delivery3">
                    من 2 أسابيع إلى شهر
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="delivery4"
                  />
                  <label className="form-check-label" htmlFor="delivery4">
                    من شهر إلى 3 أشهر
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="delivery5"
                  />
                  <label className="form-check-label" htmlFor="delivery5">
                    أكثر من 3 أشهر
                  </label>
                </div>
              </div>

              {/* budget */}
              <div className="mt-4">
                <h5>الميزانية</h5>
                <input
                  type="range"
                  className="form-range"
                  min="25"
                  max="10000"
                  id="budgetRange"
                />
                <div className="d-flex justify-content-between">
                  <span>25.00</span>
                  <span>10000.00</span>
                </div>
              </div>
            </aside>

            {/* content */}
            <section className="col-lg-8 col-md-7" style={{ marginLeft: '30px' }}>
              <div className="list-group">
                {projects.map((project) => (
                  <div key={project._id} className="list-group-item list-group-item-action p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Link className="mb-1" href={`/project/details/${project._id}`} style={{ textDecoration: 'none', color: "#2386c8" }}>{project.title}</Link>
                      <button className="btn btn-sm btn-info" style={{ backgroundColor: "#2386c8", border: 'none', borderRadius: '0px' }}>
                        <i className="bi bi-plus" style={{ color: '#fff', fontSize: 'bold' }}></i>
                        <a href="#" style={{ textDecoration: 'none', color: '#fff' }}> مشروع مماثل</a>
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
                        {project.proposalsCount > 0 ? `${project.proposalsCount} عرض` : 'أضف أول عرض'}
                      </small>

                    </div>
                    <p className="mb-1">{project.description}</p>

                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
