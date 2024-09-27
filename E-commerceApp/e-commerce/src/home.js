import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button} from 'react-bootstrap';
import {Outlet, Link } from "react-router-dom";

export default function Home() {
    console.log("Home component rendered correctly");

    return (
        <Container className="homePage">
            <div className="header">
                <div className="mb-4">
                    <h3 id="titleHome">The Learning App</h3>
                </div>

                <Button variant="light" className="cart">Cart</Button>
                <Button variant="light" className="account">Account</Button>
            </div>

            <div className="offer">
                {/*Here you might need to link the database with the front-end and use
                the name, description and price*/}
                <div className="Spanish">
                    <div className="SpanishTitle">
                        <h4>Learn Spanish online</h4>
                        <h6>Description from database. <br></br>Description from database.</h6>
                        <h6>Price from database</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light">Add to Cart</Button>
                    </div>
                </div>

                <div className="French">
                    <div className="FrenchTitle">
                        <h4>Learn French online</h4>
                        <h6>Description from database. <br></br>Description from database.</h6>
                        <h6>Price from database</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light">Add to Cart</Button>
                    </div>
                </div>

                <div className="Bulgarian">
                    <div className="BulgarianTitle">
                        <h4>Learn Bulgarian online</h4>
                        <h6>Description from database. <br></br>Description from database.</h6>
                        <h6>Price from database</h6>
                    </div>
                    <div className="CartBtn">
                        <Button variant="light">Add to Cart</Button>
                    </div>
                </div>
            </div>
        </Container>
    );

    
}