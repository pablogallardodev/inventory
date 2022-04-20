import React from 'react'
import { FcCancel, FcOk, FcInfo } from "react-icons/fc";

import "../css/modal.css";

const Modal = ({ modalConfig, setModalConfig }) => {

    const handleClick = () => {
        modalConfig.handleClick();
        setModalConfig({show: false, text: '', type: '', showButton: true, handleClick: null});        
    }

    return (
        <div className="modalContainer" style={ modalConfig.show ? {display: 'flex'} : {display: 'none'}}>
            <div className="modalBody">
                { modalConfig.type === 'error' ? <FcCancel size={50} /> : null }
                { modalConfig.type === 'success' ? <FcOk size={50} /> : null }
                { modalConfig.type === 'info' ? <FcInfo size={50} /> : null }
                <h2>{ modalConfig.text }</h2>
                { modalConfig.handleClick ? (
                    <div className='container-button'>
                        <button onClick={() => {setModalConfig({show: false, text: '', type: '', showButton: true, handleClick: null})}} style={{backgroundColor: 'red'}}>Cancelar</button>
                        <button onClick={handleClick}>Aceptar</button>
                    </div>
                ) : (
                    modalConfig.showButton ? <button onClick={() => {setModalConfig({show: false, text: '', type: '', showButton: true, handleClick: null})}}>Aceptar</button> : null
                ) }
            </div>
        </div>
    )
}

export default Modal
