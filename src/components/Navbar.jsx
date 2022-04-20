import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

import Switch from 'react-switch';
import { FaSun, FaMoon } from "react-icons/fa";

import '../css/navbar.css';

const Navbar = ({ page, mode, setMode }) => {

    return(
        <nav>
            <Link to="/" className="logoContainer">
                <img src={logo} alt="My Inventory"/>
                <h2>My Inventory</h2>    
            </Link>
            <ul>
                <li><Link to="/" className={page==='home'? 'active' : 'link'}>Home</Link></li>
                <li><Link to="/pricing" className={page==='price'? 'active' : 'link'}>Precios</Link></li>
                <li><Link to="/login" className={page==='login'? 'active' : 'link'}>Iniciar Sesión</Link></li>
                <li>
                    <div className="switch">
                        <FaSun size={30} style={{ color: '#F39C12' }}/>
                        <Switch onChange={() => setMode(!mode)} checked={mode}
                                uncheckedIcon={false} checkedIcon={false} offColor="#333" onColor="#fff" onHandleColor="#333"/>
                        <FaMoon size={30} style={{ color: '#000' }}/>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;