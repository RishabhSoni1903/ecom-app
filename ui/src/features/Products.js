import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllProduct, fetchAllProductAsync, selectAllProducts } from './productsSlice'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Products = () => {

    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    // console.log(products)

    useEffect(() => {
        dispatch(fetchAllProductAsync());
        dispatch(addAllProduct())
    })

    return (
        <div style={{ margin: '5%' }}>
            {products.map((item) => {
                return <Card key={item.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>Brand: {item.brand}</Card.Text>
                        <Card.Text>{item.description}</Card.Text>
                        <Card.Text>Price: {item.price} INR</Card.Text>
                        <Button variant="primary">Buy now</Button>
                    </Card.Body>
                </Card>
            })}
        </div>
    )
}

export default Products
