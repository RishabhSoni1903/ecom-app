import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavItem, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, selectLogIn, selectRole } from '../features/loginSlice';
import { categories } from '../config/categories'
import { selectCart } from '../features/cartSlice';

function Appbar() {

    const cart = useSelector(selectCart)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loggedIn = useSelector(selectLogIn)
    const role = useSelector(selectRole)

    const isAdmin = role === 'admin' ? true : false

    function handleLogout() {
        dispatch(logOut());
        sessionStorage.removeItem('jwtToken');
        console.log('logout called')
    }

    function handleSignup() {
        navigate('/signup')
    }

    function handleLogin() {
        navigate('/login')
    }

    return (
        <Navbar expand="lg" fixed="top" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {categories.map((item) => { return <NavDropdown.Item key={item} >{item}</NavDropdown.Item> })}
                        </NavDropdown>
                        {loggedIn && <Nav.Link onClick={() => navigate("/cart")}>Cart <Badge style={{color: 'black'}} bg="light" >{cart.length}</Badge> </Nav.Link>}
                        {loggedIn && <Nav.Link onClick={() => navigate("/orders")}>My Orders</Nav.Link>}
                        {loggedIn && isAdmin && <Nav.Link onClick={() => navigate("/addProduct")}>Add Product</Nav.Link>}
                    </Nav>
                    <Nav className='pullRight'>
                        <NavItem className='text-white'>
                            {!loggedIn && <Button className='m-2' variant="outline-light" onClick={() => handleLogin()}>Login</Button>}
                            {!loggedIn && <Button className='m-2' variant="outline-light" onClick={() => handleSignup()}>Sign up</Button>}
                            {loggedIn && <Button className='m-2' variant="outline-light" onClick={() => handleLogout()}>Logout</Button>}
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Appbar;
