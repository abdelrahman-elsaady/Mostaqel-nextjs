
"use client"
// components/Accordion.js
// import { useState } from 'react';
import {Accordion, AccordionItem} from "@nextui-org/accordion";

export default function Accordion6() {

  // const [activeKey, setActiveKey] = useState('0');


  const defaultContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


//   const handleToggle = (key) => {
//     setActiveKey(activeKey === key ? '' : key);
//   };

  // console.log(activeKey);
  

  return (
    <Accordion>
    <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
      {defaultContent}
    </AccordionItem>
    <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
      {defaultContent}
    </AccordionItem>
  </Accordion>
  );
}
