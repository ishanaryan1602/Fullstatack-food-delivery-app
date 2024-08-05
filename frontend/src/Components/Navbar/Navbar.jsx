import React, { useContext } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext.jsx'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext)

    return (
        <div className="navbar">
            <Link to='/' ><img src={assets.logo} alt="" className='logo' /></Link>

            <ul className="navbar-menu">
                <Link onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                {/* <li onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</li> */}
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to="/cart" ><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <button onClick={() => setShowLogin(true)}>Sign In</button>
            </div>
        </div>
    )
}

export default Navbar