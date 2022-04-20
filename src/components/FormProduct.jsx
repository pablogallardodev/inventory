import React, { useEffect, useState } from 'react';
import { BsImages, BsCheck, BsX } from "react-icons/bs";
import firebase from "firebase";
import "firebase/firestore";

import "../css/formProduct.css";
import Modal from "./Modal";

const FormProduct = ({ setNewProduct, editProduct, setEditProduct, setQuery }) => {

    const [modalConfig, setModalConfig] = useState({show: false, text: '', type: '', showButton: true})
    const [ product, setProduct ] = useState({
        sku: '',
        description: '',
        cost: 0,
        brand: '',
        width: {
            size: 0,
            unit: '-'
        },
        height: {
            size: 0,
            unit: '-'
        },
        weight: {
            size: 0,
            unit: '-'
        },
        thickness: {
            size: 0,
            unit: '-'
        },
        color: '',
        product_Unit: '-',
        stock: 0,
        pending: 0,
        img_b64: ''
    });

    useEffect(() => {
        async function getData() {
            const db = firebase.firestore();

            await db.collection("products").doc(`${editProduct.id}`).get().then((doc) => {
                if (doc.exists) {
                    setProduct(doc.data());
                }else{
                    console.log("No se encontro el item seleccionado");
                }
            }).catch((error) => {
                console.log(`Lo siento ha ocurrdio un error. ${error}`);
            })
        }

        if (editProduct.status) getData();
            
    }, [editProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const db = firebase.firestore();

        if (!editProduct.status) {
            db.collection('products').add(product).then((docRef) => {
                setModalConfig({
                    show: true,
                    text: 'El producto ha sido registrado exitosamente.',
                    type: 'success',
                    showButton: false
                });

                setTimeout(() => {
                    setNewProduct(false);
                    setQuery("");
                }, 2000);
            }).catch((error) => {
                setModalConfig({
                    show: true,
                    text: `Lo siento ha ocurrido un error. ${error}`,
                    type: 'error',
                    showButton: true
                });
            });
        } else {
            db.collection("products").doc(editProduct.id).set(product).then(() => {
                setModalConfig({
                    show: true,
                    text: 'El producto ha sido actualizado exitosamente.',
                    type: 'success',
                    showButton: false
                });

                setTimeout(() => {
                    setEditProduct({status: false, id: 0});
                    setQuery("");
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

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.name === 'height' || e.target.name === 'weight'
         || e.target.name === 'thickness' ||e.target.name === 'width') {
            if (Number(e.target.value) >= 0) {
                setProduct({ ...product, [e.target.name]: { ...product[e.target.name] , size: Number(e.target.value) }});
            }else{
                setProduct({ ...product, [e.target.name]: { ...product[e.target.name] , unit: e.target.value }});
            }
        } else {
            setProduct({ ...product, [e.target.name]: e.target.value});
        }

    }

    const handleImage = (e) => {
        e.preventDefault();

        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
            setProduct({ ...product, img_b64: `${reader.result}`});
        }

        reader.readAsDataURL(file);
    }

    const handleCancel = (e) => {
        e.preventDefault();

        setNewProduct(false);
        setEditProduct({status: false, id: 0});
        setQuery("");
    }

    return (
        <form className="containerFormProducts" onSubmit={handleSubmit}>

            <div className="container-column">
                <div className="column">
                    <div className="img-container">
                        { product.img_b64 ? <img src={product.img_b64} alt="product"/> : <BsImages size={60}/> }            
                        <input type="file" accept="image/*" onChange={handleImage}/>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="">Código: </label>
                        <input type="text" name="sku" value={product.sku} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Descripcion: </label>
                        <input type="text" name="description" value={product.description} onChange={handleChange} required/>    
                    </div>

                    <div className="form-group">
                    <label htmlFor="">Unidad de medida: </label>
                        <select style={{flex: 1}} name="product_Unit" value={product.product_Unit} onChange={handleChange} required>
                            <option value="-">-</option>
                            <option value="mm">mm</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                            <option value="Litro">Litro</option>
                            <option value="Unidad">Unidad</option>
                            <option value="Rollo">Rollo</option>
                            <option value="m2">m2</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Costo: </label>
                        <input type="number" name="cost" value={product.cost} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Stock actual: </label>
                        <input type="number" name="stock" value={product.stock} onChange={handleChange} required disabled/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Pendiente: </label>
                        <input type="number" name="pending" value={product.pending} onChange={handleChange} required disabled/>
                    </div>
                </div>

                <div className="column">
                    <div className="form-group">
                        <label htmlFor="">Marca: </label>
                        <input type="text" name="brand" value={product.brand} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Color: </label>
                        <input type="text" name="color" value={product.color} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Alto: </label>
                        <input type="number" name="height" value={product.height.size} onChange={handleChange} required/>
                        <select name="height" value={product.height.unit} onChange={handleChange}>
                            <option value="-">-</option>
                            <option value="mm">mm</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Ancho: </label>
                        <input type="number" name="width" value={product.width.size} onChange={handleChange} required/>
                        <select name="width" value={product.width.unit} onChange={handleChange}>
                            <option value="-">-</option>
                            <option value="mm">mm</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Grosor: </label>
                        <input type="number" name="thickness" value={product.thickness.size} onChange={handleChange} required/>
                        <select name="thickness" value={product.thickness.unit} onChange={handleChange}>
                            <option value="-">-</option>
                            <option value="mm">mm</option>
                            <option value="cm">cm</option>
                            <option value="m">m</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Peso: </label>
                        <input type="number" name="weight" value={product.weight.size} onChange={handleChange} required/>
                        <select name="weight" value={product.weight.unit} onChange={handleChange}>
                            <option value="-">-</option>
                            <option value="g">g</option>
                            <option value="KG">KG</option>
                            <option value="Ton">Ton</option>
                        </select> 
                    </div>
                </div>
            </div>            

            <div className="container-button">                
                <button onClick={handleCancel} style={{backgroundColor: 'red'}}>
                    <BsX size={22} style={{ marginRight: 5}} color="#FFFFFF"/>
                    <b>Cancelar</b>
                </button>
                <button>
                    <BsCheck size={22} style={{ marginRight: 5 }}/>
                    { editProduct.status ? <b>Actualizar datos</b> : <b>Crear producto</b> }
                </button>
            </div>
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig}/>
        </form>
    )
}

export default FormProduct