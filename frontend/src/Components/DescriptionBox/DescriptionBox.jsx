import React from 'react'
import './DescriptionBox.css'
export const DescriptionBox = () => {
  return (
    <div className='descriptionBox'>
        <div className="descriptionBox-nav">
            <div className="description-nav-box">Description</div>
            <div className="description-nav-box fade"> Reviews (122)</div>
        </div>
        <div className="descriptionBox-description">
            <p>An e-commerce website is an online platform that
                faciliate buying and selling of products or services over the internet
                serves as a virtual marketplace where business and customers can......
            </p>
            <p>E-commerce websites typically display products or services along with detailed description</p>
        </div>
    </div>
  )
}
