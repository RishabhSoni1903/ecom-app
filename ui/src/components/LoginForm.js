import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './LoginForm.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAsync } from '../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import { fetchCartAsync } from '../features/cartSlice';

function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const credentials = { username: username, password: password };
    const navigate = useNavigate();

    const dispatch = useDispatch();

    function handleSubmit() {
        dispatch(loginAsync(credentials));
        dispatch(fetchCartAsync());
        navigate('/')
    }

    return (
        <div className='container login' style={{ maxWidth: '450px', borderRadius: '10px', border: '3px solid #e2e3e5' }}>

            <div className="heading mb-4">
                <h5>Login</h5>
            </div>

            <Form>
                <FloatingLabel controlId="floatingInput" label="Username" className="mb-3 text-sm">
                    <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </FloatingLabel>

                <Button variant="primary" onClick={handleSubmit} type="submit">
                    Submit
                </Button>
            </Form>

        </div>
    );
}

export default LoginForm;
