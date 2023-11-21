import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyNowAsync, deleteProductAsync } from '../features/productsSlice'
import { addToCartAsync } from '../features/cartSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { selectLogIn, selectRole } from '../features/loginSlice';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductComponent = ({ data }) => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLogIn);
    const role = useSelector(selectRole);
    const isAdmin = role === 'admin' ? true : false;

    const handleClick = (id) => {
        navigate(`/product/${id}`)
    }

    const handleBuy = (e, id) => {
        e.stopPropagation();
        console.log(id)
        dispatch(buyNowAsync(id))
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
        dispatch(deleteProductAsync(id))
        console.log("Delete called", id)
    }

    return (
        <div className="d-flex justify-content-around py-2 text-start">
            <Row>
                {data.map((item) => {
                    return <Col key={item.id} xs={12} md={4} lg={3} >
                        <Card onClick={() => { handleClick(item.id) }} className='mx-auto' style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }}>
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

export default ProductComponent
