import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CategorySlider = () => {

    const navigate = useNavigate();

    return (
        <>
            <h4>Shop By Category</h4>
            <div className="d-flex justify-content-around py-2">
                <Row className="d-flex justify-content-center" style={{ width: '95%' }}>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: '18rem' }} onClick={() => navigate('/categories/Electronics')}>
                            <Card.Img variant="top" src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1697625446/rryaoiziwmgikcxbx2ag.png" />
                            <Card.Body>
                                <Card.Subtitle>Electronics</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: '18rem' }} onClick={() => navigate('/categories/Clothing')}>
                            <Card.Img variant="top" src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1697625446/rryaoiziwmgikcxbx2ag.png" />
                            <Card.Body>
                                <Card.Subtitle>Clothing</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: '18rem' }} onClick={() => navigate('/categories/Groceries')}>
                            <Card.Img variant="top" src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1697625446/rryaoiziwmgikcxbx2ag.png" />
                            <Card.Body>
                                <Card.Subtitle>Groceries</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: '18rem' }} onClick={() => navigate('/categories/Skincare')}>
                            <Card.Img variant="top" src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1697625446/rryaoiziwmgikcxbx2ag.png" />
                            <Card.Body>
                                <Card.Subtitle>Skincare</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CategorySlider
