import React from 'react'
import exclusive_image from '../Assets/exclusive_image.png'
import './Offers.css'
export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offer-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offer-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}
