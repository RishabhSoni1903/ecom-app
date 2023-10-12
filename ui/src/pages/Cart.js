import React, { useEffect } from 'react'
import { deleteItemInCartAsync, fetchCartAsync, selectCart } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Cart = (cartArr) => {

    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    // useEffect(()=>{
    //     dispatch(fetchCartAsync())
    // }, [cart.length])

    const handleDelete = (id) => {
        console.log('delete called with id: ', id)
        console.log(cart)
        dispatch(deleteItemInCartAsync(id));
        // navigate('/cart')
    }

    console.log(cart)
    return (
        <div style={{margin: '5%'}}>
            Cart
            {cart.map((item) => {return <div key={item.id}>{item.id}. {item.item.name} <Button variant='outline-danger' onClick={() => handleDelete(item.id)}>Remove</Button></div>})}
        </div>
    )
}

export default Cart