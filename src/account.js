import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link, useLocation} from "react-router-dom";

//To import icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Account() {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); //detect route changes

    useEffect(() => {
        try {
            /*Fetch to display account data*/
            fetch('http://localhost:4000/account/:id', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Account data is' + JSON.stringify(data));
                setData(data);
                console.log("Making sure the data is saved : ", data);
                setLoading(false);
            })

            /*Fetch to display previous order*/
            fetch('http://localhost:4000/orders/1', {
                method: 'GET',
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => response.json())
            .then((order) => {
                const formattedOrder = order.map(order => ({
                    ...order,
                    order_date: order.order_date.slice(0, 10),
                }));
                console.log('The previous orders are ' + JSON.stringify(order));
                setOrder(formattedOrder);
                setLoading(false);
            })

        } catch (err) {
            console.error('Error fetching data', err);
            setLoading(false);
        }
    }, [location]) //trigger the useEffect every time we are on the page


    /*Get the value from the input*/
    const handleChange = (event) => {
        const {name, value } = event.target; //get the name and value of the input
        setData((prevData) => {
            const updatedData = [...prevData]; //spread the previous data to retain other properties
            updatedData[0] = {...updateAccount[0], [name] : value }; //update the specific property or default to empty string if value is falty
            return updatedData;
        });
        console.log('Input updated: ', name, value);
    };


    /*Here, fetch api endpoint of updateAccount + api endpoint of display 
    account to have the same as cart: update and display the updates*/
    const updateAccount = (id) => {
        try {
            fetch(`http://localhost:4000/account/2`, {
                method: 'PUT',
                body: JSON.stringify({
                    customers_phone_number: data[0]?.customers_phone_number || "",
                    password: data[0]?.password,
                }),
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to update account: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
                .then(() => {
                return fetch(`http://localhost:4000/account/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch updated account: ${response.status} ${response.statusText}`);   
                }
                return response.json();
            })
            .then((data) => {
                console.log('Your account has been updated' + JSON.stringify(data));
                setData(data);
                setLoading(false);
                alert('Your account has been updated, thank you!');
                })

        } catch (err) {
            console.log('Error updating your account detail ', err);
        }
    }

    const deleteOrder = (id) => {
        try {
            fetch(`http://localhost:4000/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => response.json())
            .then(() => {
                return fetch(`http://localhost:4000/orders/1`, {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                });
            })
            .then((response) => response.json())
            .then((order) => {
                const formattedOrder = order.map(order => ({
                    ...order,
                    order_date: order.order_date.slice(0, 10),
                }));
                console.log('The order has been cancelled. Here previous order: ' + JSON.stringify(order));
                alert('The order has been cancelled.');
                setOrder(formattedOrder);
                setLoading(false);
            })
            
        } catch (error) {
            console.log('Error deleting order', error);
        }
    }

    const deleteAccount = (id) => {
        try {
            fetch(`http://localhost:4000/account/2`, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Your account has been deleted');
                setData(data);
                alert('Your account has been deleted.');
            })
        } catch (err) {
            console.log('Error deleting your account ', err);
        }
    }

    return (
        <Container className="accountPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
                <Button variant="light" className="logout">Logout</Button>
            </div>

            <div className="yourAccount">
                <h3 id="yourAccountTitle">Your Account</h3>
                
                <>
                {loading ? (
                        <p>Account loading</p>
                ) : (
                    Array.isArray(data) && data.length > 0 ? (
                <>
                <div className="infoAccount">
                    
                    <label id="usernameInput" htmlFor="username">Username</label>
                    <br></br>
                    <input className="input" type="text" name="customers_username" value={data[0].customers_username} readOnly></input>
                    <br></br>

                    <label id="phoneInput" htmlFor="phone number">Phone number</label>
                    <br></br>
                    <input className="input" type="tel" name="customers_phone_number" id="inputPhone" pattern="[0-9]{5}\s[0-9]{6}" title="Please enter a valid phone number in the format 12345 678987" defaultValue={data[0].customers_phone_number} onChange={handleChange}></input>
                    {/* \s is for the space in the phone number */}
                    <br></br>
                    <Button className="btn1" variant="light" onClick={() => updateAccount(data.id)}>Save</Button>
                    <br></br>
                    
                    <label id="passwordInput">Password</label>
                    <br></br>
                    <input className="input" type="password" name="password" defaultValue={data[0].password} onChange={handleChange}></input>
                    <br></br>
                    <Button className="btn1" variant="light" onClick={() => updateAccount(data.id)}>Save</Button>

                </div>
                </>
                ) : (
                    <h6>No account data available.</h6>
                ))}
                </>

                <div className="previousOrder">
                    <h4>Your orders</h4>
                    <div className="order1">
                        {/*Map through the order array to display the orders.id, orders.order_date, 
                        orders.total_order_amount, order_items.product_id */}
                        
                        <>
                        {loading ? (
                            <p>Loading your previous orders...</p>
                        ) : (
                            Array.isArray(order) && order.length > 0 ? (
                            <>
                            
                            {order.map((item) => (
                                <div key={item.id} id="orderList">
                                    <h6><strong>Order ID:</strong> {item.orders_id} / <strong>Total Amount:</strong> £{item.total_order_amount}</h6>
                                    <h6><strong>Date of Order:</strong> {item.order_date}</h6>

                                    <Button variant="light" className="binOrder"><FontAwesomeIcon icon={faTrashCan} onClick={() => deleteOrder(item.orders_id)}/></Button>
                                </div>  
                            ))}
                            
                            </>
                        ) : (
                            <h6>You have no previous order.</h6>
                        )    
                        )}    
                        </>                  
                    </div>
                    
                </div>
                
                <div className="deleteBtn">
                    <Link to="/"><Button variant="light" className="deleteAccountBtn" onClick={() => deleteAccount(data.id)}>Delete my account</Button></Link>
                </div>
            </div>
        </Container>
    );
}