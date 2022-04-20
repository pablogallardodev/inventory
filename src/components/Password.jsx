import React, { useState } from 'react';
import { BsCheck, BsX } from "react-icons/bs";

import firebase from "firebase";
import "firebase/auth";

import "../css/modal.css";

const Password = ({ showPassword, setShowPassword }) => {

    const [data, setData] = useState({
        actualPass: '',
        password: '',
        confirmPass: '',
        errorMsj: '',
        changePass: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.password === data.confirmPass) {
            var user = firebase.auth().currentUser;

            // Get credentials of user
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, data.actualPass);
            // Re-login for update password
            user.reauthenticateWithCredential(credential).then(() => {
                user.updatePassword(data.password).then(() => {
                    setData({ ...data, changePass: true})
                }).catch((error) => {
                    console.log(error);
                    if (error.code === "auth/weak-password") {
                        setData({ ...data, errorMsj: 'La nueva contraseña debe tener al menos 6 caracteres.'})
                    }
                });
            }).catch((error) => {
                if (error.code === "auth/wrong-password") {
                    setData({ ...data, errorMsj: 'La contraseña actual no coincide.'})
                }
            });
        } else {
            setData({ ...data, errorMsj: 'Lo siento las contraseñas no coinciden.'})
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        setData({ ...data, [e.target.name]: e.target.value});
    }

    return (
        <div className="modalContainer" style={ showPassword ? {display: 'flex'} : {display: 'none'}}>
            {
                data.changePass ? (
                    <div className="modalBody">
                        <h2>La contraseña fue actualizada correctamente.</h2>
                        <div className="container-button">
                            <button onClick={() => setShowPassword(false)}>
                                <BsCheck size={22} style={{ marginRight: 5 }}/>
                                <b>Aceptar</b>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="modalBody">
                        <h2>Por favor ingresa la contraseña nueva, y confirma la misma para actuaizarla.</h2>
                        <form onSubmit={handleSubmit} style={{ width: '90%' }}>
                            
                            <div className="form-group">
                                <label htmlFor="">Contraseña actual</label>
                                <input type="password" name="actualPass" value={data.actualPass} onChange={handleChange} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Contraseña nueva</label>
                                <input type="password" name="password" value={data.password} onChange={handleChange} required/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Confirme contraseña</label>
                                <input type="password" name="confirmPass" value={data.confirmPass} onChange={handleChange} required/>
                            </div>

                            <p className="msj-error">{data.errorMsj}</p>

                            <div className="container-button">              
                                <button onClick={() => setShowPassword(false)} style={{backgroundColor: 'red'}}>
                                    <BsX size={22} style={{ marginRight: 5}} color="#FFFFFF"/>
                                    <b>Cancelar</b>
                                </button>
                                <button>
                                    <BsCheck size={22} style={{ marginRight: 5 }}/>
                                    <b>Actualizar contraseña</b>
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Password;
