


import React from "react";


const AddProject = () => {
    return (
      <>
      <div dir="rtl">

        <div style={{ paddingTop: "20px" }}>
          <p style={{ display: "block" }}> الرئيسية / مشاريعي</p>
        </div>
  
  {/* start */}
        <div>
            <nav className="navbar navbar-light ">
              <a className="navbar-brand pe-3 fs-3" href="#">
                اضافة مشروع
              </a>
  
              <div
                className="d-flex justify-content-between align-items-center "
                style={{ marginLeft: "5%" }}
              >
                  <button
                    style={{ border : '1px solid #000' , borderRadius : '0px' , padding : '4px' }}
                    type="button"
                    id=""
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                     <i class="bi bi-question-circle-fill ps-2" ></i>
  
                    كيف تضيف مشروع
                  </button>
                  
              </div>
            </nav>
          </div>
  
  {/* content */}
        <div className="container" >
          <div className="row mt-4">
  {/* form */}
          <div className="col-8" style={{ backgroundColor: '#ffffff' , padding : '16px' }}>
            <form>
              <div className="mb-3">
                <label htmlFor="projectTitle" className="form-label pb-2">
                  عنوان المشروع*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="projectTitle"
                  style={{ border:'1px solid gray' ,  borderRadius:'0px'}}   
                />
                <small>أدرج عنوانا موجزا يصف مشروعك بشكل دقيق</small>
              </div>
  
              <div className="mb-3">
                <label htmlFor="projectDescription" className="form-label pb-2">
                  وصف المشروع*
                </label>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <button type="button" className="btn btn-outline-secondary w-100" style={{height : '100px' , border:'1px solid gray' ,  borderRadius:'0px'}}>
                      <i className="bi bi-file-earmark"></i> اختر من نموذج
                    </button>
                  </div>
  
                  <div className="col-md-6 mb-3">
                    <button type="button" className="btn btn-outline-secondary w-100" style={{height : '100px' , border:'1px solid gray' ,  borderRadius:'0px'}}>
                      <i className="bi bi-pencil"></i> ادخل يدويا
                    </button>
                  </div>
                 
                </div>
              </div>
  
              <div className="mb-3">
                <details className="border p-3">
                  <summary>إعدادات متقدمة</summary>
                  <p className="mt-2"> أسئلة المشروع
  أضف الأسئلة التي تود أن يجيب عنها المستقلين أثناء تقديم عروضهم   </p>
  <button style={{border : 'none'}}> اضافة سؤال جديد</button>
                </details>
              </div>
  
              <button type="submit" className="btn" style={{backgroundColor :'#2386c8' , color : '#fff' ,  borderRadius:'0px'}}>
               انشر الان
              </button>
            </form>
          </div>
  {/* description */}
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
   
          </div>
        </div>
        </div>
      </>
    );
  };
  
  export default AddProject;
  