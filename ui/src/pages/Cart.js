import React, { useEffect } from 'react'
import { fetchCartAsync } from '../features/cartSlice'
import { useDispatch } from 'react-redux'

const Cart = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCartAsync());
    })

    return (
        <div>
            Cart
        </div>
    )
}

export default Cart