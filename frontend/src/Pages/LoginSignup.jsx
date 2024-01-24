import React from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {
  return (
    <div className='loginSignup'>
        <div className="loginSignup-container">
          <h1>Sign up</h1>
          <div className="loginSignup-fields">
            <input type="text" placeholder='Your name' />
            <input type="email" placeholder='Email address' />
            <input type="password" placeholder='Password ' />
          </div>
          <button>Continue</button>
          <p className="loginSignup-login">Already have an account? <span>Login</span></p>
          <div className="loginSignup-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </div>
    </div>
  )
}
