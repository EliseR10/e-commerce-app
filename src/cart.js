import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

//To import icons from FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {


    return (
        <Container className="cartPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/account"><Button variant="light" className="account">Account</Button></Link>
            </div>

            <div className="yourCart">
                <h3 id="yourCartTitle">Your Cart</h3>
                <div className="cartResume">
                    <h4>Get the details from database: name, description, amount</h4>
                    <h6>Please note that you can order up to 10 courses per order.</h6>
                    <div className="inputAndBin">
                        <input type="number" min="1" max="10" className="inputCart"></input>
                        <Button variant="light" className="binCart"><FontAwesomeIcon icon={faTrashCan} /></Button>
                    </div>
                </div>

                <div>
                    <h4>Total amount to pay: $amount from database</h4>
                </div>

                <div className="orderNow">
                    <Link to="/thankYou"><Button variant="light" className="orderNowBtn">ORDER NOW!</Button></Link>
                </div>
            </div>
        </Container>
        
    );
}