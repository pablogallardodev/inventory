import React, { useEffect, useState } from 'react';
import { BsImages, BsX } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";

import Sidebar from '../components/Sidebar';
import Modal from "../components/Modal";
import '../css/profile.css';

const Profile = ({ mode, setMode }) => {

    const history = useHistory();
    const [modalConfig, setModalConfig] = useState({show: false, text: '', type: '', showButton: true});
    const [user, setUser] = useState({});

    useEffect(() => {
        const user = firebase.auth().currentUser;
        setUser(user);
    }, []);
    
    const signOut = () => {
        firebase.auth().signOut().then(() => {
            setModalConfig({
                show: true,
                text: 'Cerrando sesión...',
                type: 'success',
                showButton: false
            });
            setTimeout(() => {
                history.push("/");
                history.go();
            }, 1500);
        })
    }

    const validateEmail = () => {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            setModalConfig({
                show: true,
                text: 'Hemos enviado un correo electrónico a tu email para ser validado.',
                type: 'success',
                showButton: true
            });
        });
    }

    const updatePerfil = () => {
        const cUser = firebase.auth().currentUser;
        
        cUser.updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL
        }).then(() => {
            setModalConfig({
                show: true,
                text: 'El perfil ha sido actualizado correctamente.',
                type: 'success',
                showButton: true
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value});
    }

    const handleImage = (e) => {
        e.preventDefault();

        var file = e.target.files[0];
        /*var reader = new FileReader();
        reader.onloadend = function() {
            setUser({ ...user, photoURL: `${reader.result}`});
        }

        reader.readAsDataURL(file);*/

        setUser({ ...user, photoURL: `${window.URL.createObjectURL(file)}`});
    }

    return (
        <div className="containerLogged">
            <Sidebar mode={mode} setMode={setMode}/>
            <div className="content">
                <div className="user-data">
                    
                    <div className="img-container">
                        { user?.photoURL ? <img src={user?.photoURL} alt="product"/> : <BsImages size={60}/> }        
                        <input type="file" accept="image/*" onChange={handleImage}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="">Nombre: </label>
                        <input type="text" name="displayName" value={user?.displayName} onChange={handleChange}/>
                        <span onClick={ updatePerfil }>Actualizar nombre e imagen</span>
                    </div>

                        <div className="form-group">
                            <label htmlFor="">Correo Electrónico: </label>
                            <input type="text" name="email" value={user?.email} onChange={handleChange}/>
                            
                            {user?.emailVerified ? null : <span onClick={ validateEmail }>Validar correo electrónico</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="">¿Correo verificado?: </label>
                            <select style={{flex: 1}} name="emailVerified" value={user?.emailVerified ? 'Si' : 'No'} disabled>
                                <option value="-">-</option>
                                <option value="Si">Si</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Telefóno: </label>
                            <input type="text" name="phoneNumber" value={user?.phoneNumber ? user.phoneNumber : '-'} disabled/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Fecha de registro: </label>
                            <input type="text" name="creationTime" value={user?.metadata?.creationTime} disabled/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Ultimo inicio de sesión: </label>
                            <input type="text" name="lastSignInTime" value={user?.metadata?.lastSignInTime} disabled/>
                        </div>
                        
                        <div className="container-button">
                            <button onClick={signOut} style={{backgroundColor: 'red'}}>
                                <BsX size={22} style={{ marginRight: 5}} color="#FFFFFF"/>
                                Cerrar sesión
                            </button>
                        </div>
                </div>
            </div>
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig}/>
        </div>
    )
}

export default Profile
