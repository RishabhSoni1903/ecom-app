import React, { useState } from 'react'
import './Signup.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/signupAPI';

const Signup = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userData = { email, username, role, password }

    function handleSubmit(e) {
        e.preventDefault();
        signup(userData);
        navigate('/')
        console.log('form submitted', userData);
    }

    return (
        <div className='container signin' style={{ maxWidth: '450px', borderRadius: '10px', border: '3px solid #e2e3e5' }}>

            <div className="heading mb-4">
                <h5>Sign up</h5>
            </div>

            <Form>
                <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3 text-sm">
                    <Form.Control required type="email" onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3 text-sm">
                    <Form.Control required type="text" onChange={(e) => setUsername(e.target.value)} placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSelect" label="Signup as" className="mb-3">
                    <Form.Select aria-label="Role" onChange={(e) => { setRole(e.target.value) }}>
                        <option value="buyer">Role</option>
                        <option value="buyer">Customer</option>
                        <option value="admin">Seller</option>
                    </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </FloatingLabel>

                <Button variant="primary" onClick={(e) => handleSubmit(e)} type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    )
}

export default Signup