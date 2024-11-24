import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link, useLocation} from "react-router-dom";

export default function Home() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const location = useLocation(); //detect route changes

        /*Display product */
        useEffect(() => {
        try {
            fetch('http://localhost:4000/product', {
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
            console.error('Error retrieving products ' + err);
            setLoading(false);
        }
        }, [location]); //trigger the useEffect every time the location change (page revisit)
    

        const addToCart = (product_id, quantity) => {
            try {
                fetch('http://localhost:4000/cart/:customers_id', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        customers_id: 1, //send the dynamic information in the body to the BE
                        product_id: product_id,
                        quantity: quantity, 
                    }),
                    headers: {
                        'Content-Type':'application/json'
                    },
                })
                .then((response) => response.json())
                .then((product) => {
                    console.log('The cart include: ' + JSON.stringify (product));
                    setCart(product);
                    alert('Product successfully added to cart'); //Showing up in Firefox but not showing the message. Chrome ok
                })
            } catch(err) {
                console.log('Error adding to cart ' + err);
            }
        };
        
    return (
        <Container className="homePage">
            <div className="header">
                <div className="mb-4">
                    <h3 id="titleHome">The Learning App</h3>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
                <Link to="/account"><Button variant="light" className="account">Account</Button></Link>
            </div>

            <div className="offer">
            {loading ? (
                <p>Products loading...</p>
            ) : (
                
            Array.isArray(product) && product.length > 0 ? (
                <>
                {product.map((item) => (
                <div className="Spanish" key={item.product_id}>
                    <div className="SpanishTitle">
                        <h4>{item.name}</h4>
                        <h6>{item.description} <br></br></h6>
                        <h6>£{item.price}</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light" onClick={() => addToCart(item.id, 1)}>Add to Cart</Button>
                    </div>
                </div>
                ))}
                
                </>
                ) : (
                    <h4>No product available for sales.</h4>
                )
            )}
            
            </div>
        </Container>
    );

    
}