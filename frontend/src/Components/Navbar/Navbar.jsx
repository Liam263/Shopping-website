import React, { useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    const [menu, setMenu] = useState("shop")
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="logo" />
            <p>SHOPPER</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=> {setMenu("shop")}}> <Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu === "shop" ? <hr></hr>: <></>}</li>
            <li onClick={()=> {setMenu("men")}}> <Link style={{textDecoration: 'none'}} to = '/men'>Mens</Link> {menu === "men" ? <hr></hr>: <></>}</li>
            <li onClick={()=> {setMenu("women")}}><Link style={{textDecoration: 'none'}} to = '/women'>Womens</Link> {menu === "women" ? <hr></hr>: <></>}</li>
            <li onClick={()=> {setMenu("kids")}}><Link style={{textDecoration: 'none'}} to ='/kids'>Kids</Link>{menu === "kids" ? <hr></hr>: <></>}</li>
        </ul>

        <div className="nav-login-cart">
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">0</div>
        </div>
    </div>
  )
}

export default Navbar
