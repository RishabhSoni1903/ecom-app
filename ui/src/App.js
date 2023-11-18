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
import { fetchCartAsync } from './features/cartSlice';
import Orders from './pages/Orders';
import Product from './components/Product';
import { fetchOrdersAsync } from './features/ordersSlice';
import Categories from './pages/Categories';
import ToastComponent from './components/ToastComponent';
import SearchBar from './components/SearchBar';
import Products from './pages/Products';
import { fetchAllProductAsync } from './features/productsSlice';
import Search from './pages/Search';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllProductAsync())
    const AuthStr = sessionStorage.getItem('jwtToken');
    if (AuthStr && !isLoggedIn) {
      dispatch(logIn());
      dispatch(getUserInfoAsync(AuthStr));
      dispatch(fetchCartAsync());
      dispatch(fetchOrdersAsync())
    }
  })

  const isLoggedIn = useSelector(selectLogIn);

  return (
    <Router>
      <div className="App">
        <Appbar />
        <SearchBar />
        <ToastComponent />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/product/:id' element={<Product />}></Route>
          <Route path='/categories/:category' element={<Categories />}></Route>
          <Route path='/cart' element={isLoggedIn ? <Cart /> : <NotLoggedIn />}></Route>
          <Route path='/addProduct' element={isLoggedIn ? <AddProduct /> : <NotLoggedIn />}></Route>
          <Route path='/orders' element={isLoggedIn ? <Orders /> : <NotLoggedIn />}></Route>
          <Route path='/notLoggedIn' element={<NotLoggedIn />}></Route>
          <Route path='*' element={< NotFound />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
