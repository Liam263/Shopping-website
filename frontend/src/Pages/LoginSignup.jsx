import React, { useState } from 'react'
import './CSS/LoginSignup.css'
export const LoginSignup = () => {

  const [state, setState] = useState("Log in")

  const [formData, setFormData] = useState({
    username:"", 
    password:"",
    email:"",
  })

  const changeHanlder = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const login = async ()=>{
    // console.log("Login", formData)
    let responseData ;
     await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(formData)
     }).then((res)=> res.json().then((data)=>{responseData = data}))

     if(responseData.success){
        localStorage.setItem('auth-token', responseData.token); 
        window.location.replace("/")
     }else {
      alert(responseData.error)
     }

  }

  const signup = async()=>{
    // console.log("Signup", formData)
    let responseData ;
     await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(formData)
     }).then((res)=> res.json().then((data)=>{responseData = data}))

     if(responseData.success){
        localStorage.setItem('auth-token', responseData.token); 
        window.location.replace("/")
     }else {
      alert(responseData.error)
     }

  }


  return (
    <div className='loginSignup'>
        <div className="loginSignup-container">
          <h1>{state}</h1>
          <div className="loginSignup-fields">
            {state === "Sign up"? <input name='username' value={formData.username} onChange={changeHanlder} type="text" placeholder='Your name' />:<></>}
            <input name='email' value={formData.email} onChange={changeHanlder} type="email" placeholder='Email address' />
            <input name='password' value={formData.password} onChange={changeHanlder} type="password" placeholder='Password ' />
          </div>
          <button onClick={()=>{state ==="Log in"? login(): signup()}}>Continue</button>
          {state === "Sign up"?  <p className="loginSignup-login">Already have an account? <span onClick={()=>{setState("Log in")}}>Login</span></p>:
          <p className="loginSignup-login">Create a new account ? <span onClick={()=>{setState("Sign up")}}>Sign up</span></p>}
          
          
          <div className="loginSignup-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        </div>
    </div>
  )
}
