import React from 'react'
import './eachslide.scss'

function EachSlide({img}) {
  return (
    <div className='slide' >
      <div className="content center">
        
        <img src={img} alt="" />
        
      </div>
      
    </div>

  )
}

export default EachSlide
