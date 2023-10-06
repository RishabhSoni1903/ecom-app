import './App.css';
import Footer from './components/Footer';
import Appbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoAsync, logIn, selectLogIn } from './features/loginSlice';
import NotLoggedIn from './pages/NotLoggedIn';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const AuthStr = sessionStorage.getItem('jwtToken');
    if (AuthStr && !isLoggedIn) {
      dispatch(logIn());
      dispatch(getUserInfoAsync(AuthStr));
    }
  })

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectLogIn);

  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/cart' element={isLoggedIn ? <Cart /> : <NotLoggedIn />}></Route>
          <Route path='/addProduct' element={isLoggedIn ? <AddProduct /> : <NotLoggedIn />}></Route>
          <Route path='*' element={< NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
