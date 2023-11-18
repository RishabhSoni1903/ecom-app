import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

const ShopFor = () => {
    return (
        <div>
            <div>
                <h4>Shop For</h4>
                <div className="d-flex justify-content-around py-2">
                    <Row style={{ width: '95%', height: 'auto' }}>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Subtitle>Men</Card.Subtitle>
                                </Card.Body>
                                <Card.Img src='https://res.cloudinary.com/dy7w54dh1/image/upload/v1700129288/ivana-cajina-_7LbC5J-jw4-unsplash_lxvz9u.jpg' alt='for men' />
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Subtitle>Women</Card.Subtitle>
                                </Card.Body>
                                <Card.Img src='https://res.cloudinary.com/dy7w54dh1/image/upload/v1700129278/averie-woodard-4nulm-JUYFo-unsplash_d1s0dh.jpg' alt='for women' />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default ShopFor
