import Image from 'next/image'
import React from 'react'

export default function div6home(prop) {
  return (
    <>

      <div className="col-md-6 col-sm-12 mb-5 ">
<div className='row'>
<div className=" col-2">
  <Image src={prop.img}  width={80} height={80} className="rounded-circle " alt="" ></Image>
</div>
<div className="ps-5 pt-4 col-9">
  <h4 >  {prop.name}</h4>
  <p> {prop.job}</p>
  <p style={{fontSize:15 }} > {prop.details}</p>

</div>
</div>
</div>
    
    </>
  )
}
