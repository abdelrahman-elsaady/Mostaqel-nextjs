

import Link from 'next/link'
import React from 'react'
// import { ComponentProps } from 'react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function FooterSpan(props ) {





  return (
    
    <div className={inter.className }  >

    <Link  href={{ pathname:`${props.href}`}}
       className='text-decoration-none ' >
    <span className='text-dark text-decoration-none fs-6 '>

        {props.text}  

    </span>
    </Link>
    </div>
  )
}

