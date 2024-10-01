import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function ThankYou() {

    return (
        <Container className="thankYouPage">
            <div className="header">
                <div className="mb-4">
                    <Link to="/home"><h3 id="titleCart">The Learning App</h3></Link>
                </div>

                <Link to="/account"><Button variant="light" className="accountCart">Account</Button></Link>
            </div>

            <div className="thankYouMessage">
                <h3 className="message">
                    Thank you for your order! <br></br><br></br>

                    You will receive an order confirmation by email shortly.
                    The course will be sent in a separate email. <br></br><br></br>

                    We wish you good luck with your learning!
                </h3>

                <h5 className="contactInfo">
                    <strong>Contact information:</strong><br></br>
                    email@thelearningapp.com / 07829 000000
                </h5>
            </div>
        </Container>
    );
}