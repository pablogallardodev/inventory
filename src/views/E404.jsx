import React from 'react';
import { FcCancel } from "react-icons/fc";

const Home = () => {
    return (
        <div className="container" style={{ height: '100vh' }}>
            <section style={{
                textAlign: 'center',
                fontSize: '50px'
            }}>
                <FcCancel size={150} style={{marginTop: '10rem'}}/>
                <h1 style={{margin: 0}}>Error 404</h1>
                <h1 style={{margin: 0}}>PAGE NOT FOUND.</h1>                   
            </section>
        </div>
    )
}

export default Home;
