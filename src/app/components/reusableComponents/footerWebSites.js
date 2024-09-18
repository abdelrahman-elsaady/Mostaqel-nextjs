import Link from 'next/link'
import React from 'react'

export default function footerWebSites(props) {
  return (

    <>
    <Link  href={{ pathname:`${props.href}`}}
       className='text-decoration-none ' >

    <h5 className='text-dark text-decoration-none  ' >

        {props.title}  

    </h5>

    <p className='text-black  small' style={{fontSize:10 }} >
        {props.description}
    </p>
    </Link>
    </>
  )
}
