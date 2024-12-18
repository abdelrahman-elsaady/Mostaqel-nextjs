'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';


const  AddProject = () => {
  // const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deliveryTime: "",
    budget: { min: "", max: "" },
    category: "",
  });
  const [errors, setErrors] = useState({
    title: '',
    description: ''
  });

  
  
  useEffect(() => {
    
    const cookies = new Cookies();
    const token = cookies.get('token');
    
    setToken(token); 
    console.log(token);
    
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);

    }else{
      console.log('no token');
    }
   
    const fetchData = async () => {
      try {
        const [skillsResponse, categoriesResponse] = await Promise.all([
          axios.get(`${process.env.BASE_URL}/skills`),
          axios.get(`${process.env.BASE_URL}/categories`),
        ]);
        console.log(categoriesResponse.data);
        setSkills(skillsResponse.data);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      if (value.length < 15) {
        setErrors(prev => ({...prev, title: 'عنوان المشروع يجب ألا يقل عن 15 حرف'}));
      } else {
        setErrors(prev => ({...prev, title: ''}));
      }
    }
    
    if (name === 'description') {
      if (value.length < 25) {
        setErrors(prev => ({...prev, description: 'وصف المشروع يجب ألا يقل عن 25 حرف'}));
      } else {
        setErrors(prev => ({...prev, description: ''}));
      }
    }

    if (name === "min" || name === "max") {
      let numValue = parseInt(value) || 0;
      if (name === "min") {
        numValue = Math.max(5, numValue);
        // Ensure max is at least 10 and greater than min
        if (formData.budget.max < Math.max(10, numValue + 1)) {
          setFormData(prev => ({
            ...prev,
            budget: {
              ...prev.budget,
              min: numValue,
              max: Math.max(10, numValue + 1)
            }
          }));
          return;
        }
      } else if (name === "max") {
        numValue = Math.max(10, numValue, formData.budget.min + 1);
      }else{
        numValue = Math.max(1, numValue);
      }

      setFormData(prev => ({
        ...prev,
        budget: { ...prev.budget, [name]: numValue }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submission
    let hasErrors = false;
    if (formData.title.length < 15) {
      setErrors(prev => ({...prev, title: 'عنوان المشروع يجب ألا يقل عن 15 حرف'}));
      hasErrors = true;
    }
    if (formData.description.length < 25) {
      setErrors(prev => ({...prev, description: 'وصف المشروع يجب ألا يقل عن 25 حرف'}));
      hasErrors = true;
    }

    // If there are any validation errors, stop the submission
    if (hasErrors) {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/projects`,
        {
          ...formData,
          client: userId, 
          skills: selectedSkills.map((skill)=>skill._id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       
      console.log("Project created:", response.data);
      
      if (response.status == 200) {
        Swal.fire({
          title: 'نجاح!',
          text: 'تم رفع مشروعك بنجاح',
          icon: 'success',
          confirmButtonText: 'حسناً'
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/project');
          }
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
      
      Swal.fire({
        title: 'خطأ!',
        text: 'فشل رفع المشروع. حاول مرة أخرى',
        icon: 'error',
        confirmButtonText: 'حسناً'
      });
    }
  };

  // if (!cookies.token) {
  //   return (
  //     <div className="container mt-5">
  //       <p>Please log in to create a project. <Link href="/login">Log in</Link></p>
  //     </div>
  //   );
  // }

  return (


    <>
<div className="pb-5" style={{backgroundColor : '#f0f0f0'}}>
    <div className="container-fluid" dir="rtl" style={{backgroundColor : '#f0f0f0'}}>

      <div className="row pt-5" > 

          
    

    {token ? 
    <div className="col-md-8">
    <div className="container ">
      <h1 className="mb-4">اضافة مشروع جديد</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">عنوان المشروع</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">وصف المشروع</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            style={{ 
              minHeight: '120px',
              resize: 'vertical' // Allows vertical resizing only
            }}
            placeholder="اكتب وصفاً تفصيلياً لمشروعك..."
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="deliveryTime" className="form-label" >مدة التسليم (أيام) <small>  اقل مدة 1 يوم</small></label>
          <input
            type="number"
            className="form-control"
            id="deliveryTime"
            name="deliveryTime"
            value={formData.deliveryTime}
            onChange={handleInputChange}
            required
            min="1"
          />
        {/* <small>  اقل مدة 1 يوم</small> */}
        </div>
        <div className="mb-3">
          <label className="form-label">الميزانية</label>
          <div className="row">
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="أقل مبلغ"
                name="min"
                value={formData.budget.min}
                onChange={handleInputChange}
                min="5"
                required
              />
              <small className="text-muted">اقل مبلغ 5 $</small>
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="أقصى مبلغ"
                name="max"
                value={formData.budget.max}
                onChange={handleInputChange}
                min="10"
                required
              />
              <small className="text-muted">اقصى مبلغ </small>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">الفئة</label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">اختر فئة</option>
            {categories.map((category) => (
              <option key={category.id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 card-header">
          <label className="form-label card-title"> اختر المهارات المطلوبة </label>
          <div className="d-flex flex-wrap gap-2  card-title mb-2">
            {selectedSkills.map((skill) => (
              <span key={skill._id} className="badge card-title " style={{ backgroundColor: '#2386c8', color: 'white' , borderRadius: '0'}}>
                {skill.name}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  onClick={() => handleRemoveSkill(skill._id)}
                ></button>
              </span>
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2 mb-3">
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
        <div className="my-3 text-center ">
        <button type="submit" className="btn btn-lg px-5" style={{ backgroundColor: '#2386c8', color: 'white' , borderRadius: '0'}}>انشر الان</button>
        </div>
      </form>
    </div>
    </div> : 

<div className="col-md-8 d-flex flex-column justify-content-center align-items-center py-5">
<div className=" border-0">
  <div className="card-body text-center p-5">
    <img 
      src="/righthere-ezgif.com-resize.gif" 
      alt="righthere" 
      className="img-fluid mb-4 rounded"
      style={{ maxWidth: '300px' }}
    />
    <h2 className="mb-3">أضف مشروعك الجديد</h2>
    <p className="lead mb-4">سجل الآن لتتمكن من إضافة مشروع جديد وبدء رحلتك معنا</p>
    <Link href="/login" className="btn  btn-lg" style={{backgroundColor : '#2386c8' , color : '#fff', borderRadius : '0px'}}>
      تسجيل الدخول
    </Link>
  </div>
</div>
</div>
    } 

    <div className="col-md-4  pe-4">
            <p style={{fontSize :'17px'}}>ابدأ بإنجاز مشروعك</p>
            <p>
              تستطيع إنجاز مشروعك بالشكل الذي تريده من خلال مستقل. أدخل تفاصيل المشروع والميزانية
              والمدة ليتم مراجعته ونشره مجاناً. بعد ذلك سيظهر للمستقلين في صفحة المشاريع ويقدموا عرضهم
              عليه لاختيار العرض الأنسب لك والبدء بتنفيذه.
            </p>
  
            <p style={{fontSize :'17px'}}>موقع مستقل يضمن حقوقك</p>
            <p>
              يقوم موقع مستقل بدور الوسيط بينك وبين المستقل الذي توظفه لتنفيذ مشروعك. فقط بعد انتهاء
              المستقل من تنفيذ المشروع كاملاً يتم تحويل المبلغ إلى حسابه.
            </p>
  
            <p style={{fontSize :'17px'}}>نصائح للحصول على عمل ناجح</p>
            <ul>
              <li>وضح جميع التفاصيل والمهام المطلوب إنجازها.</li>
              <li>أمّن جميع الحقوق ووفّر الأدوات اللازمة لتنفيذه.</li>
              <li>جزء المشروع والمهام الكبيرة إلى عدة مراحل صغيرة.</li>
            </ul>
          </div>
    </div>

    </div>
    </div>
    </>
  );
};

export default AddProject;

















// import React from "react";


// const AddProject = () => {
//     return (
//       <>
//       <div dir="rtl">

//         <div style={{ paddingTop: "20px" }}>
//           <p style={{ display: "block" }}> الرئيسية / مشاريعي</p>
//         </div>
  
//   {/* start */}
//         <div>
//             <nav className="navbar navbar-light ">
//               <h3 className="navbar-brand pe-3 fs-3" href="#">
//                 اضافة مشروع
//               </h3>
  
//               <div
//                 className="d-flex justify-content-between align-items-center "
//                 style={{ marginLeft: "5%" }}
//               >
//                   <button
//                     style={{ border : '1px solid #000' , borderRadius : '0px' , padding : '4px' }}
//                     type="button"
//                     id=""
//                     aria-haspopup="true"
//                     aria-expanded="false"
//                   >
//                      <i className="bi bi-question-circle-fill ps-2" ></i>
  
//                     كيف تضيف مشروع
//                   </button>
                  
//               </div>
//             </nav>
//           </div>
  
//   {/* content */}
//         <div className="container" >
//           <div className="row mt-4">
//   {/* form */}
//           <div className="col-8" style={{ backgroundColor: '#ffffff' , padding : '16px' }}>
//             <form>
//               <div className="mb-3">
//                 <label htmlFor="projectTitle" className="form-label pb-2">
//                   عنوان المشروع*
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="projectTitle"
//                   style={{ border:'1px solid gray' ,  borderRadius:'0px'}}   
//                 />
//                 <small>أدرج عنوانا موجزا يصف مشروعك بشكل دقيق</small>
//               </div>
  
//               <div className="mb-3">
//                 <label htmlFor="projectDescription" className="form-label pb-2">
//                   وصف المشروع*
//                 </label>
//                 <div className="row">
//                 <div className="col-md-6 mb-3">
//                     <button type="button" className="btn btn-outline-secondary w-100" style={{height : '100px' , border:'1px solid gray' ,  borderRadius:'0px'}}>
//                       <i className="bi bi-file-earmark"></i> اختر من نموذج
//                     </button>
//                   </div>
  
//                   <div className="col-md-6 mb-3">
//                     <button type="button" className="btn btn-outline-secondary w-100" style={{height : '100px' , border:'1px solid gray' ,  borderRadius:'0px'}}>
//                       <i className="bi bi-pencil"></i> ادخل يدويا
//                     </button>
//                   </div>
                 
//                 </div>
//               </div>
  
//               <div className="mb-3">
//                 <details className="border p-3">
//                   <summary>إعدادات متقدمة</summary>
//                   <p className="mt-2"> أسئلة المشروع
//   أضف الأسئلة التي تود أن يجيب عنها المستقلين أثناء تقديم عروضهم   </p>
//   <button style={{border : 'none'}}> اضافة سؤال جديد</button>
//                 </details>
//               </div>
  
//               <button type="submit" className="btn" style={{backgroundColor :'#2386c8' , color : '#fff' ,  borderRadius:'0px'}}>
//                انشر الان
//               </button>
//             </form>
//           </div>
//   {/* description */}
          <div className="col-4  pe-4">
            <p style={{fontSize :'17px'}}>ابدأ بإنجاز مشروعك</p>
            <p>
              تستطيع إنجاز مشروعك بالشكل الذي تريده من خلال مستقل. أدخل تفاصيل المشروع والميزانية
              والمدة ليتم مراجعته ونشره مجاناً. بعد ذلك سيظهر للمستقلين في صفحة المشاريع ويقدموا عرضهم
              عليه لاختيار العرض الأنسب لك والبدء بتنفيذه.
            </p>
  
            <p style={{fontSize :'17px'}}>موقع مستقل يضمن حقوقك</p>
            <p>
              يقوم موقع مستقل بدور الوسيط بينك وبين المستقل الذي توظفه لتنفيذ مشروعك. فقط بعد انتهاء
              المستقل من تنفيذ المشروع كاملاً يتم تحويل المبلغ إلى حسابه.
            </p>
  
            <p style={{fontSize :'17px'}}>نصائح للحصول على عمل ناجح</p>
            <ul>
              <li>وضح جميع التفاصيل والمهام المطلوب إنجازها.</li>
              <li>أمّن جميع الحقوق ووفّر الأدوات اللازمة لتنفيذه.</li>
              <li>جزء المشروع والمهام الكبيرة إلى عدة مراحل صغيرة.</li>
            </ul>
          </div>
  //  </div>
  //         </div>
  //       </div>
  //       </div>
  //     </>
//     );
//   };
  
//   export default AddProject;
  