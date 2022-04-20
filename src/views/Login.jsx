import React from 'react';
import Navbar from '../components/Navbar';
import FormLogin from '../components/FormLogin';
import Footer from '../components/Footer';

const Login = ({ mode, setMode }) => {

    return (
        <div className="container" style={{height: '100vh'}}>
            <Navbar page="login" mode={mode} setMode={setMode}/>

            <FormLogin />

            <Footer />
        </div>
    )
}

export default Login;