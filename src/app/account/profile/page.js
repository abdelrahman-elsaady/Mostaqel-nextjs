'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import { FaCamera } from "react-icons/fa";
import axios from 'axios';
import { countries } from 'countries-list';
import { BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';
import { FaBriefcase } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ar from 'date-fns/locale/ar-SA';
import { addYears, differenceInYears } from 'date-fns'; // Add this import
import styles from './styles.module.css';
// import { FaUserCircle } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import { useForm } from 'react-hook-form';

// Register Arabic locale for the date picker
registerLocale('ar', ar);
setDefaultLocale('ar');



const ProfileCompletion = () => {


  const { isLoggedIn, getFreelancerById, updateProfile, fetchSkillsAndCategories, isProfileComplete, setSingleFreelancer } = useAppContext();

  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);

  const [skillSearch, setSkillSearch] = useState('');

  const [userId, setUserId] = useState('');

  const [imageError, setImageError] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      languages: '',
      gender: '',
      dateOfBirth: '',
      role: '',
      specialization: '',
      bio: '',
      jobtitle: '',
      category: ''
    }
  });

  const arabCountries = {
    SA: countries.SA,
    AE: countries.AE,
    BH: countries.BH,
    KW: countries.KW,
    OM: countries.OM,
    QA: countries.QA,
    YE: countries.YE,
    JO: countries.JO,
    LB: countries.LB,
    PS: countries.PS,
    SY: countries.SY,
    IQ: countries.IQ,
    EG: countries.EG,
    SD: countries.SD,
    LY: countries.LY,
    TN: countries.TN,
    DZ: countries.DZ,
    MA: countries.MA,
    MR: countries.MR,
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (value.trim().length < 3) {
          error = 'يجب أن يحتوي على 3 أحرف على الأقل';
        }
        break;
      case 'bio':
        if (value.trim().length < 25) {
          error = 'يجب أن تحتوي السيرة الذاتية على 25 حرفاً على الأقل';
        }
        break;
      case 'jobtitle':
        if (value.trim().length < 5) {
          error = 'يجب أن يحتوي المسمى الوظيفي على 5 أحرف على الأقل';
        }
        break;
      case 'dateOfBirth':
        const age = differenceInYears(new Date(), new Date(value));
        if (age < 15) {
          error = 'يجب أن يكون عمرك 15 عاماً على الأقل';
        }
        break;
      case 'role':
        if (value == '') {
          error = 'يجب أن تختار نوع الحساب';
        }
        break;
    }

    return error;
  };


  // useEffect(() => {
  //   if (isProfileComplete) {

  //   }
  // }, [isProfileComplete, router]);
  // const [cookies, setCookies] = useCookies(['token']);
  let cookies = new Cookies();
  const [token, setToken] = useState(cookies.get('token'));



  useEffect(() => {
    const fetchData = async () => {
      try {
        // First fetch categories and skills
        const { skills: fetchedSkills, categories: fetchedCategories } = await fetchSkillsAndCategories();
        setSkills(fetchedSkills);
        setCategories(fetchedCategories);

        // Then fetch user data and set form values
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.id);
          
          const userData = await getFreelancerById(decoded.id);
          setUserData(userData);
          setSingleFreelancer(userData);
          
          if (userData) {
            setValue('firstName', userData.firstName || '');
            setValue('lastName', userData.lastName || '');
            setValue('country', userData.country || '');
            setValue('languages', userData.languages || '');
            setValue('gender', userData.gender || '');
            setValue('dateOfBirth', userData.dateOfBirth ? new Date(userData.dateOfBirth) : '');
            setValue('role', userData.role || '');
            setValue('category', userData.category ? userData.category._id : '');
            setValue('bio', userData.bio || '');
            setValue('jobtitle', userData.jobtitle || '');
            
            setSelectedSkills(userData.skills || []);
            setProfilePicture(userData.profilePicture || null);
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Remove userId from dependencies since we get it from token

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
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
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageError('يرجى اختيار ملف صورة صالح (jpg, jpeg, png, gif)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setProfilePicture(result);
        setImageError(''); // Clear any previous errors
      };
      reader.onerror = () => {
        setImageError('حدث خطأ أثناء قراءة الملف');
      };
      reader.readAsDataURL(file);
    }
  };



  const onSubmit = handleSubmit(async (data) => {
    try {
      const formDataToSend = new FormData();
      Object.keys(data).forEach(key => formDataToSend.append(key, data[key]));
      formDataToSend.append('skills', JSON.stringify(selectedSkills.map(skill => skill._id)));
      if (profilePicture) {
        formDataToSend.append('profilePicture', profilePicture);
      }

      const response = await updateProfile(userId, formDataToSend);
      if (response.message === 'User was edited successfully') {
        Swal.fire({
          icon: 'success',
          title: 'تم حفظ الملف الشخصي بنجاح',
          showConfirmButton: false,
          text: `شكراً ${data.firstName}`,
          timer: 1500
        }).then(() => {
          window.location.href = '/';
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء حفظ البيانات'
      });
    }
  });


  // console.log(response);

  // router.push('/');


  const isFormComplete = () => {
    return Object.values(formData).every(value => value !== '') && selectedSkills.length > 0;
  };
  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
    const error = validateField('dateOfBirth', date);
    setErrors({ ...errors, dateOfBirth: error });
  };

  if (isLoading) return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">جاري التحميل...</span>
    </div>
  </div>;


  return (
    <>


      <div className="container-fluid py-5" style={{ backgroundColor: '#f0f2f5' }} dir='rtl'>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h1 className="text-center mb-5 text-primary " style={{ color: '#2386c8' }} >الملف الشخصي</h1>
                <form onSubmit={onSubmit}>
                  <div className="text-center mb-5">
                    <div className="position-relative d-inline-block">
                      <label htmlFor="profile-picture" className="cursor-pointer">
                        <div className="profile-picture-container">
                          <img
                            src={profilePicture || '/default-avatar.png'}
                            alt="Profile Picture"
                            width={150}
                            height={150}
                            className="rounded-circle border border-3 border-primary "
                          />
                          <div className="profile-picture-overlay">
                            <FaCamera size={24} className='' style={{ color: '#2386c8' }} />
                            <span className="mt-2 me-2">تغيير الصورة الشخصية</span>
                          </div>
                        </div>
                      </label>
                      <input
                        type="file"
                        id="profile-picture"
                        className="d-none "
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                      {imageError && (
                        <div className="text-danger mt-2 text-center">
                          {imageError}
                        </div>
                      )}
                    </div>

                  </div>


                  <div className="mb-5">
                    <label className="form-label fw-bold fs-5 mb-3">اختر نوع الحساب</label>

                    <div className="row justify-content-center">
                      <div className="col-12 col-md-10 col-lg-8">
                        {/* Flex container that stacks on mobile */}
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4">
                          
                          {/* Freelancer Option */}
                          <div className="form-check form-check-inline w-100 w-md-auto">
                            <input
                              {...register('role', { required: 'نوع الحساب مطلوب' })}
                              type="radio"
                              className="form-check-input visually-hidden"
                              id="freelancer"
                              value="freelancer"
                            />
                            <label
                              className={`form-check-label border border-primary text-center rounded-1 w-100 ${
                                watch('role') === 'freelancer' ? styles.checkedBtn : styles.uncheckedBtn
                              }`}
                              htmlFor="freelancer"
                              style={{ padding: '25px', minWidth: '200px' }}
                            >
                              <p className="m-0 text-center fs-1">
                                <SiFreelancer className="me-2 fs-1" />
                              </p>
                              <p className="m-0 text-center fs-4">مستقل</p>
                            </label>
                          </div>

                          {/* OR Divider */}
                          <div className="or-divider d-none d-md-block pt-3">
                            <span className="bg-white px-3 fw-bold fs-5">أو</span>
                          </div>
                          {/* Mobile OR Divider */}
                          <div className="or-divider d-md-none py-2">
                            <span className="bg-white px-3 fw-bold fs-5">أو</span>
                          </div>

                          {/* Client Option */}
                          <div className="form-check form-check-inline w-100 w-md-auto">
                            <input
                              {...register('role', { required: 'نوع الحساب مطلوب' })}
                              type="radio"
                              className="form-check-input visually-hidden"
                              id="client"
                              value="client"
                            />
                            <label
                              className={`form-check-label border border-primary text-center rounded-1 w-100 ${
                                watch('role') === 'client' ? styles.checkedBtn : styles.uncheckedBtn
                              }`}
                              htmlFor="client"
                              style={{ padding: '25px', minWidth: '200px' }}
                            >
                              <p className="m-0 text-center fs-1">
                                <FaBriefcase className="me-2 fs-1" />
                              </p>
                              <p className="m-0 text-center fs-4">صاحب عمل</p>
                            </label>
                          </div>
                        </div>

                        {/* Error Message */}
                        {errors.role && (
                          <div className="text-danger text-center mt-2">{errors.role.message}</div>
                        )}
                      </div>
                    </div>
                  </div>



                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">السم</label>
                      <input
                        {...register('firstName', {
                          required: 'الاسم الأول مطلوب',
                          minLength: { value: 3, message: 'يجب أن يحتوي على 3 أحرف على الأقل' }
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="الاسم الأول"
                      />
                      {errors.firstName && (
                        <div className="invalid-feedback d-block">{errors.firstName.message}</div>
                      )}

                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">اسم العائلة</label>
                      <input
                        {...register('lastName', {
                          required: 'اسم العائلة مطلوب',
                          minLength: { value: 3, message: 'يجب أن يحتوي على 3 أحرف على الأقل' }
                        })}
                        type="text"
                        className={`form-control form-control-lg ${errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="اسم العائلة"
                      />
                      {errors.lastName && (
                        <div className="invalid-feedback d-block">{errors.lastName.message}</div>
                      )}
                    </div>
                  </div>
                  
                      {/* <p className="text-danger">
                        {formErrors.lastName?.message}
                      </p> */}

                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">الدولة</label>
                      <select
                        {...register('country', { required: 'الدولة مطلوبة' })}
                        className={`form-select form-select-lg ${errors.country ? 'is-invalid' : ''}`}
                      >
                        <option value="">اختر الدولة</option>
                        {Object.entries(arabCountries).map(([code, country]) => (
                          <option key={code} value={country.name}>
                            {country.emoji} {country.name}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <div className="invalid-feedback d-block">{errors.country.message}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">اللغة</label>
                      <select
                        {...register('languages', { required: 'اللغة مطلوبة' })}
                        className={`form-select form-select-lg ${errors.languages ? 'is-invalid' : ''}`}
                      >
                        <option value="">اختر اللغة</option>
                        <option value="عربي">عربي</option>
                        <option value="English">English</option>
                      </select>
                      {errors.languages && (
                        <div className="invalid-feedback d-block">{errors.languages.message}</div>
                      )}
                    </div>
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">الجنس</label>
                      <select
                        {...register('gender', { required: ' مطلوب' })}
                        className={`form-select form-select-lg ${errors.gender ? 'is-invalid' : ''}`}
                      >
                        <option value="">اختر الجنس</option>
                        <option value="ذكر">ذكر</option>
                        <option value="أنثى">أنثى</option>
                      </select>
                      {errors.gender && (
                        <div className="invalid-feedback d-block">{errors.gender.message}</div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">تاريخ الميلاد</label>
                      <DatePicker
                        selected={watch('dateOfBirth')}
                        onChange={(date) => setValue('dateOfBirth', date)}
                        dateFormat="dd/MM/yyyy"
                        className={`form-control form-control-lg ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                        placeholderText="اختر تاريخ الميلاد"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        maxDate={addYears(new Date(), -15)}
                      />
                      {errors.dateOfBirth && (
                        <div className="invalid-feedback d-block">{errors.dateOfBirth.message}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">الفئة</label>
                    <select
                      {...register('category', { required: 'الفئة مطلوبة' })}
                      className={`form-select form-select-lg ${errors.category ? 'is-invalid' : ''}`}
                    >
                      <option value="">اختر فئة</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback d-block">{errors.category.message}</div>
                    )}
                  </div>


                  <div className="mb-4">
                    <label className="form-label fw-bold" >اختر مهاراتك</label>
                    <div className="mb-3">
                      <div className="form-control  d-flex flex-wrap gap-2 ">
                        {selectedSkills.map((skill) => (
                          <span key={skill._id} className=" badge  d-flex align-items-center " style={{ backgroundColor: '#2386c8', color: 'white' , borderRadius: '0'}}>
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
                      {...register('bio', {
                        required: 'السيرة الذاتية مطلوبة',
                        minLength: { value: 25, message: 'يجب أن تحتوي السيرة الذاتية على 25 حرفاً على الأقل' }
                      })}
                      className={`form-control form-control-lg ${errors.bio ? 'is-invalid' : ''}`}
                      placeholder="اكتب نبذة عن نفسك"
                      rows="4"
                    />
                    {errors.bio && (
                      <div className="invalid-feedback d-block">{errors.bio.message}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">المسمى الوظيفي</label>
                    <input
                      {...register('jobtitle', {
                        required: 'المسمى الوظيفي مطلوب',
                        minLength: { value: 5, message: 'يجب أن يحتوي المسمى الوظيفي على 5 أحرف على الأقل' }
                      })}
                      type="text"
                      className={`form-control form-control-lg ${errors.jobtitle ? 'is-invalid' : ''}`}
                      placeholder="مثال: مصمم جرافيك"
                    />
                    {errors.jobtitle && (
                      <div className="invalid-feedback d-block">{errors.jobtitle.message}</div>
                    )}
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-lg px-5" style={{ backgroundColor: '#2386c8', color: 'white' , borderRadius: '0'}}>
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

}



export default ProfileCompletion;


