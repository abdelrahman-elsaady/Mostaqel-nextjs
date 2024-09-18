import React from 'react'

export default function home(prop) {
  return (
  <>
  
  <div className="col-md-4 mb-5 text-center">
  <div className='text-center d-flex justify-content-center ' style={{fontSize:100 }}>
        {prop.icon }
    </div>
    
      <h5 className='mb-4'>{prop.title}</h5>
      <p style={{fontSize:13 }}>{prop.description}</p>

  </div>

  </>
  )
}
