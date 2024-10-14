

'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import {countries} from 'countries-list';
import { BsPencilSquare } from "react-icons/bs";


const ProfileCompletion = () => {
  const { userId, isLoggedIn, getFreelancerById, updateProfile, fetchSkillsAndCategories, isProfileComplete ,setSingleFreelancer} = useAppContext();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
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

  useEffect(() => {
    if (isProfileComplete) {
      router.push('/');
    }
  }, [isProfileComplete, router]);

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
        }
      }
      const { skills: fetchedSkills, categories: fetchedCategories } = await fetchSkillsAndCategories();
      setSkills(fetchedSkills);
      setCategories(fetchedCategories);
    };
    fetchData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillClick = (skill) => {
    if (!selectedSkills.find((s) => s._id === skill._id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkills(skills.filter((s) => s._id !== skill._id));
    }
  };

  const handleRemoveSkill = (skillId) => {
    const removedSkill = selectedSkills.find((skill) => skill._id === skillId);
    setSelectedSkills(selectedSkills.filter((skill) => skill._id !== skillId));
    if (removedSkill) {
      setSkills([...skills, removedSkill]);
    }
  };

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
    await updateProfile(userId, formDataToSend);
    router.push('/');
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value !== '') && selectedSkills.length > 0;
  };

//   if (!userData) return <div>Loading...</div>;

  return (
    <>
    {/* {isLoggedIn ?   */}
    
    <div className="container py-5" dir="rtl" style={{backgroundColor: '#e9e9e9'}}>
  <h1 className="text-center mb-4">الملف الشخصي</h1>
  <form onSubmit={handleSubmit}>
    <div className="text-center mb-4">
      <div className="position-relative d-inline-block">
        <img
          src={profilePicture || '/default-avatar.png'}
          alt="Profile Picture"
          width={150}
          height={150}
          className="rounded-circle"
        />
        <label htmlFor="profile-picture" className="btn btn-sm btn-primary position-absolute bottom-0 end-0">
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

    <div className="row mb-3">
      <div className="col-md-6 mb-3 mb-md-0">
        <label className="form-label">الاسم</label>
        <input
          type="text"
          className="form-control"
          placeholder="الاسم الأول"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="col-md-6">
        <label className="form-label">اسم العائلة</label>
        <input
          type="text"
          className="form-control"
          placeholder="اسم العائلة"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    <div className="row mb-3">
      <div className="col-md-6 mb-3 mb-md-0">
        <label className="form-label">الدولة</label>
        <select
          className="form-select"
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
        <label className="form-label">اللغة</label>
        <select
          className="form-select"
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

    <div className="row mb-3">
      <div className="col-md-6 mb-3 mb-md-0">
        <label className="form-label">الجنس</label>
        <select
          className="form-select"
          name="gender"
          // defaultValue={formData.gender}
          
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
        <label className="form-label">تاريخ الميلاد</label>
        <input
          type="date"
          className="form-control"
          name="dateOfBirth"
          defaultValue={formData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>

    <div className="mb-3">
      <label className="form-label">نوع الحساب</label>
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="freelancer"
            value="freelancer"
            checked={formData.role === 'freelancer'}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label" htmlFor="freelancer">مقدم خدمة</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="client"
            value="client"
            checked={formData.role === 'client'}
            onChange={handleInputChange}
            required
          />
          <label className="form-check-label" htmlFor="client">صاحب عمل</label>
        </div>
      </div>
    </div>

    <div className="mb-3">
      <label className="form-label">التصنيف</label>
      <select
        className="form-select"
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        required
      >
        <option value="">اختر التصنيف</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    <div className="mb-3">
      <label className="form-label">المهارات</label>
      <div className="d-flex flex-wrap gap-2 mb-2">
        {selectedSkills.map((skill) => (
          <span key={skill._id} className="badge bg-primary">
            {skill.name}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => handleRemoveSkill(skill._id)}
            ></button>
          </span>
        ))}
      </div>
      <div className="d-flex flex-wrap gap-2">
        {skills.map((skill) => (
          <button
            key={skill._id}
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleSkillClick(skill)}
          >
            {skill.name}
          </button>
        ))}
      </div>
    </div>

    <div className="mb-3">
      <label className="form-label">السيرة الذاتية</label>
      <textarea
        className="form-control"
        placeholder="السيرة الذاتية"
        name="bio"
        value={formData.bio}
        onChange={handleInputChange}
        required
      ></textarea>
    </div>

    <div className="mb-3">
      <label className="form-label">المسمى الوظيفي</label>
      <input
        type="text"
        className="form-control"
        placeholder="المسمى الوظيفي"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="text-center">
      <button type="submit" className="btn btn-primary" >
          حفظ
      </button>
    </div>
  </form>
</div>
    {/* : <div>Please login to complete your profile</div>} */}
    </>
  );
};

export default ProfileCompletion;