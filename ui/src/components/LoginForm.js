import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './LoginForm.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync, selectLogIn } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const credentials = { username: username, password: password };
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectLogIn)
    isLoggedIn && navigate('/')

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginAsync(credentials))
    }

    return (
        <div className='container login' style={{ maxWidth: '450px', borderRadius: '10px', border: '3px solid #e2e3e5' }}>

            <div className="heading mb-4">
                <h5>Login</h5>
            </div>

            <Form onSubmit={handleSubmit} >
                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 text-sm">
                    <Form.Control required type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control required type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </FloatingLabel>

                <Button variant="outline-primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    );
}

export default LoginForm;
