import React, { useState } from 'react';
import { BsSearch, BsPlusCircle } from "react-icons/bs";

import Sidebar from '../components/Sidebar'
import ProfileCard from "../components/ProfileCard";
import ListProducts from "../components/ListProducts";
import FormProduct from "../components/FormProduct";
import "../css/products.css"

const Products = ({ mode, setMode }) => {

    const [query, setQuery] = useState("");
    const [newProduct, setNewProduct] = useState(false);
    const [editProduct, setEditProduct] = useState({status: false, id: 0});

    return (
        <div className="containerLogged">
            <Sidebar page="products" mode={mode} setMode={setMode}/>
            <ProfileCard />
            <div className="content">
                <h1>Productos</h1>

                { !newProduct && !editProduct.status ?
                (<div className="actionSection">
                    <div className="searchContainer">
                        <BsSearch size={22}/>
                        <input type="text" placeholder="Buscar producto..."
                            onChange={(e) => e.target.value.length >= 3 ? setQuery(e.target.value) : setQuery("")}
                        />
                    </div>
                    <button className="add-product" onClick={() => setNewProduct(!newProduct)}>
                        <BsPlusCircle size={22} style={{ marginRight: 5 }}/>
                        <b>Añadir producto</b>
                    </button>
                </div>) : null }

                {
                    newProduct || editProduct.status
                    ? <FormProduct setNewProduct={setNewProduct} editProduct={editProduct} setEditProduct={setEditProduct} setQuery={setQuery}/>
                    : <ListProducts query={query} setEditProduct={setEditProduct}/>
                }
            </div>
        </div>
    )
}

export default Products
