import React from 'react';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import '../css/home.css';
import imgBack from '../assets/img/back.png';
import { Link } from 'react-router-dom';

const Home = ({ mode, setMode }) => {
    return (
        <div className="container">
            <Navbar page="home" mode={mode} setMode={setMode}/>

            <section className="head">
                <div className="leftContainer">
                    <h1>El inventario que lo cambia todo...</h1>
                    <Link to="/login">
                        <button>Comenzar ahora!!</button>
                    </Link>
                </div>
                <img src={imgBack} alt=""/>
            </section>
            
            <Footer />
        </div>
    )
}

export default Home;
