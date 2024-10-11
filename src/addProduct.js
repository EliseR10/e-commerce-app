import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function AddProduct() {
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
                    <label id="productId" for="productId">Product ID</label>
                    <br></br>
                    <input className="input" type="text" name="productId"></input>
                    <br></br>

                    <label id="productName" for="productName">Name of the product</label>
                    <br></br>
                    <input className="input" type="text" name="productName"></input>
                    <br></br>

                    <label id="productDescription" for="productDescription">Description</label>
                    <br></br>
                    <textarea className="input" type="text" name="productDescription"></textarea>
                    <br></br>

                    <label id="productPrice" for="productPrice">Price in £</label>
                    <br></br>
                    <input className="input" type="text" name="productPrice"></input>
                    <br></br>
                
                </div>

                <div className="validateBtn">
                    <Button variant="light" className="validateProductBtn">Validate</Button>
                </div>
            </div>
        </Container>
    )
}