import React from 'react'
import { deleteItemInCartAsync, fetchCartAsync, removeItemFromCart, selectCart, selectSubTotal } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { shippingFee } from '../config/shippingFee'
import { placeOrderAsync } from '../features/ordersSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const cart = useSelector(selectCart);
    const sum = cart.reduce((acc, curr) => acc + curr.total, 0);

    const handleDelete = (id) => {
        dispatch(deleteItemInCartAsync(id));
    }

    const handleCheckout = () => {
        console.log('Checkout called')
        dispatch(placeOrderAsync())
    }

    return (
        <>
            <div style={{ margin: '5%', textAlign: 'left' }}>
                <h4 style={{ fontSize: '28px' }}>Cart</h4>
                {cart.length === 0 ? <div>No items in cart. <Button variant='outline-primary' onClick={() => navigate('/')}>Shop now</Button></div> :
                    <Row className='d-flex justify-content-between'>
                        <Col xs={12} md={12} lg={8} className='p-2'>
                            <Row>
                                {cart.map((item) => {
                                    return <Col key={item.id} xs={12} md={6} lg={4} className='p-2'>
                                        <Card style={{ width: 'min-content', marginTop: '10px' }}>
                                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src={item.item.imageUrl} />
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: '20px', marginBottom: '20px' }}>{item.item.brand} {item.item.name}</Card.Title>
                                                <div className='d-flex justify-content-between'>
                                                    <Card.Text style={{ fontSize: '20px', fontWeight: '500' }} >&#x20B9; {item.item.price}</Card.Text>
                                                    <Card.Text style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '500' }}>Quantity: {item.quantity}</Card.Text>
                                                </div>
                                                <Button className='m-1' id='removeBtn' onClick={() => handleDelete(item.id)} variant="outline-danger">Remove</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                })}
                            </Row>
                        </Col>
                        <Col xs={12} md={12} lg={4} className='p-1'>
                            <Card style={{ padding: '1.25rem 1.25rem 0rem', marginTop: '10px' }}>
                                <h5 style={{ fontWeight: '500', marginBottom: '20px' }}>Order Summary</h5>
                                <div className='d-flex justify-content-between'> <div><p style={{ fontWeight: '500' }}>Sub Total ({cart.length} items):</p></div> <div><p style={{ fontWeight: '500' }}>&#x20B9;{sum}</p></div></div>
                                <div className='d-flex justify-content-between'> <p style={{ fontWeight: '500' }}>Shipping Fee: </p> <p style={{ fontWeight: '500' }}> &#x20B9; {sum > 0 ? shippingFee : 0} </p></div>
                                <Card.Footer style={{ padding: '10px 0px 0px' }}> <div className='d-flex justify-content-between'> <p style={{ fontWeight: '500' }}>Grand Total: </p> <p style={{ fontWeight: '500' }}> &#x20B9;{sum > 0 ? sum + shippingFee : 0}</p> </div> </Card.Footer>
                                <Card.Footer style={{ padding: '20px 0px' }} ><Button variant='outline-primary' onClick={() => handleCheckout()}>Proceed to Checkout</Button></Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                }
            </div>

        </>
    )
}

export default Cart