import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Dropdown, DropdownMenu} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from './AuthContext';

//To import icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
    const [displayCart, setDisplayCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const { customers_id } = user;

    /*Display cart*/
    useEffect(() => {
        try {
            fetch(`http://localhost:4000/cart/${customers_id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json'
                },
            })

            .then(response => response.json())

            .then((cart) => {
                //console.log('The cart includes ' + JSON.stringify(cart));
                setDisplayCart(cart);
                setLoading(false);
            })

        } catch(err) {
            console.error('Error displaying cart' + err);
            setLoading(false);
        }
    }, [location]); //trigger the useEffect every time we are on the page

    const updateCart = (product_id, quantity) => {
        /*See Below: parseInt(newQuantity, 10): transform a string to a integer, second argument is to 
        specifies the base (decimal, or base-10), which is a good practice to avoid unexpected 
        results if dealing with different numeral systems*/
        try {
        
            fetch(`http://localhost:4000/cart/${customers_id}/${product_id}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({
                    quantity: parseInt(quantity, 10)
                    //quantity: {newQuantity}
                }),
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => response.json())
            .then (() => {
                return fetch(`http://localhost:4000/cart/${customers_id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            })
            .then((response) => response.json())
            .then((cart) => {
                //console.log('The product has been updated' + JSON.stringify(cart));
                setDisplayCart(cart);
                console.log('Latest cart update: ' + JSON.stringify(cart));
                setLoading(false);
            })
        } catch(err) {
            console.error('Error updating cart ' + err);
            setLoading(false);
        }
    }

    const deleteCart = (product_id) => {
        try {
            fetch(`http://localhost:4000/cart/${customers_id}/${product_id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => response.json())
            .then (() => {
                return fetch(`http://localhost:4000/cart/${customers_id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            })
            .then((response) => response.json())
            .then((cart) => {
                //console.log('The item has been deleted ' + JSON.stringify(cart));
                setDisplayCart(cart);
                setLoading(false);
            })
        } catch(err) {
            console.error('Error deleting cart ' + err);
            setLoading(false);
        }
    }

    const Order = () => {
        try {
                fetch(`http://localhost:4000/orders/${customers_id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })
                .then((response) => response.json())
                .then(data => {
                    console.log('Order created:', data);
                    navigate('/thankYou');               
                })
        } catch(err) {
            console.error('Error putting through the order ' + err);
            setLoading(false);
        }
    }

    const redirectAccount = () => {
        if (user && user.role_id === 2) {
            navigate('/adminAccount');
        } else {
            navigate('/account');
        }
    }

    return (
        <Container className="cartPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Button variant="light" className="account" onClick={redirectAccount}>Account</Button>
            </div>

            {console.log('The array contains: ', displayCart)}

            <div className="yourCart">
                <h3 id="yourCartTitle">Your Cart</h3>
                <>
                {loading ? (
                    <p>Loading your cart</p>
                ) : (
                    Array.isArray(displayCart.cartItems) && displayCart.cartItems.length > 0 ? (
                        <>
                        {displayCart.cartItems.map((item) => (
                            <div key={item.product_id} className="cartResume">
                                <h5>{item.name}</h5>
                                <h6>Quantity: {item.quantity}</h6>
                                <h6>Unit price: £{item.price}</h6>
                            <div className="inputAndBin">
                            
                                <Dropdown className="inputCart" onSelect={(eventKey) => updateCart(item.product_id, eventKey)}>
                                    <Dropdown.Toggle id="dropdownTitle" variant="light">
                                        Qty: {item.quantity}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {[...Array(10).keys()].map((_, i) => (
                                            <Dropdown.Item eventKey={i + 1} key={i + 1}>
                                                {i + 1}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                    
                                </Dropdown>
                                <Button variant="light" className="binCart"><FontAwesomeIcon icon={faTrashCan} onClick={() => deleteCart(item.product_id)}/></Button>
                            </div>
                            </div>                       
                        ))}
                        <div>
                            <h4>Total amount to pay: £ {displayCart.totalCartValue}</h4>
                        </div>
                        <div className="orderNow">
                            <Button variant="light" className="orderNowBtn" onClick={() => Order()}>ORDER NOW!</Button>
                        </div>
                        </>
                    ) : (
                        <h4>You have no items in the cart. <br></br> Please add at least one product to place an order.</h4>
                    )
                )}
                    </>
            </div>
        </Container>
        
    );
}