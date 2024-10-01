import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function Account() {
    return (
        <Container className="accountPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/cart"><Button variant="light" className="cart">Cart</Button></Link>
            </div>

            <div className="yourAccount">
                <h3 id="yourAccountTitle">Your Account</h3>
                
                <div className="infoAccount">
                    <label id="usernameInput" for="username">Username</label>
                    <br></br>
                    <input className="input" type="text" name="username" value="See Database" readonly></input>
                    <br></br>

                    <label id="emailInput" for="email">Email address</label>
                    <br></br>
                    <input className="input" type="text" name="email" value="See Database" readonly></input>
                    <br></br>

                    <label id="phoneInput" for="phone number">Phone number</label>
                    <br></br>
                    <input className="input" type="tel" name="phone number" id="inputPhone" pattern="[0-9]{5}\s[0-9]{6}" title="Please enter a valid phone number in the format 12345 678987"></input>
                    {/*\s is for the space in the phone number*/}
                    <br></br>
                    <Button className="btn1" variant="light">Save</Button>
                    <br></br>
                    
                    <label id="passwordInput">Password</label>
                    <br></br>
                    <input className="input" type="password"></input>
                    <br></br>
                    <Button className="btn1" variant="light">Save</Button>

                </div>

                <div className="deleteBtn">
                    <Button variant="light" className="deleteAccountBtn">Delete my account</Button>
                </div>
            </div>
        </Container>
    );
}