


import React from "react";

export default function Projects() {
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
              <div class="dropdown">
                <button
                  class="btn dropdown-toggle"
                  style={{backgroundColor : '#ffffff' , border : '1px solid #000' , borderRadius : '0px'}}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  الاحدث
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">
                    الاقدم
                  </a>
                  <a class="dropdown-item" href="#">
                    الاكثر عروضا
                  </a>
                  <a class="dropdown-item" href="#">
                    الاقل عروضا
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="row mt-4">
          {/* sidebar */}
          <aside className="col-lg-3 col-md-2 pe-5" style={{marginRight : '60px'}}>
            {/* search */}
            <div className="mb-3">
              <label htmlFor="search" className="form-label">
                بحث
              </label>
              <input
                type="text"
                id="search"
                className="form-control"
                style={{  borderRadius : '0px', backgroundColor : '#fafafa'}}
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
                style={{  borderRadius : '0px' , backgroundColor : '#fafafa'}}

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
          <section className="col-lg-8 col-md-7" style={{marginLeft : '30px'}}>
            <div className="list-group">

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#' style={{textDecoration  : 'none' , color: "#2386c8" }}>محلل نظم لتطبيق عقاري</a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8" , border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>
                <small><i class="bi bi-person-fill" ></i> سعد.يس  
                <i class="bi bi-alarm pe-3"></i>  15 دقيقه
                <i class="bi bi-activity pe-3"></i> أضف أول عرض
                </small>
                <p className="mb-1"> السلام عليكم , احتاج محلل نظم لتطبيق عقاري يستخرج لي موارد يمكن من خلالها ان يكون لنا إيرادات مالية وكذلك تطوير خدمات التطبيق واضافة خصائص وشكرا</p>
              </div>

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#'  style={{textDecoration  : 'none' , color: "#2386c8" }}>معلمة لغة عربية للأطفال الذين لا يتحدثون غير اللغة الإنجليزية</a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8", border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color  : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>
  
                <small><i class="bi bi-person-fill" ></i>  Mostafa G.  
                <i class="bi bi-alarm pe-3"></i>  منذ 14 دقيقة 
                <i class="bi bi-activity pe-3"></i> عرض واحد
                </small>
                <p className="mb-1"> المطلوب معلمة تجيد الانجليزية الإمريكية لتعليم مواد المدرسة للإبتدائية السعودية، علوم رياضيات لغة عربية.</p>
              </div>

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#'  style={{textDecoration  : 'none' , color: "#2386c8" }}> إنشاء تطبيق لمتجر إلكتروني</a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8" , border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color  : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>
                <small><i class="bi bi-person-fill" ></i>  Shimaa M. 
                <i class="bi bi-alarm pe-3"></i>   منذ ساعتين
                <i class="bi bi-activity pe-3"></i>13 عرض
                </small>
                <p className="mb-1"> أنشاء تطبيق لمتجر إلكتروني أندرويد وأيفون</p>
              </div>

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#' style={{textDecoration  : 'none' , color: "#2386c8" }}> بحث عن المصدر للمصنع أو معمل ملابس معدني بالإمارات </a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8" , border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color  : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>

                <small><i class="bi bi-person-fill" ></i>  نسمة خ. 
                <i class="bi bi-alarm pe-3"></i>  منذ ساعة
                <i class="bi bi-activity pe-3"></i>  11 عرض
                </small>
                <p className="mb-1"> ابحث عن شخص لديه خلفية بالمصانع للبحث عن المصنع أو المعمل علماق الملابس المعدني في الإمارات ورقم التواصل لدى المصنع عن طريق منصات في قوقل أو عن طريق التواصل الإجتماعي ولينكد ان وغيرها من المنصات و البرامج</p>
              </div>

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#' style={{textDecoration  : 'none' , color: "#2386c8" }}> تصميم عرض بوربوينت لندوة</a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8", border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color  : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>
                <small><i class="bi bi-person-fill" ></i> عبدالله ا.
                <i class="bi bi-alarm pe-3"></i>  منذ ساعة 
                <i class="bi bi-activity pe-3"></i> 10 عروض
                </small>
                <p className="mb-1">مطلوب إعداد عرض تقديمي على وجه السرعة لمناسبة ندوة، مدة العرض نصف الساعة

</p>
              </div>

              <div className="list-group-item list-group-item-action p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <a className="mb-1" href='#' style={{textDecoration  : 'none' , color: "#2386c8" }}> تحليل درس واقتراح إستراتيجية لتدريسه في مادة العلوم</a>
                  <button className="btn btn-sm btn-info" style={{backgroundColor :" #2386c8" , border:'none' , borderRadius:'0px'}}>
                    <i className="bi bi-plus" style={{ color  : '#fff' , fontSize : 'bold'}}></i>
                    <a href="#" style={{textDecoration  : 'none' , color  : '#fff' }}> مشروع مماثل</a> 
                  </button>
                </div>
                <small><i class="bi bi-person-fill" ></i>    Ziad A.  
                <i class="bi bi-alarm pe-3"></i>  منذ 20 دقيقة   
                <i class="bi bi-activity pe-3"></i> 4 عروض
                </small>
                <p className="mb-1"> تحليل درس لمادة العلوم للمرحلة المتوسطة في السعودية واقتراح إستراتيجية لتدريسه

بحيث استخرج المفاهيم العلمية فقط ثم اصمم استراتيجية لتدريسه</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      </div>
    </>
  );
}
