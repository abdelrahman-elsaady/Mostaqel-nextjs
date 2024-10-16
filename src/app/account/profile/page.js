

'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import {countries} from 'countries-list';
import { BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';
import { FaBriefcase } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const ProfileCompletion = () => {
  const { userId, isLoggedIn, getFreelancerById, updateProfile, fetchSkillsAndCategories, isProfileComplete ,setSingleFreelancer} = useAppContext();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
const [skillSearch, setSkillSearch] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    language: '',
    gender: '',
    dateOfBirth: '',
    role: '',
    specialization: '',
    bio: '',
    jobTitle: ''
  });

  // useEffect(() => {
  //   if (isProfileComplete) {
     
  //   }
  // }, [isProfileComplete, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userData = await getFreelancerById(userId);
        setUserData(userData);
        setSingleFreelancer(userData);
        if (userData) {
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            country: userData.country || '',
            language: userData.language || '',
            gender: userData.gender || '',
            dateOfBirth: userData.dateOfBirth || '',
            role: userData.role || '',
            category: userData.category ? userData.category._id : '',
            bio: userData.bio || '',
            jobTitle: userData.jobtitle || ''
          });
          console.log(userData);
          setSelectedSkills(userData.skills || []);
          setProfilePicture(userData.profilePicture || null);
          setIsLoading(false);
        }
      }
      const { skills: fetchedSkills, categories: fetchedCategories } = await fetchSkillsAndCategories();
      setSkills(fetchedSkills);
      setCategories(fetchedCategories);
      setIsLoading(false);
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const toggleSkillDropdown = () => {
    setIsSkillDropdownOpen(!isSkillDropdownOpen);
  };
  const handleSkillClick = (skill) => {
    if (!selectedSkills.find((s) => s._id === skill._id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkills(skills.filter((s) => s._id !== skill._id));
      setIsSkillDropdownOpen(false); // Close the dropdown after selection
    }
  };

  const handleRemoveSkill = (skillId) => {
    const removedSkill = selectedSkills.find((skill) => skill._id === skillId);
    setSelectedSkills(selectedSkills.filter((skill) => skill._id !== skillId));
    if (removedSkill) {
      setSkills([...skills, removedSkill].sort((a, b) => a.name.localeCompare(b.name)));
    }
  };
  useEffect(() => {
    if (skillSearch) {
      const filteredSkills = skills.filter(skill => 
        skill.name.toLowerCase().includes(skillSearch.toLowerCase())
      );
      setSkills(filteredSkills);
    } else {
      // Reset to original skills list when search is empty
      fetchSkillsAndCategories().then(({ skills: fetchedSkills }) => {
        setSkills(fetchedSkills);
      });
    }
  }, [skillSearch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    formDataToSend.append('skills', JSON.stringify(selectedSkills.map(skill => skill._id)));
    if (profilePicture) {
      formDataToSend.append('profilePicture', profilePicture);
    }
    const response = await updateProfile(userId, formDataToSend);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'تم حفظ الملف الشخصي بنجاح',
        showConfirmButton: false,
        text: `شكراً ${formData.firstName}`,
        timer: 1500
      }).then(() => {
        router.push('/');
      });
    }
 
    // console.log(response);
    // router.push('/');
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value !== '') && selectedSkills.length > 0;
  };


if (isLoading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
   <div className="spinner-border text-primary" role="status">
     <span className="visually-hidden">جاري التحميل...</span>
  </div>
 </div>;
  return (
    <>
    
    
    <div className="container-fluid py-5" style={{backgroundColor: '#f0f2f5'}} dir='rtl'>
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg">
          <div className="card-body p-5">
            <h1 className="text-center mb-5 text-primary">الملف الشخصي</h1>
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-5">
                <div className="position-relative d-inline-block">
                  <img
                    src={profilePicture || '/default-avatar.png'}
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-circle border border-3 border-primary"
                  />
                  <label htmlFor="profile-picture" className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle">
                    <BsPencilSquare />
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    className="d-none"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </div>
              </div>

              
              <div className="mb-5">
  <label className="form-label fw-bold fs-5 mb-3">  اختر نوع الحساب</label>
  <div className="d-flex justify-content-center gap-4">
    <div className="form-check form-check-inline">
      <input
        className="form-check-input visually-hidden"
        type="radio"
        name="role"
        id="freelancer"
        value="freelancer"
        checked={formData.role === 'freelancer'}
        onChange={handleInputChange}
        required
      />
      <label 
        className={`form-check-label btn btn-lg px-4 py-3 ${
          formData.role === 'freelancer' ? 'btn-primary' : 'btn-outline-primary'
        }`} 
        htmlFor="freelancer"
      >
        <FaUser className="me-2" />
        مقدم خدمة
      </label>
    </div>
    <div className="or-divider pt-3">
      <span className="bg-white px-3 fw-bold fs-5">أو</span>
    </div>
    
    <div className="form-check form-check-inline">
      <input
        className="form-check-input visually-hidden"
        type="radio"
        name="role"
        id="client"
        value="client"
        checked={formData.role === 'client'}
        onChange={handleInputChange}
        required
      />
      <label 
        className={`form-check-label btn btn-lg px-4 py-3 ${
          formData.role === 'client' ? 'btn-primary' : 'btn-outline-primary'
        }`} 
        htmlFor="client"
      >
        <FaBriefcase className="me-2" />
        صاحب عمل
      </label>
    </div>
  </div>
</div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">الاسم</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="الاسم الأول"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">اسم العائلة</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="اسم العائلة"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">الدولة</label>
                  <select
                    className="form-select form-select-lg"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر الدولة</option>
                    {Object.entries(countries).map(([code, country]) => (
                      <option key={code} value={country.name}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">اللغة</label>
                  <select
                    className="form-select form-select-lg"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر اللغة</option>
                    <option value="عربي">عربي</option>
                    <option value="English">English</option>
                  </select>
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">الجنس</label>
                  <select
                    className="form-select form-select-lg"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">اختر الجنس</option>
                    <option value="ذكر">ذكر</option>
                    <option value="أنثى">أنثى</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">تاريخ الميلاد</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
  <label className="form-label fw-bold" >اختر مهاراتك</label>
  <div className="mb-3">
    <div className="form-control  d-flex flex-wrap gap-2 ">
      {selectedSkills.map((skill) => (
        <span key={skill._id} className=" badge bg-primary  d-flex align-items-center ">
          {skill.name}

          <button
            type="button"
            className="btn-close btn-close-white ms-2 small"
            onClick={() => handleRemoveSkill(skill._id)}
          ></button>
        </span>
      ))}
    </div>
  </div>
  <div className="input-group mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="ابحث عن مهارات..."
      onChange={(e) => setSkillSearch(e.target.value)}
    />
  </div>
  <div className="card p-3 mb-3">
    <div className="d-flex flex-wrap gap-2">
      {skills.slice(0, 10).map((skill) => (
        <button
          key={skill._id}
          type="button"
          className="btn btn-sm btn-outline-primary small"
          onClick={() => handleSkillClick(skill)}
        >
          {skill.name}
        </button>
      ))}
    </div>
  </div>
</div>
         

              <div className="mb-4">
                <label className="form-label fw-bold">السيرة الذاتية</label>
                <textarea
                  className="form-control form-control-lg"
                  placeholder="اكتب نبذة عن نفسك"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">المسمى الوظيفي</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="مثال: مصمم جرافيك"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  حفظ الملف الشخصي
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default ProfileCompletion;


