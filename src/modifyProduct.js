import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link, useLocation, useParams} from "react-router-dom";

export default function ModifyProduct() {
    const {id} = useParams(); //retrieve product ID from URL
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); //detect route changes
    

    useEffect(() => {
        try {
            /*Fetch to display product data*/
            fetch(`http://localhost:4000/product/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                },
            })
        
            .then((response) => response.json())

            .then ((product) => {
                console.log('The products are ' + JSON.stringify(product));
                setProduct(product);
                setLoading(false);
            })
        } catch (err) {
            console.error('Error fetching product data', err);
            setLoading(false);
        }
    }, [id, location]) //essential for the fetch to run when the id is changing

    /*Get the value from the input*/
    const handleChange = (event) => {
        const {name, value } = event.target; //get the name and value of the input
        setProduct((prevData) => {
            const updatedProduct = [...prevData]; //spread the previous data to retain other properties
            updatedProduct[0] = {...updateProduct[0], [name] : value }; //update the specific property or default to empty string if value is falty
            return updatedProduct;
        });
        console.log('Input updated: ', name, value);
    };
    
    const updateProduct = (id, name, description, price) => {
        try {
            fetch('http://localhost:4000/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: product[0].id,
                    name: product[0].name,
                    description: product[0].description,
                    price: product[0].price
                }),
            })
            .then((response) => response.json())
            .then(() => {
                return fetch(`http://localhost:4000/product/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json'
                    },
                })
            })
            .then((response) => response.json())
            .then((product) => {
                console.log('Your product has been updated ' + JSON.stringify(product));
                setProduct(product);
                setLoading(false);
                alert('Your product has been updated!');
            }) 
        } catch (err) {
            console.error('Error updating the product data', err);
            setLoading(false);
        }
    }

    return (
        <Container className="AddProductPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
                <Link to="/account"><Button variant="light" className="account">Account</Button></Link>
            </div>

            <div className="addAProduct">
                <h3 id="addAProductTitle">Modify a Product</h3>

                {loading ? (
                    <p>Product data loading...</p>
                ) : (
                    <>
                <div>
                {product && product.length > 0 ? (

                
                <div className="ProductDetails">
                    <label id="productId" htmlFor="productId">Product ID</label>
                    <br></br>
                    <input className="input" type="text" name="productId" value={product[0].id} readOnly></input>
                    <br></br>

                    <label id="productName" htmlFor="productName">Name of the product</label>
                    <br></br>
                    <input className="input" type="text" name="productName" defaultValue={product[0].name} onChange={handleChange}></input>
                    <br></br>

                    <label id="productDescription" htmlFor="productDescription">Description</label>
                    <br></br>
                    <textarea className="input" type="text" name="productDescription" defaultValue={product[0].description} onChange={handleChange}></textarea>
                    <br></br>

                    <label id="productPrice" htmlFor="productPrice">Price in £</label>
                    <br></br>
                    <input className="input" type="text" name="productPrice" defaultValue={product[0].price} onChange={handleChange}></input>
                    <br></br>
                
                </div>
                ) : (
                    <p>Product detail not available.</p>
                )}
                </div>
                </>
                )}
                <div className="validateBtn">
                    <Button variant="light" className="validateProductBtn" onClick={() => updateProduct(product[0].id, product[0].name, product[0].description,product[0].price)}>Validate</Button>
                </div>
            </div>
        </Container>
    )
}