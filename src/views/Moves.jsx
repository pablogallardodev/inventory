import React, { useState, useEffect } from 'react';
import { BsSearch, BsImages, BsCheck, BsX } from "react-icons/bs";
import firebase from "firebase";
import "firebase/firestore";

import Sidebar from '../components/Sidebar'
import ProfileCard from "../components/ProfileCard";
import "../css/moves.css";
import Modal from "../components/Modal";

const Moves = ({ mode, setMode }) => {

    const [modalConfig, setModalConfig] = useState({show: false, text: '', type: '', showButton: true, handleClick: null})
    const [products, setProducts ] = useState([]);
    const [query, setQuery] = useState('');
    const [editProduct, setEditProduct] = useState({});
    const [typeIn, setTypeIn] = useState(true);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        async function getData() {
            const db = firebase.firestore();
            const newP = []

            await db.collection("products").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let p = {
                        id: doc.id,
                        data: doc.data()
                    };
                    newP.push(p);
                });
            });
            if (query) {
                setProducts(newP.filter(el => el.data.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 || el.data.sku.toLowerCase().indexOf(query.toLowerCase()) !== -1))
            } else {
                setProducts(newP);
            }
        }

        getData();
    }, [query, editProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();

        var quantityFinal = typeIn
            ? parseInt(editProduct.data.stock) + parseInt(quantity)
            : parseInt(editProduct.data.stock) - parseInt(quantity);
        
        if (quantityFinal < 0) {
            setModalConfig({
                show: true,
                text: 'Lo siento pero la cantidad final debe ser igual o mayor a cero.',
                type: 'error',
                showButton: true
            });
        } else {
            const db = firebase.firestore();

            db.collection("products").doc(editProduct.id).update({
                stock: quantityFinal
            }).then(() => {
                setModalConfig({
                    show: true,
                    text: `El stock del producto '${editProduct.data.description}', ha sido actualizado correctamente.`,
                    type: 'success',
                    showButton: false
                });
    
                setTimeout(() => {
                    setModalConfig({show: false, text: '', type: '', showButton: true, handleClick: null});
                    setEditProduct({});
                    setQuantity(0);
                }, 2000);
            }).catch((error) => {
                setModalConfig({
                    show: true,
                    text: `Lo siento ha ocurrido un error. ${error}`,
                    type: 'error',
                    showButton: true
                });
            });
        }
    }
    
    return (
        <div className="containerLogged">
            <Sidebar page="moves" mode={mode} setMode={setMode}/>
            <ProfileCard />
            <div className="content">
                <h1>Movimientos</h1>
                <div className="container-move">
                    <div className="container-item">
                        <h2>Generar nuevo movimiento</h2>
                        <p>Por favor selecciona el producto del listado derecho al que deseas generar el movimiento de stock.</p>
                        <form className="form-move" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="">Código</label>
                                <input type="text" value={editProduct.data ? editProduct.data.sku : ''} disabled/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Descripción</label>
                                <input type="text" value={editProduct.data ? editProduct.data.description : ''} disabled/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Stock actual</label>
                                <input type="text" value={editProduct.data ? editProduct.data.stock + ' ' + editProduct.data.product_Unit : ''} disabled/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="">Tipo de movimiento</label>
                                <div className="container-type">
                                    <button type="button" onClick={ () => setTypeIn(!typeIn)} style={ !typeIn ? { background: 'gray' } : null }>Entrada</button>
                                    <button type="button" onClick={ () => setTypeIn(!typeIn)} style={ typeIn ? { background: 'gray' } : null }>Salida</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Cantidad</label>
                                <input type="number" min="0" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="">Cantidad final</label>
                                <input type="text" value={
                                    editProduct.data
                                    ? ( typeIn
                                        ? parseInt(editProduct.data.stock) + parseInt(quantity)
                                        : parseInt(editProduct.data.stock) - parseInt(quantity) ) + ' ' + editProduct.data.product_Unit
                                    : '' }  disabled/>
                            </div>

                            <div className="container-button">                
                                <button type="button" onClick={() => setEditProduct({})} style={{backgroundColor: 'red'}}>
                                    <BsX size={22} style={{ marginRight: 5}} color="#FFFFFF"/>
                                    <b>Cancelar</b>
                                </button>
                                <button type="submit">
                                    <BsCheck size={22} style={{ marginRight: 5 }}/>
                                    <b>Guardar</b>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="container-item">
                        <h2>Productos actuales</h2>
                        
                        <div className="searchContainer">
                            <BsSearch size={22}/>
                            <input type="text" placeholder="Buscar producto..."
                                onChange={(e) => e.target.value.length >= 3 ? setQuery(e.target.value) : setQuery("")}
                            />
                        </div>
                        
                        <div style={{overflowY: 'scroll', maxHeight: '31rem'}}>
                        {
                            products.length > 0 ?
                            (products.map((p)=> {
                                return <div className="product-item" onClick={ () => {
                                            setEditProduct(p);
                                            setQuantity(0);
                                        }} style={ p.data.stock <= 0 ? {backgroundColor:'#EC7063'} : null}>
                                    <div>
                                        {p.data.img_b64 ? <img src={p.data.img_b64} alt="Products"/> : <div className="emptyImg"><BsImages size={60}/></div>}
                                    </div>
                                    <div style={{ marginLeft: '10px', }}>
                                        <h3>{p.data.description}</h3>
                                        <p><b>Código: </b>{p.data.sku}</p>
                                        <p><b>Stock actual: </b>{p.data.stock} {p.data.product_Unit}</p>
                                        <p><b>Pendiente: </b>{p.data.pending}</p>
                                    </div>
                                </div>
                            })
                            ):
                            <h2>Lo siento, pero no se ha encontrado ningun producto.</h2>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig}/>
        </div>
    )
}

export default Moves
