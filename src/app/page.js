import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { CiBadgeDollar } from "react-icons/ci";
import { AiOutlineLike } from "react-icons/ai";
import { IoFlashOutline } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa6";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { AiOutlineLaptop } from "react-icons/ai";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { FaCode } from "react-icons/fa6";
import { MdOutlineLocalMovies } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiHeadset } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";

// import { CiBadgeDollar, CiMedal, CiDollar, CiShieldCheck, CiUser, CiLock } from 'react-icons/fa';

import Div3Rues from "./components/reusableComponents/div-3-home";
import Div5Rues from "./components/reusableComponents/div-5-home";
import Div6Rues from "./components/reusableComponents/div-6-home";
import Accordion from "./components/reusableComponents/accordion-home";
export default function Home() {

 
  return (
    <>
<div className="container-fluid">
      <div className=" " dir="rtl">
        {/* الديفاييه الاولى */}
        <div className="row">
          <div className=" col-12 g-0 vh-100 first-div d-flex align-items-center justify-content-center ">
            <div className="text-center text-white">
              <h1 className="mb-5">وظف أفضل المستقلين لإنجاز أعمالك عن بعد</h1>
              <h6 className="mb-5">
                أنجز مشاريعك بسهولة وأمان عبر أكبر منصة عمل حر بالعالم العربي
              </h6>
              <div>
                <form className="  d-flex position-relative">
                  <input
                    className="form-control p-4"
                    type="text"
                    placeholder=" ادخل عنوان المشروع الذي تريد تنفيذه..  "
                    required
                  />
                  <button className=" gamal  btn btn-primary mt-3 position-absolute end-5 ">
                    {" "}
                    ابدأ مشروعك الان
                  </button>
                </form>
              </div>
              <button className="btn btn-outline-light mt-4 ">
                {" "}
                ابحث عن عمل{" "}
              </button>
            </div>
          </div>
        </div>

        {/* الديفاييه التانية */}

        <div className="mt-5">
          <div className="text-center mb-5">
            <h1 className="text-primary"> هل لديك عمل تريد إنجازه</h1>
          </div>

          <div className="row">
            <div className="col-md-6   ">
              <div className=" mb-4">
                <h6 className="mb-3">
                  <FaCheckCircle className="d-inline ml-3" />
                  أضف مشروع{" "}
                </h6>

                <p className=" ms-5">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
              <div className=" mb-4">
                <h6 className="mb-3">
                  <FaCheckCircle className="d-inline ml-3" />
                  اختر المستقل المناسب{" "}
                </h6>

                <p className=" ms-5">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
              <div className=" mb-4">
                <h6 className="mb-3">
                  <FaCheckCircle className="d-inline ml-3" />
                  استلم المشروع{" "}
                </h6>

                <p className=" ms-5">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
            </div>

            <div className="col-md-6 mb-5  ">
              <iframe src=" https://www.youtube.com/embed/YcMK-xubwPo"></iframe>
            </div>
          </div>
        </div>

        {/* الديفاييه التالته */}

        <div className="mt-5 row text-center">
          <Div3Rues
            icon={<IoFlashOutline />}
            title="أنجز أعمالك بسرعة وسهولة"
            description="انشر مشروعك واترك مهمة تنفيذه لأفضل المستقلين المحترفين"
          />

          <Div3Rues
            icon={<AiOutlineLike />}
            title="وظف أفضل المستقلين"
            description="تصفح ملفات المستقلين واطلع على مهاراتهم وأعمالهم وتقييمات العملاء واختر الأنسب"
          />

          <Div3Rues
            icon={<CiBadgeDollar />}
            title="نفذ مشاريعك بتكلفة أقل"
            description="حدد الميزانية المناسبة لمشروعك واختر من بين المستقلين الخبراء للعمل على إنجاز المطلوب"
          />

          <Div3Rues
            icon={<FaRegHandshake />}
            title="اضمن حقوقك"
            description="احفظ حقوقك بشكل كامل حيث يقوم موقع مستقل بدور الوسيط بينك وبين المستقل"
          />

          <Div3Rues
            icon={<LiaUserFriendsSolid />}
            title="غطي احتياجاتك من المهارات"
            description="وظف خبراء في مختلف المجالات ومن مختلف البلدان لتنفيذ المشاريع التي تحتاجها"
          />

          <Div3Rues
            icon={<AiOutlineLaptop />}
            title="ادفع بأريحية وأمان"
            description="ادفع قيمة العمل المطلوب عبر وسائل دفع آمنة مع ضمان كامل لحقوقك المالية"
          />
        </div>

        {/*.............. الديفاية الرابعة */}

        <div className="my-5 py-5 ">
          <div className="text-center text-primary mb-5">
            <h3>كيف نضمن حقوقك وجودة أعمالك</h3>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">مستقلون محترفون</h4>
              <p>
                العمل مع مستقلين خبراء في كافة المجالات التي تبحث عنها ببيانات
                شخصية وهويات موثقة.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">ملفات شخصية متكاملة</h4>
              <p>
                ملفات شخصية للمستقلين تعرض أعمالهم وتقييماتهم السابقة ونبذة عن
                أهم خبراتهم ومهاراتهم.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">تواصل مسبق</h4>
              <p>
                تواصل مع المستقلين عبر المحادثات لتفاوض وتوضيح الاتفاق قبل
                التوظيف.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">دعم ومساعدة</h4>
              <p>فريقنا متاح لمساعدتك على مدار الساعة بجميع مراحل المشروع.</p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">ضمان الحقوق</h4>
              <p>استعادة قيمة المشروع كاملة إن لم تستلم العمل المتفق عليه.</p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4">حفظ حقوقك المالية</h4>
              <p>
                بقاء قيمة الصفقة في رصيد حسابك بموقع مستقل إلى أن تستلم المشروع
                بنفسك.
              </p>
            </div>
          </div>
        </div>

        {/* ///////////////////الديفاية الخمامسة */}

        <div className="my-5 py-5 ">
          <div className=" text-center mb-5">
            <h3 className="text-primary">
              اعثر على مستقلين محترفين في كافة المجالات
            </h3>
            <p>غطي احتياجاتك من المهارات في جميع التخصصات</p>
          </div>

          <div className="row">
            <Div5Rues
              href="/"
              icon={<GrGroup />}
              title="أعمال وخدمات استشارية وإدارية"
            />
            <Div5Rues
              href="/"
              icon={<FaCode />}
              title="برمجة، تطوير وبناء المواقع والتطبيقات"
            />
            <Div5Rues
              href="/"
              icon={<TbTriangleSquareCircle />}
              title="هندسة، عمارة وتصميم داخلي"
            />
            <Div5Rues
              href="/"
              icon={<MdOutlineLocalMovies />}
              title=" تصميم، فيديو وصوتيات "
            />
            <Div5Rues
              href="/"
              icon={<PiHeadset />}
              title="دعم، مساعدة وإدخال بيانات"
            />
            <Div5Rues
              href="/"
              icon={<BsGraphUpArrow />}
              title="تسويق إلكتروني ومبيعات"
            />
            <Div5Rues
              href="/"
              icon={<IoDocumentTextOutline />}
              title="كتابة، تحرير، ترجمة ولغات"
            />
            <Div5Rues
              href="/"
              icon={<TbReportSearch />}
              title="تدريب، تعليم ومساعدة عن بعد"
            />
          </div>
        </div>

        {/* الديفايييية الساتتتهههههه */}

        <div className="my-5 py-5 ">
          <div className="row">
            <Div6Rues
              img="/rehab.png"
              job="مدير موقع مستقل"
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="رحاب سمير"
            />
            <Div6Rues
              img="/nasr.png"
              job="  مؤسس شركة أوفتو"
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="محمد نصر "
            />
            <Div6Rues
              img="/mahmoud.png"
              job="مدير موقع مستقل"
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="محمود يوسف "
            />
            <Div6Rues
              img="/tony.jpg"
              job="  مدير أكاديمية حسوب"
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="   توني سوبرانو "
            />
          </div>
        </div>


            {/* الديفاااية السابعةةةةةةة */}
            
            <div className="" dir="rtl">
            <Accordion/>
            </div>

 


      </div>

      </div>
    </>
  );
}
