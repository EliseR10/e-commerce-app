import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function AddProduct() {
    const [product, setProduct] = useState([]);

    /*Get the value from the input*/
    const handleChange = (event) => {
        const {name, value } = event.target; //get the name and value of the input
        setProduct((prevData) => {
            const updatedProduct = [...prevData]; //spread the previous data to retain other properties
            updatedProduct[0] = {...prevData[0], [name] : value || prevData[0][name] || ""}; //making sure if value is falty, it doesn't overwrite the previous data
            return updatedProduct;
        });
        console.log('Input updated: ', name, value);
    };

    const addProduct = (event) => {
        //Make sure the inputs are filled otherwise throw alert
        if (!product[0] || !product[0].id || !product[0].name || !product[0].description || !product[0].price) {
            event.preventDefault(); //stop the redirection of the <Link> button
            alert('Please add new product data first.');
            return;
        }

        try {
            
            fetch('http://localhost:4000/product', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: product[0]?.id || "", 
                    name: product[0]?.name || "",
                    description: product[0]?.description || "",
                    price: product[0]?.price || ""
                }),
            })
            .then((response) => response.json())
            
            .then((product) => {
                console.log('The new product has been added ' + JSON.stringify(product));
                setProduct(product);
                alert('The new product has been added!');
            })
        } catch (err) {
            console.log('Error adding the product' + err);
        }
    }

    return (
        <Container className="AddProductPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
            </div>

            <div className="addAProduct">
                <h3 id="addAProductTitle">Add a Product</h3>

                <div className="ProductDetails">
                    <label id="productId" htmlFor="productId">Product ID</label>
                    <br></br>
                    <input className="input" type="text" name="id" onChange={handleChange}></input>
                    <br></br>

                    <label id="productName" htmlFor="productName">Name of the product</label>
                    <br></br>
                    <input className="input" type="text" name="name" onChange={handleChange}></input>
                    <br></br>

                    <label id="productDescription" htmlFor="productDescription">Description</label>
                    <br></br>
                    <textarea className="input" type="text" name="description" onChange={handleChange}></textarea>
                    <br></br>

                    <label id="productPrice" htmlFor="productPrice">Price in £</label>
                    <br></br>
                    <input className="input" type="text" name="price" onChange={handleChange}></input>
                    <br></br>
                
                </div>

                <div className="validateBtn">
                    <Link to="/adminAccount"><Button variant="light" className="validateProductBtn" onClick={(event) => addProduct(event)}>Validate</Button></Link>
                </div>
            </div>
        </Container>
    )
}