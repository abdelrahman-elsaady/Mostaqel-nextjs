import Link from "next/link";

import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from "react-icons/fa";

import ReusLink from "../reusableComponents/FooterLinks";
import MostaqlWebSites from "../reusableComponents/footerWebSites";
import styles from "./footer.module.css";
import Image from "next/image";
//  import Span from "./../reusable/FooterSpan";
export default function Footer() {

  return (
    <>
      <footer className={`container-fluid bg-light mt-5 pt-5 ${styles.foooter}`} dir="rtl">
      {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Enable both scrolling & backdrop</button>

<div  class="offcanvas offcanvas-end w-25 " data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div class="offcanvas-header ">
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdroped with scrolling</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  
  <div class="offcanvas-body">
    <p>Try scrolling the rest of the page to see this option in action.</p>
  </div>
</div> */}

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-3">
              <h5>مستقل</h5>
              <ul className="list-unstyled">
                <li>
                  
                  <ReusLink href="/" text="عن مستقل" />
                </li>
                <li>
                  <ReusLink href="/" text="الأسئلة الشائعة" />
                </li>
                <li>
                  <ReusLink href="/" text="ضمان حقوق" />
                </li>
                <li>
                  <ReusLink href="/" text="شروط الاستخدام" />
                </li>
                <li>
                  <ReusLink href="/" text="بيان الخصوصية" />
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <h5>مشاريع</h5>
              <ul className="list-unstyled">
                <li>
                  <ReusLink href="/" text="مشاريع أعمال" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع برمجة" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع هندسة وعمار" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع تصميم" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع تسويق" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع كتابة وترجمة" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع دعم ومساعدة" />
                </li>
                <li>
                  <ReusLink href="/" text="مشاريع تدريب" />
                </li>
                <li>
                  <ReusLink href="/" text="التصنيفات" />
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5>روابط</h5>
                  

                  <ul className="list-unstyled  ">
                    
                    <li className="">
                      <ReusLink href="/" text="مستقل للمؤسسات" />
                    </li>
                    <li>
                      <ReusLink href="/" text="إبحث عن عمل" />
                    </li>
                    <li>
                      <ReusLink href="/" text="معرض الأعمال" />
                    </li>
                    <li>
                      <ReusLink href="/" text="مدونة مستقل" />
                    </li>
                    <li>
                      <ReusLink href="/" text="مركز المساعدة" />
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-sm-6 mb-3 ">
                  <h5>تابع مستقل على</h5>
                  <ul className="list-group list-group-horizontal list-unstyled">
                    <li className="ml-3">
                      <ReusLink
                        href="/"
                        text={<IoLogoFacebook className="h2 text-primary" />}
                      />
                    </li>
                    <li>
                      <ReusLink href="/" text="مركز المساعدة" />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <h5>وسائل الدفع المتاحة</h5>
                  <ul className="list-group list-group-horizontal list-unstyled">
                    <li className="ms-3">
                      <FaCcPaypal className="h2" />
                    </li>
                    <li className="ms-3">
                      <FaCcVisa className="h2" />
                    </li>
                    <li className="ms-3">
                      <FaCcMastercard className="h2" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="copyRight pt-3">
          <div className="row ">
            <div className="col-sm-6 col-xs-12">
              <p className="text-center-xs ">© 2024 جميع الحقوق محفوظة.</p>
            </div>
            <div className="col-sm-6 col-xs-12">
              <p className="text-left  " dir="ltr">
                © 2024 All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row ">
            <div className=" text-center my-4">
              <Link href="/">
                <Image
                  src="https://static.hsoubcdn.com/footer/img/hsoub-logo.svg"
                  width={100}
                  height={36}
                  className={`logo  d-inline ${styles.logo}`}
                  alt="logo"
                ></Image>
              </Link>
            </div>

            <div className="row">
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="أنا"
                  description="أداة واحدة لإدارة مشاريعك وفريقك"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="مستقل"
                  description="أكبر منصة عمل حر في العالم العربي"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="خمسات"
                  description="سوق بيع وشراء الخدمات المصغرة"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="بيكاليكا"
                  description="متجر القوالب والمنتجات الرقمية"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="بعيد"
                  description="موقع توظيف الخبراء عن بعد"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="زيتون"
                  description="برنامج خدمة العملاء الأكثر بساطة"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="أكاديمية حسوب"
                  description="دورات احترافية لتطوير مستقبلك"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="موسوعة حسوب"
                  description="المرجع الشامل للمطورين العرب"
                />
              </div>
              <div className="col-md-2 col-sm-6 col-xs-12">
                <MostaqlWebSites
                  href="/"
                  title="حسوب I/O"
                  description="مجتمع للنقاش الهادف والموضوعي"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
