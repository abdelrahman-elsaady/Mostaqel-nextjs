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
import UserHome from "./components/home/page"
import Link from "next/link";
// import { CiBadgeDollar, CiMedal, CiDollar, CiShieldCheck, CiUser, CiLock } from 'react-icons/fa';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation'

import Div3Rues from "./components/reusableComponents/div-3-home";
import Div5Rues from "./components/reusableComponents/div-5-home";
import Div6Rues from "./components/reusableComponents/div-6-home";
import FaqAccordion from "./components/reusableComponents/accordion-home";


async function fetchUserData(id) {
  try {
    const response = await fetch(`${process.env.BASE_URL}/users/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Failed to fetch user data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}



export const metadata = {
  title: 'مستقل - الرئيسية',
  description: 'Home page for Mostaqel',
};


export  default async function Home() {

const cookieStore = cookies()
const token = cookieStore.get('token')

if(token){
const decoded = jwt.decode(token.value);

    const userData = await fetchUserData(decoded.id);
    // revalidatePath('/')
    if(userData){
    if (userData.data.skills.length == 0) {
     redirect('/account/profile')
      }
      
    }
}

 
  return (
    <>
    {token ? <UserHome/> :
<div className="container-fluid">
      <div className=" " dir="rtl">
        {/* الديفاييه الاولى */}
        {/* <h1 className="">kjgjy</h1> */}
        <div className="row">
          <div className=" col-12 g-0 vh-100 first-div d-flex align-items-center justify-content-center ">
            <div className="text-center text-white">
              <h2 className="mb-5">وظف أفضل المستقلين لإنجاز أعمالك عن بعد</h2>
              <h6 className="mb-5">
                أنجز مشاريعك بسهولة وأمان عبر أكبر منصة عمل حر بالعالم العربي
              </h6>
              <div>
                <form className="d-flex position-relative justify-content-center">
                  <input
                    className="form-control p-4 d-none d-md-block"
                    type="text"
                    placeholder=" ادخل عنوان المشروع المراد تنفيذه..  "
                    required
                    style={{focus: "box-shadow: none", borderRadius: "0"}}
                  />
                  <Link 
                    href="/project/create" 
                    style={{textDecoration: "none"}}
                    className="d-block w-auto"
                  >
                    <button  
                      className="btn btn-primary py-3 px-4 position-absolute start-0 mt-2 ms-2 d-none d-md-block" 
                      style={{borderRadius: "0", backgroundColor: '#2386c8'}}
                    >
                      ابدأ مشروعك الان
                    </button>
                    {/* Mobile button */}
                    <button  
                      className="btn btn-primary py-3 px-4 d-md-none" 
                      style={{borderRadius: "0", backgroundColor: '#2386c8'}}
                    >
                      ابدأ مشروعك الان
                    </button>
                  </Link>
                </form>
              </div>
                <Link href="/project" style={{textDecoration: "none"}}>
              <button className="btn btn-outline-light mt-4 " style={{borderRadius: "0"}}>
                ابحث عن عمل
              </button>
                </Link>
            </div>
          </div>
        </div>

        {/* الديفاييه التانية */}

        <div className="mt-5">
          <div className="text-center mb-5">
            <h1 className="" style={{color: '#2386c8'}}> هل لديك عمل تريد إنجازه</h1>
          </div>

          <div className="row">
            <div className="col-md-6   ">
              <div className="d-flex ">
              <h5 className=" ms-3">
                  <FaCheckCircle  style={{color: '#2386c8'}}/>
            </h5>
              <div className=" mb-4">
                <h5 className="mb-3 text-muted">
                  
                  <span>
                  أضف مشروع
                  </span>
                </h5>

                <p className=" ms-5 text-muted small">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
              </div>
         
              <div className="d-flex ">
              <h5 className=" ms-3">
                  <FaCheckCircle  style={{color: '#2386c8'}}/>
                </h5>
               
              <div className=" mb-4">
                <h5 className="mb-3 text-muted">
                  
                  اختر المستقل المناسب
                </h5>

                <p className=" ms-5 text-muted small">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
              </div>
              <div className="d-flex ">
              <h5 className=" ms-3">
                  <FaCheckCircle  style={{color: '#2386c8'}}/>
                  </h5>
              <div className=" mb-4">
                <h5 className="mb-3 text-muted">
                  استلم المشروع
                </h5>

                <p className=" ps-5 text-muted small">
                  أضف تفاصيل المشروع الذي تحتاج إنجازه والمهارات المطلوبة واحصل
                  على عروض المستقلين المتخصصين في دقائق.
                </p>
              </div>
              </div>
            </div>

            <div className="col-md-6 mb-5  ">
              <iframe src=" https://www.youtube.com/embed/seO4l0shva0"></iframe>
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
          <div className="text-center mb-5">
                <h1 style={{color: '#2386c8'}}>كيف نضمن حقوقك وجودة أعمالك</h1>
          </div>

          <div className="row">
            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">مستقلون محترفون</h4>
              <p className="text-muted small">
                العمل مع مستقلين خبراء في كافة المجالات التي تبحث عنها ببيانات
                شخصية وهويات موثقة.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">ملفات شخصية متكاملة</h4>
              <p className="text-muted small">
                ملفات شخصية للمستقلين تعرض أعمالهم وتقييماتهم السابقة ونبذة عن
                أهم خبراتهم ومهاراتهم.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">تواصل مسبق</h4>
              <p className="text-muted small">
                تواصل مع المستقلين عبر المحادثات لتفاوض وتوضيح الاتفاق قبل
                التوظيف.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">دعم ومساعدة</h4>
              <p className="text-muted small">فريقنا متاح لمساعدتك على مدار الساعة بجميع مراحل المشروع.</p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">ضمان الحقوق</h4>
              <p className="text-muted small">استعادة قيمة المشروع كاملة إن لم تستلم العمل المتفق عليه.</p>
            </div>

            <div className="col-md-4 col-sm-6 mb-5">
              <h4 className="mb-4 text-muted">حفظ حقوقك المالية</h4>
              <p className="text-muted small">
                بقاء قيمة الصفقة في رصيد حسابك بموقع مستقل إلى أن تستلم المشروع
                بنفسك.
              </p>
            </div>
          </div>
        </div>

        {/* ///////////////////الديفاية الخمامسة */}

        <div className="my-5 py-5 ">
          <div className=" text-center mb-5">
            <h3 style={{color: '#2386c8'}}>
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

        {/* الديفايييية الساتتتههههه */}





        <div className="my-5 py-5 ">

            <div className="text-center mb-5">
              <h2 style={{color: '#2386c8'}}>أراء عملائنا من جميع أنحاء العالم</h2>
            </div>


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
              job="  مؤسس مستر مندوب" 
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="محمود يوسف "
            />
            <Div6Rues
              img="/anaa.jpg"
              job="     أهلا وسهلا"
              details="علاقتي بمستقل متعلقة بصورة رئيسة بزيادة الإنتاجية، فإذا أحسنت استخدام مستقل وتوظيف المستقلين ستتفاجئ بارتفاع حجم الإنتاجية في شركتك، لأنك ستكتشف أنك لا تملك يدين فقط بل أيادٍ كثيرة تنجز أعمالك، فالقيمة التي أضافها لي مستقل هي إنجاز مهام أكثر في وقت أقل."
              name="   عبدالرحمن محمد"
            />
          </div>
        </div>


            {/* الديفاااية السابعةةةةةة */}
            


            <div className=" mb-5 pb-5 " >
            <FaqAccordion/>
            </div>

 


      </div>

      </div>
      }
    </>
  );
}
