import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const [input, setInput] = useState([]);
    //const [register, setRegister] = useState([]);
    //const [isRegistered, setIsRegistered] = useState(false); //track submission success
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target; //extract name and value from the input
        setInput((prevData) => ({
            ...prevData, //Keep the rest of the state unchanged
            [name]: value, //update the specific field
        }));
        console.log('The value is: ', name, value);
    };

    const loginAccount = async (event) => {
        /*Make sure inputs are filled otherwise throw alert*/
        if (!input.customers_username || !input.password) {
            event.preventDefault();
            alert('Please add your username and password first.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    customers_username: input.customers_username,
                    password: input.password
                }),
            })
            
            const data = await response.json();
            
            console.log(data);
            
            if (data.success) {
                //navigate('/home');
                console.log('Logged in successfully.');
            } else {
                console.log('Login failed: ', data.message || 'Unknown error');
                alert(`Login failed: ${data.message || 'Unknown error'}`);  
            }
        } catch(err) {
            console.log('Error login in your account', err);
        }
    }

    const registerAccount = async (event) => {
        /*Make sure inputs are filled otherwise throw alert*/
        if (!input.customers_username || !input.password) {
            event.preventDefault();
            alert('Please add your username and password first.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/account', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    customers_username: input.customers_username,
                    password: input.password
                }),
            })
            
            const data = await response.json();
            console.log('Login response:', data);

            if (data.success) {
                console.log('Registered successfully.');
                navigate('/home');
            } else {
                console.log('Registration failed: ', data.message || 'Unknown error');
                alert(`Registration failed: ${data.message || 'Unknown error'}`);
            }
            
        } catch(err) {
            console.log('Error registering new account', err);
        }
    }

    return (
        <Container className="welcomePage text-center p-5">
            <div className="mb-4">
                <h3 id="title">Welcome on the <br></br>Learning App</h3>
            </div>
            <Form.Control type="text" id="username" placeholder="Username" name="customers_username" className="mt-5 text-center" onChange={handleChange}></Form.Control>

            <Form.Control type="password" id="password" placeholder="Password" name="password" className="mt-4 text-center" onChange={handleChange}></Form.Control>

            <div id="registerBtn" className="mt-5">
                 <h4 id="registerLink" onClick={(event) => loginAccount(event)}>Log in</h4>
                 <h4 id="registerLink" onClick={(event) => registerAccount(event)}>Register</h4>
            </div>
        </Container>
    );
}