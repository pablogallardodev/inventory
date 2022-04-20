import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/pricing.css';

const Pricing = ({ mode, setMode }) => {
    return (
        <div className="container" style={{height: '100vh'}}>
            <Navbar page="price" mode={mode} setMode={setMode}/>
            
            <section>
                <h1>Precios</h1>
            </section>

            <Footer />
        </div>
    )
}

export default Pricing;
