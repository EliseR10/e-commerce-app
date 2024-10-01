import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Welcome() {


    return (
        <Container className="welcomePage text-center p-5">
            <div className="mb-4">
                <h3 id="title">Welcome on the <br></br>Learning App</h3>
            </div>
            <Form.Control type="text" id="username" placeholder="Username" className="mt-5 text-center"></Form.Control>

            <Form.Control type="password" id="password" placeholder="Password" className="mt-4 text-center"></Form.Control>

            <div id="registerBtn" className="mt-5"><Link to="/home" id="registerLink">Log in / Register</Link></div>
            
        </Container>
    );
}