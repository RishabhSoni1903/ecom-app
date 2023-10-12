import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllProduct, fetchAllProductAsync, selectAllProducts } from './productsSlice'
import { addToCartAsync } from './cartSlice';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { selectRole } from './loginSlice';
import { Col, Row } from 'react-bootstrap';

const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    // console.log(products)
    const role = useSelector(selectRole);
    const isAdmin = role==='admin' ? true : false; 

    useEffect(() => {
        dispatch(fetchAllProductAsync());
        dispatch(addAllProduct())
    })

    const handleAddToCart = (id) => {
        console.log("Add to cart called", id)
        const body = { id: id, quantity: 1 }
        dispatch(addToCartAsync(body))
    }

    const handleDelete = (id) => {
        console.log("Delete called", id)
    }

    return (
        <div style={{ margin: '5%' }}>
            <Row>
            {products.map((item) => {
                return <Col key={item.id} md={3} className='m-1'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Brand: {item.brand}</Card.Text>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Price: {item.price} INR</Card.Text>
                        <Button className='m-1' variant="outline-primary">Buy now</Button>
                        <Button className='m-1' onClick={(e) => {e.stopPropagation() ;handleAddToCart(item.id)}} variant="outline-primary">Add to Cart</Button>
                        {isAdmin && <Button className='m-1' onClick={() => {handleDelete(item.id)}} variant="outline-danger">Delete</Button>}
                    </Card.Body>
                </Card>
                </Col>
            })}
            </Row>
        </div>
    )
}

export default Products
