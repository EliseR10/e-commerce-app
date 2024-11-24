import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link, useLocation} from "react-router-dom";

//To import icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function AdminAccount() {
    const [data, setData] = useState([]);
    const [product, setProduct] = useState([]);
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
                console.log('Admin account data is' + JSON.stringify(data));
                setData(data);
                console.log("Making sure the data is saved : ", data);
                setLoading(false);
            })

            /*Fetch to display product data*/
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
            console.error('Error fetching account data', err);
            setLoading(false);
        }
    }, [location]) //trigger the useEffect every time we are on the page

    /*Get the value from the input*/
    const handleChange = (event) => {
        const {name, value } = event.target; //get the name and value of the input
        setData((prevData) => {
            const updatedData = [...prevData]; //spread the previous data to retain other properties
            updatedData[0] = {...updateAdminAccount[0], [name] : value }; //update the specific property or default to empty string if value is falty
            return updatedData;
        });
        console.log('Input updated: ', name, value);
    };

    /*Here, fetch api endpoint of updateAccount + api endpoint of display 
    account to have the same as cart: update and display the updates*/
    const updateAdminAccount = (id) => {
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
            console.log('Error updating your admin account detail ', err);
        }
    }

    const deleteProduct = (id) => {
        try {
            fetch(`http://localhost:4000/product/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
            })
            .then((response) => response.json())
            .then(() => {
                return fetch('http://localhost:4000/product', {
                    method: 'GET',
                    headers: {
                        'Content-Type':'application/json'
                    },
                })    
            })
            .then((response) => response.json())
            .then((product) => {
                console.log('The products has been deleted');
                setProduct(product);
                setLoading(false);
                alert('The product has been deleted.');
            })
        } catch (err) {
            console.log('Error deleting the product ', err);
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

            <div className="yourAdminAccount">
                <h3 id="yourAccountTitle">Your Account</h3>
                
                {loading ? (
                    <p>Admin account loading...</p>
                ) : (
                <>
                
                <div>
                {data && data.length > 0 ? ( 
                <div className="infoAdminAccount">
                
                    <label id="usernameInput" htmlFor="username">Username</label>
                    <br></br>
                    <input className="input" type="text" name="customers_username" value={data[0].customers_username} readOnly></input>
                    <br></br>

                    <label id="phoneInput" htmlFor="phone number">Phone number</label>
                    <br></br>
                    <input className="input" type="tel" name="customers_phone_number" id="inputPhone" pattern="[0-9]{5}\s[0-9]{6}" title="Please enter a valid phone number in the format 12345 678987" defaultValue={data[0].customers_phone_number} onChange={handleChange}></input>
                    {/*\s is for the space in the phone number*/}
                    <br></br>
                    <Button className="btn1" variant="light" onClick={() => updateAdminAccount(data.id)}>Save</Button>
                    <br></br>
                    
                    <label id="passwordInput">Password</label>
                    <br></br>
                    <input className="input" type="password" defaultValue={data[0].password} onChange={handleChange}></input>
                    <br></br>
                    <Button className="btn1" variant="light" onClick={() => updateAdminAccount(data.id)}>Save</Button>
                </div>
                ) : (
                    <p>Account details not available.</p>
                )}
                </div>

                <div className="productList">
                    <h4>Your products</h4>
                    <div className="product1">
                        {/*Map through the product array so we can dynamically display the products from the product table */}
                        <>
                        {loading ? (
                            <p>Loading your products...</p>
                        ) : (
                            Array.isArray(product) && product.length > 0 ? (
                            <>

                            {product.map((item) => (
                                <div key={item.name} className="adminDisplay">
                                    <h6 className="adminProductData"><strong>{item.name}</strong></h6>
                                    <Link to={`/modifyProduct/${item.id}`}><Button variant="black-link" className="modifyProduct">Modify this product</Button></Link>
                                    <Button variant="light" className="binProduct" onClick={() => deleteProduct(item.id)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                                </div>
                            ))}
                                
                            </>
                        ) : (
                            <h6>You have no products at the moment.</h6>
                        )
                        )}
                        </>
                    
                    </div>
                </div>
                    </>
                )}
                    <div className="addAProductPart">
                        <Link to="/addProduct"><Button id="addAProductBtn" variant="light">Add a product</Button></Link>
                    </div>
            </div>
        </Container>
    );
}