
"use client"
// components/Accordion.js
// import { useState } from 'react';
import {Accordion, AccordionItem} from "@nextui-org/accordion";

export default function Accordion6() {

  // const [activeKey, setActiveKey] = useState('0');


  // const defaultContent =
  // "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


//   const handleToggle = (key) => {
//     setActiveKey(activeKey === key ? '' : key);
//   };

  // console.log(activeKey);
  

  return (
    <Accordion >
    <AccordionItem key="1" aria-label="Accordion 1" title="ما هو مستقل؟">
    مستقل هو منصة عربية تتيح لأصحاب المشاريع والشركات التعاقد مع مستقلين محترفين للقيام بأعمالهم، وبنفس الوقت يتيح للمستقلين المحترفين مكانًا لإيجاد مشاريع يعملون عليها ويكسبون من خلالها.

    </AccordionItem>
    <AccordionItem  key="2" aria-label="Accordion 2" title="كيف أستفيد منه؟">
    موقع مستقل يضمن لك حقك المالي بشكل كامل فلا داع ﻷي قلق، كن مطمئنا عند إنشاء أي مشاريع جديدة أو تقديم عروضك على المشاريع المعروضة في الموقع، حيث يقوم موقع مستقل بدور الوسيط بين صاحب المشروع وبين المستقل ويحمي حقوق الطرفين المالية في حال الالتزام بشروط موقع مستقل وبنود الضمان وتوضيح الاتفاق تماما.
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="كيف يضمن موقع مستقل حقوقي؟">
      تلجأ الشركات إلى توظيف العاملين عن بُعد في مختلف التخصصات، منها على سبيل المثال لا الحصر العاملين في مجال البرمجة، وتحرير النصوص، والتسويق الإلكتروني، والتصميم والإعلانات، والترجمة،وادخال البيانات، وكتابة المقالات، وبعض أعمال العلاقات العامة عبر الإنترنت، وتصميم المواقع الإلكترونية وإدارة المواقع الإلكترونية، والدراسات والتحاليل السوقية وغيرها من التخصصات.

    </AccordionItem>
  </Accordion>
  );
}
