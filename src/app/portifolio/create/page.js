'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
import { useAppContext } from '../../context/AppContext';
import Swal from 'sweetalert2';
import styles from './PortfolioForm.module.css';

const PortfolioItemForm = ({ searchParams }) => {
  const { id } = searchParams;
  const router = useRouter();
  // const { userId } = useAppContext();
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  
const [userId, setUserId] = useState('');

const [loading, setLoading] = useState(true);

  const cookies = new Cookies();
  const token = cookies.get('token');
  let decodedToken = jwtDecode(token);
  // const userId = decodedToken.id;





  useEffect(() => {
if (decodedToken) {
  setUserId(decodedToken.id);
  setLoading(false);
}
    if (id) {
      getPortfolioItem(id);
    }
  }, [id]);

  const getPortfolioItem = async (id) => {
    try {
      const res = await fetch(`${process.env.BASE_URL}/portfolio/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPortfolioItem(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
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
    
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    // const profilePicture = formData.get('profilePicture');
    const portfolioData = {
      title,
      description,
      freelancerId: userId,
      image: profilePicture,
    };
  

console.log(portfolioData);

    const url = id 
      ? `${process.env.BASE_URL}/portfolio/${id}`
      : `${process.env.BASE_URL}/portfolio`;
    
    const method = id ? 'PATCH' : 'POST';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(portfolioData),
      });

      if (res.ok) {
        Swal.fire({
          title: 'تم إضافة العمل بنجاح',
          icon: 'success',
          confirmButtonText: 'حسنًا'
        }).then(() => {
          router.push('/');
        });
        // console.log('Portfolio item saved successfully');
      } else {
        console.error('Failed to save portfolio item');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="container py-5" dir="rtl">
      <div className="row g-4">
        {/* Main Form Column */}
        <div className="col-lg-9">
          <div className="bg-white p-4 rounded shadow-sm">
            <h1 className="h3 mb-4">إضافة عمل جديد</h1>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={id || ''} />
              
              <div className="mb-3">
                <label className={`form-label fw-bold ${styles.formLabel}`}>عنوان العمل *</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={portfolioItem?.title || ''}
                  placeholder="أدخل عنوانا موجزا يصف العمل بشكل دقيق."
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className={`form-label fw-bold ${styles.formLabel}`}>صورة مصغرة *</label>
                <div className={`upload-area p-4 rounded border border-2 border-dashed text-center ${styles.uploadArea}`}>
                  <div className="mb-3">
                    <label htmlFor="file-upload" className="btn btn-outline-primary mb-2">
                      <span>اختر صورة</span>
                      <input
                        id="file-upload"
                        name="profilePicture"
                        type="file"
                        className="d-none"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                    <p className="text-muted small mb-0">اسحب الصورة إلى هنا أو انقر للاختيار يدويا</p>
                    <p className="text-muted small">أضف صورة مميزة عن العمل.</p>
                  </div>
                  {profilePicture && (
                    <div className="mt-3">
                      <img 
                        src={profilePicture} 
                        alt="Preview" 
                        className="img-fluid rounded" 
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className={`form-label fw-bold ${styles.formLabel}`}>وصف العمل *</label>
                <textarea
                  name="description"
                  defaultValue={portfolioItem?.description || ''}
                  placeholder="اكتب وصفا تفصيليا للعمل"
                  rows="6"
                  className="form-control"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
              >
                {id ? 'تحديث العمل' : 'إضافة العمل'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="col-lg-3">
          <div className="bg-white p-4 rounded shadow-sm">
            <h2 className="h5 mb-3 fw-bold">ابدأ بناء معرض أعمالك</h2>
            <p className="text-muted small">
              أضف أعمالك السابقة التي قمت بتنفيذها. إضافة الأعمال للملف الشخصي يساعد أصحاب المشاريع على معرفة مهاراتك ويزيد من فرص توظيفك.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemForm;