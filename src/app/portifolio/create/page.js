'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';

const PortfolioItemForm = ({ searchParams }) => {
  const { id } = searchParams;
  const router = useRouter();
  const { userId, token } = useAppContext();
  const [portfolioItem, setPortfolioItem] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
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
      ? `${process.env.BASE_URL}//portfolio/${id}`
      : '${process.env.BASE_URL}//portfolio';
    
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
        // router.push('/portfolio');
        console.log('Portfolio item saved successfully');
      } else {
        console.error('Failed to save portfolio item');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container pt-5" dir="rtl" style={{backgroundColor: '#f5f5f5'}}>
      <div className="row">
        <div className="col-md-9">
          <h1 className="text-2xl font-bold mb-6 text-right">إضافة عمل جديد</h1>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id || ''} />
            <label className="mt-3">عنوان العمل *</label>
            <div className="mb-4">
              <input
                type="text"
                name="title"
                defaultValue={portfolioItem?.title || ''}
                placeholder="أدخل عنوانا موجزا يصف العمل بشكل دقيق."
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-bold">صورة مصغرة *</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {/* <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg> */}
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>اسحب الصورة إلى هنا</span>
                      <input
                        id="file-upload"
                        name="profilePicture"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">أو انقر للاختيار يدويا</p>
                  </div>
                  <p className="text-xs text-gray-500">أضف صورة مميزة عن العمل.</p>
                </div>
              </div>
              {profilePicture && (
                <div className="mt-2">
                  <img src={profilePicture} alt="Preview" className="max-w-xs h-auto" />
                </div>
              )}
            </div>
            <label className="mt-3">وصف العمل *</label>
            <div className="mb-4">
              <textarea
                name="description"
                defaultValue={portfolioItem?.description || ''}
                placeholder="اكتب وصفا تفصيليا للعمل"
                rows="6"
                className="w-100"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {id ? 'تحديث العمل' : 'إضافة العمل'}
            </button>
          </form>
        </div>
        <div className="col-md-3 text-right">
          <h2 className="text-lg font-semibold mb-3">ابدأ بناء معرض أعمالك</h2>
          <p className="text-sm text-gray-600 mb-4">
            أضف أعمالك السابقة التي قمت بتنفيذها. إضافة الأعمال للملف الشخصي يساعد أصحاب المشاريع على معرفة مهاراتك ويزيد من فرص توظيفك.
          </p>
          {/* ... (rest of the sidebar content) ... */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioItemForm;