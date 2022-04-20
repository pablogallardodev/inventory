import React from 'react'
import { FcStatistics, FcPaid, FcMultipleInputs } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { FaSun, FaMoon } from "react-icons/fa";

import "../css/sidebar.css";
import logo from "../assets/img/logo.png";

const Sidebar = ({ page, mode, setMode }) => {

    return (
        <div className="sidebar">

          <div className="logoContainer">
            <img src={logo} alt="My Inventory" className="logo"/>
          </div>

          <div className="switch">
              <FaSun size={25} style={{ color: '#F39C12' }}/>
              <Switch width={50} height={20} onChange={() => setMode(!mode)}
                      checked={mode} uncheckedIcon={false} checkedIcon={false} offColor="#333" onColor="#fff" onHandleColor="#333"/>
              <FaMoon size={25} style={{ color: '#444' }}/>
          </div>

          <Link to="/dashboard" className={page==='dashboard'? 'itemContainerA' : 'itemContainer'} title="Inicio">
            <FcStatistics size={28}/>
            <p>Dashboard</p>
          </Link>

          <Link to="/products" className={page==='products'? 'itemContainerA' : 'itemContainer'} title="Productos">
            <FcPaid size={28}/>
            <p>Productos</p>
          </Link>

          <Link to="/moves" className={page==='moves'? 'itemContainerA' : 'itemContainer'} title="Movimientos">
            <FcMultipleInputs size={28}/>
            <p>Movimientos</p>
          </Link>         

        </div>
    )
}

export default Sidebar
