import React, { useEffect, useState } from 'react';
import { BsTrash, BsPencil, BsImages } from "react-icons/bs";
import firebase from "firebase";
import "firebase/firestore";

import "../css/listProduct.css";
import Modal from "./Modal";

const ListProducts = ({ query, setEditProduct }) => {

    const [products, setProducts ] = useState([]);
    const [modalConfig, setModalConfig] = useState({show: false, text: '', type: '', showButton: true, handleClick: null})

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
    }, [query]);

    const editProduct = (id) => {
        setEditProduct({status: true, id: `${id}`})
    }

    const deleteProduct = (id, description) => {
        
        function modalClik() {
            const db = firebase.firestore();

            db.collection('products').doc(`${id}`).delete().then(() => {
                setModalConfig({
                    show: true,
                    text: `El producto '${description}' ha sido eliminado correctamente.`,
                    type: 'success',
                    showButton: true
                });

                setProducts(products.filter(el => el.id !== id));
            })
        }

        setModalConfig({
            show: true,
            text: `¿Desea eliminar el producto: '${description}', del inventario?`,
            type: 'info',
            showButton: true,
            handleClick: modalClik});
    };

    return (
        <div className="containerListProducts">
            {
                products.length > 0 ?
                (products.map((p)=> {
                    return <div key={p.id} className="cardProduct">
                        {p.data.img_b64 ? <img src={p.data.img_b64} alt="Products"/> : <div className="emptyImg"><BsImages size={60}/></div>}
                        <h3>{p.data.description}</h3>
                        <p><b>Código: </b>{p.data.sku}</p>
                        <p><b>Stock actual: </b>{p.data.stock} {p.data.product_Unit}</p>
                        <p><b>Marca: </b>{p.data.brand}</p>
                        <p><b>Pendiente: </b>{p.data.pending}</p>
                        <div className="containerBtnAction">
                            <BsPencil title="Editar" className="btnAction" size={24} style={{ color: 'var(--text)' }} onClick={() => editProduct(p.id)}/>
                            <BsTrash title="Eliminar" className="btnAction" size={24} style={{ color: 'var(--text)' }} onClick={() => deleteProduct(p.id, p.data.description)}/>
                        </div>
                    </div>
                })
                ):
                <div style={{ height: '100vh' }}><h1>Lo siento, pero no se ha encontrado ningun producto.</h1></div>
            }
            <Modal modalConfig={modalConfig} setModalConfig={setModalConfig}/>
        </div>
    )
}

export default ListProducts