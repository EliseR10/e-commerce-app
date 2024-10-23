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
                fetch('http://localhost:4000/cart/:customers_id',{
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
                    alert('Product successfully added to cart'); //Showing up in Firefox but not showing the mesage. Chrome ok
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
                {/*Here you might need to link the database with the front-end and use
                the name, description and price*/}
                {/*{console.log('The array contains: ', product)}*/}
                
                {loading ? (
                    <p>Loading...</p>
                ) : (
                <>
                <div className="Spanish">
                    <div className="SpanishTitle">
                        <h4>{product[0].name}</h4>
                        <h6>{product[0].description} <br></br></h6>
                        <h6>£{product[0].price}</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light" onClick={() => addToCart(1, 1)}>Add to Cart</Button>
                    </div>
                </div>

                <div className="French">
                    <div className="FrenchTitle">
                        <h4>{product[2].name}</h4>
                        <h6>{product[2].description} <br></br></h6>
                        <h6>£{product[2].price}</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light">Add to Cart</Button>
                    </div>
                </div>

                <div className="Bulgarian">
                    <div className="BulgarianTitle">
                        <h4>{product[1].name}</h4>
                        <h6>{product[1].description} <br></br></h6>
                        <h6>£{product[1].price}</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light">Add to Cart</Button>
                    </div>
                
                </div>
                </>
                )}
            </div>
        </Container>
    );

    
}