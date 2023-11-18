import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAsync, placeOrderAsync, selectOrders } from '../features/ordersSlice';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const orders = useSelector(selectOrders);

    const handleGetOrder = () => {
        dispatch(fetchOrdersAsync())
    }

    const handlePlaceOrder = () => {
        dispatch(placeOrderAsync())
    }

    // const str = "2023-11-02T14:00:40.426Z"

    const dateFormatter = (str) => {
        const newStr = new Date(str)
        const date = newStr.getDate()
        const month = newStr.getMonth() + 1
        const year = newStr.getFullYear()
        const fullDate = date + '/' + month + '/' + year
        return fullDate
    }

    // dateFormatter(str);

    return (
        <div style={{ margin: '5%', textAlign: 'left' }}>
            <h4 style={{ fontSize: '28px' }}>My Orders</h4>
            {orders.length === 0 ? <div> Currently you have no orders. <Button variant='outline-primary' onClick={() => navigate('/')}>Shop now</Button></div> :
                <div className='pt-4'>
                    {
                        orders.map((item) => {
                            return <Card style={{ backgroundColor: 'rgb(128 128 128 / 13%)' }} key={item.id} className='p-2 mb-3'>
                                <div className='d-flex px-3 pt-3'>
                                    <Card.Title>Subtotal: &#x20B9;{item.subTotal}</Card.Title>
                                    <Card.Title className='mx-4'>Placed on: {dateFormatter(item.createdAt)}</Card.Title>
                                </div>
                                <div >
                                    <Card.Body>
                                        <Card.Subtitle className='pb-2'>Items Bought:</Card.Subtitle>
                                        <Row>
                                            {item.items.map((i) => {
                                                return <Col xs={12} md={4} lg={2} key={i.id} className='p-2'>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Text className='mb-2' style={{ fontSize: '18px', fontWeight: '500' }}>{i.item.brand} {i.item.name}</Card.Text>
                                                            <div className='d-flex '>
                                                                <Card.Text className='mb-2' style={{ fontSize: '18px' }} >Price: {i.item.price}</Card.Text>
                                                                <Card.Text className='mx-3' style={{ fontSize: '18px' }} >Quantity: {i.quantity}</Card.Text>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            }
                                            )}
                                        </Row>
                                    </Card.Body>
                                </div>

                            </Card>
                        })
                    }
                </div>
            }
        </div>

    )
}

export default Orders;