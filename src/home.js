import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';

export default function Home() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const location = useLocation(); //detect route changes
    const {user} = useContext(AuthContext);
    const { customers_id } = user;
    const navigate = useNavigate();

        /*Display product */
        useEffect(() => {
        try {
            fetch('http://localhost:4000/product', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json'
                },
            })
        
            .then(response => response.json())
            .then ((product) => {
                //console.log('The products are ' + JSON.stringify(product));
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
                fetch(`http://localhost:4000/cart/${customers_id}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ 
                        customers_id: customers_id, //send the dynamic information in the body to the BE
                        product_id: product_id,
                        quantity: quantity, 
                    }),
                    headers: {
                        'Content-Type':'application/json'
                    },
                })
                .then((response) => response.json())
                .then((product) => {
                    //console.log('The cart include: ' + JSON.stringify (product));
                    setCart(product);
                    alert('Product successfully added to cart'); //Showing up in Firefox but not showing the message. Chrome ok
                })
            } catch(err) {
                console.log('Error adding to cart ', err);
            }
        };

        const redirectAccount = () => {
            if (user && user.role_id === 2) {
                navigate('/adminAccount');
            } else {
                navigate('/account');
            }
        }
        
    return (
        <Container className="homePage">
            <div className="header">
                <div className="mb-4">
                    <h3 id="titleHome">The Learning App</h3>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
                <Button variant="light" className="account" onClick={redirectAccount}>Account</Button>
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
                        <h4 style= {{'background-color': '#F2DADA'}}>{item.name}</h4>
                        <h6>{item.description} <br></br></h6>
                        <h6><strong>£{item.price}</strong></h6>
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

   
};