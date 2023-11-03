import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllProduct, fetchAllProductAsync, selectAllProducts } from './productsSlice'
import { addToCartAsync } from './cartSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { selectLogIn, selectRole } from './loginSlice';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Products = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const loggedIn = useSelector(selectLogIn);
    // console.log(products)
    const role = useSelector(selectRole);
    const isAdmin = role === 'admin' ? true : false;

    useEffect(() => {
        dispatch(fetchAllProductAsync());
        dispatch(addAllProduct())
    })

    const handleClick = (id) => {
        // console.log('handle click called', id)
        navigate(`product/${id}`)
    }

    const handleBuy = (e, id) => {
        e.stopPropagation();
        console.log(id)
    }

    const handleAddToCart = (e, id) => {
        e.stopPropagation();
        console.log("Add to cart called", id)
        if (loggedIn) {
            const body = { id: id, quantity: 1 }
            dispatch(addToCartAsync(body))
        } else {
            navigate('/notLoggedIn');
        }
    }

    const handleDelete = (e, id) => {
        e.stopPropagation();
        console.log("Delete called", id)
    }

    return (
        <div style={{ margin: '5%', textAlign: 'left' }}>
            <Row className='d-flex'>
                {products.map((item) => {
                    return <Col key={item.id} xs={12} md={6} lg={3} >
                        <Card onClick={() => { handleClick(item.id) }} style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }}>
                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src={item.imageUrl} />
                            <Card.Body>
                                <Card.Title style={{ fontSize: '18px' }}>{item.brand} {item.name}</Card.Title>
                                <Card.Text style={{ fontSize: '18px', fontWeight: '500' }}>&#x20B9;{item.price}</Card.Text>
                                <Button className='m-1' id='buyNowBtn' onClick={(e) => { handleBuy(e, item.id) }} variant="outline-primary">Buy now</Button>
                                <Button className='m-1' id='addToCartBtn' onClick={(e) => { handleAddToCart(e, item.id) }} variant="outline-primary">Add to Cart</Button>
                                {isAdmin && <Button className='m-1' id='deleteBtn' onClick={(e) => { handleDelete(e, item.id) }} variant="outline-danger">Delete</Button>}
                            </Card.Body>
                        </Card>
                    </Col>
                })}
            </Row>
        </div>
    )
}

export default Products
