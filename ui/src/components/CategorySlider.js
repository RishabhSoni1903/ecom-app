import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CategorySlider = () => {

    const navigate = useNavigate();

    return (
        <>
            <h4 className='fw-bold'>Shop By Category</h4>
            <div className="d-flex justify-content-around py-2">
                <Row className="d-flex justify-content-center" style={{ width: '95%' }}>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }} onClick={() => navigate('/categories/Electronics')}>
                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1700466682/mohammadreza-alidoost-0rUp9vgyEYo-unsplash_pqa30k.jpg" />
                            <Card.Body>
                                <Card.Subtitle>Electronics</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }} onClick={() => navigate('/categories/Clothing')}>
                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1700466678/heather-ford-5gkYsrH_ebY-unsplash_zal9ha.jpg" />
                            <Card.Body>
                                <Card.Subtitle>Clothing</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }} onClick={() => navigate('/categories/Groceries')}>
                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1700466679/maria-lin-kim-8RaUEd8zD-U-unsplash_favby8.jpg" />
                            <Card.Body>
                                <Card.Subtitle>Groceries</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card role="button" className='mx-auto' style={{ width: 'min-content', cursor: 'pointer', margin: '10px' }} onClick={() => navigate('/categories/Skincare')}>
                            <Card.Img variant="top" style={{ height: '288px', width: '294px' }} src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1700466643/toa-heftiba-GLl6_-L3fxM-unsplash_lp2bu1.jpg" />
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
