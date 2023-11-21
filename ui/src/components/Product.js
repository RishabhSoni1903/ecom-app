import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { buyNowAsync, fetchProductAsync, selectProduct } from '../features/productsSlice';
import { Button, Card } from 'react-bootstrap';
import { addToCartAsync } from '../features/cartSlice';
import { selectLogIn } from '../features/loginSlice';

function Product() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector(selectLogIn);

    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchProductAsync(id));
    }, [id])

    const product = useSelector(selectProduct);
    console.log(product.category);

    const handleBuy = (e, id) => {
        e.stopPropagation();
        dispatch(buyNowAsync())
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


    return (<div style={{ margin: '5%', textAlign: 'left' }}>

        <Card>
            <div className="d-flex align-items-centre justify-content-centre m-4">
                <Card.Img variant="top" style={{ height: '305px', width: '294px' }} src={product.imageUrl}></Card.Img>
                <div className='mx-4'>
                    <Card.Body>
                        <Card.Title className='mb-4 mx-4' style={{ fontSize: '24px' }}> {product.brand} {product.name}</Card.Title>
                        <Card.Text className='m-4' style={{ fontSize: '20px' }}>{product.description}</Card.Text>
                        <Card.Title className='m-4' style={{ fontSize: '24px' }}>&#x20B9;{product.price}</Card.Title>
                        <Card.Text className='d-flex align-items-center m-4 text-capitalize' style={{ fontSize: '20px' }}>Category: <span className='mx-2 fw-semibold'> {product.category} </span> </Card.Text>
                        <div className='m-4' >
                            <Button variant='outline-primary' onClick={(e) => { handleBuy(e, product.id) }} >Buy Now</Button>
                            <Button variant='outline-primary' className='mx-4' onClick={(e) => { handleAddToCart(e, product.id) }} >Add to Cart</Button>
                        </div>
                    </Card.Body>
                </div>
            </div>
        </Card>
    </div>
    )
}

export default Product