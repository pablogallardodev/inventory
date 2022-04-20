import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { useHistory } from "react-router-dom";

//Librerias de firebase
import firebase from "firebase";
import "firebase/auth";

import '../css/login.css';
import Modal from './Modal';

const FormLogin = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [modalConfig, setModalConfig] = useState({show: false, text: '', type: '', showButton: true})

    const loginEmail = (e) => {
        e.preventDefault();
        
        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    history.push('/dashboard');
                })
                .catch((error) => {
                    if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                        setModalConfig({ show: true, text: '¡Error!, Correo o contraseña incorrectos.', type: 'error', showButton: true });
                    } else if (error.code === 'auth/invalid-email') {
                        setModalConfig({ show: true, text: '¡Error!, Por favor valida que el correo electrónico este escrito correctamente.', type: 'error', showButton: true });
                    }else {
                        console.log(error.code, error.message);
                    }
                });
        } else {
            setModalConfig({
                show: true,
                text: 'Por favor ingresa un correo electrónico y una contraseña.',
                type: 'info',
                showButton: true
            });
        }
    }

    const registerEmail = async (e) => {
        e.preventDefault();
        if (email && password) {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    history.push('/dashboard');
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email'){
                        setModalConfig({ show: true, text: '¡Error!, Por favor valida que el correo electrónico este escrito correctamente.', type: 'error', showButton: true });
                    } else if (error.code === 'auth/weak-password'){
                        setModalConfig({ show: true, text: 'La contraseña debe tener al menos 6 caracteres.', type: 'error', showButton: true });
                    } else if ( error.code === 'auth/email-already-in-use' ) {
                        setModalConfig({ show: true, text: '¡Lo siento!, la dirección de correo electrónico ya se encuentra registrada en nuestra plataforma.', type: 'info', showButton: true });                        
                    }
                })
        } else {
            setModalConfig({
                show: true,
                text: 'Por favor ingresa un correo electrónico y una contraseña.',
                type: 'info',
                showButton: true
            });
        }
    }

    const loginGoogle = async (e) => {
        e.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();

        await firebase.auth().signInWithPopup(provider)
            .then((result) => { history.push('/dashboard'); }).catch((error) => { console.log(error); })
    }

    const forgotPass = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container">     
            <section className="loginSection">
                <form className="cardLogin">
                    <h1>{ isLogin ? "Iniciar sesión" : "Regístrarse"}</h1>
                    <input type="email" placeholder="Correo electrónico" autoComplete="username" required value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Contraseña" autoComplete="current-password" required value={password} onChange={(ev) => setPassword(ev.target.value)}/>

                    {
                        isLogin 
                        ? <button onClick={loginEmail}><MdEmail size={24}/>Iniciar sesión</button>
                        : <button onClick={registerEmail}><MdEmail size={24}/>Crear una cuenta</button>
                    }
                    
                    <h4>Ó</h4>
                    
                    {
                        isLogin
                        ? <button onClick={loginGoogle}><FcGoogle size={24}/>Iniciar sesión con Google</button>
                        : <button onClick={loginGoogle}><FcGoogle size={24}/>Regístrarse con Google</button>
                    }
                    
                    { isLogin ? <h3 onClick={forgotPass}><span>¿Olvidaste tu contraseña?</span></h3> : null }

                    {
                        isLogin
                        ? <h3>¿No tienes cuenta?<span onClick={() => setIsLogin(!isLogin)}> Crea una</span></h3>
                        : <h3>¿Ya tienes una cuenta?<span onClick={() => setIsLogin(!isLogin)}> Iniciar sesión</span></h3>
                    }
                    
                </form>
            </section>
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig}/>        
        </div>
    )
}

export default FormLogin;
