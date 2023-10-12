import React, { useEffect } from 'react'
import { deleteItemInCartAsync, fetchCartAsync, removeItemFromCart, selectCart } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Cart = (cartArr) => {

    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    // useEffect(()=>{
    //     dispatch(fetchCartAsync())
    // }, [])

    const handleDelete = (id) => {
        console.log(cart)
        dispatch(deleteItemInCartAsync(id));
        // dispatch(removeItemFromCart(id))
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