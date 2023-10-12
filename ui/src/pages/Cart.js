import React from 'react'
import { deleteItemInCartAsync, fetchCartAsync, removeItemFromCart, selectCart } from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Cart = () => {

    const dispatch = useDispatch()
    const cart = useSelector(selectCart)

    const handleDelete = (id) => {
        dispatch(deleteItemInCartAsync(id));
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