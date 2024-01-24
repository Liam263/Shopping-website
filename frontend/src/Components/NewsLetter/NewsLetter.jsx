import React from 'react'
import './NewsLetter.css'
export const NewsLetter = () => {
  return (
    <div className='newsLetter'>
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsLetter and stay updated</p>
        <div>
            <input type="email" placeholder="Your email "  />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
