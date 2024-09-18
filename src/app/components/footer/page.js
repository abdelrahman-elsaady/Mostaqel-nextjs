import Link from "next/link";

import React from "react";
import { IoLogoFacebook } from "react-icons/io";
import { FaCcVisa, FaCcPaypal, FaCcMastercard } from "react-icons/fa";

import ReusLink from "../reusableComponents/FooterLinks";
import MostaqlWebSites from "../reusableComponents/footerWebSites";
import "./footer.css";
import Image from "next/image";
//  import Span from "./../reusable/FooterSpan";
export default function Footer() {
  // console.log(Span);

  return (
    <>
      <footer className="container-fluid bg-light pt-4 " dir="rtl">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-3 col-sm-6 mb-3">
              <h5>مستقل</h5>
              <ul className="list-unstyled">
                <li>
                  <ReusLink href="/" text="عن مستقل" />
                </li>
                <li>
                  <ReusLink href="/faq" text="الأسئلة الشائعة" />
                </li>
                <li>
                  <ReusLink href="/guarantee" text="ضمان حقوق" />
                </li>
                <li>
                  <ReusLink href="/terms" text="شروط الاستخدام" />
                </li>
                <li>
                  <ReusLink href="/privacy" text="بيان الخصوصية" />
                </li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 mb-3">
              <h5>مشاريع</h5>
              <ul className="list-unstyled">
                <li>
                  <ReusLink href="/projects/business" text="مشاريع أعمال" />
                </li>
                <li>
                  <ReusLink href="/projects/programming" text="مشاريع برمجة" />
                </li>
                <li>
                  <ReusLink
                    href="/projects/engineering"
                    text="مشاريع هندسة وعمار"
                  />
                </li>
                <li>
                  <ReusLink href="/projects/design" text="مشاريع تصميم" />
                </li>
                <li>
                  <ReusLink href="/projects/marketing" text="مشاريع تسويق" />
                </li>
                <li>
                  <ReusLink
                    href="/projects/writing-translation"
                    text="مشاريع كتابة وترجمة"
                  />
                </li>
                <li>
                  <ReusLink
                    href="/projects/support"
                    text="مشاريع دعم ومساعدة"
                  />
                </li>
                <li>
                  <ReusLink href="/projects/training" text="مشاريع تدريب" />
                </li>
                <li>
                  <ReusLink href="/categories" text="التصنيفات" />
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <h5>روابط</h5>
                  <ul className="list-unstyled">
                    <li>
                      <ReusLink href="/companies" text="مستقل للمؤسسات" />
                    </li>
                    <li>
                      <ReusLink href="/jobs" text="إبحث عن عمل" />
                    </li>
                    <li>
                      <ReusLink href="/portfolio" text="معرض الأعمال" />
                    </li>
                    <li>
                      <ReusLink href="/blog" text="مدونة مستقل" />
                    </li>
                    <li>
                      <ReusLink href="/help" text="مركز المساعدة" />
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-sm-6 mb-3 ">
                  <h5>تابع مستقل على</h5>
                  <ul className="list-group list-group-horizontal">
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
                  <ul className="list-group list-group-horizontal">
                    <li className="ml-3">
                      <FaCcPaypal className="h2" />
                    </li>
                    <li className="ml-3">
                      <FaCcVisa className="h2" />
                    </li>
                    <li className="ml-3">
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
                  className="logo  d-inline"
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
