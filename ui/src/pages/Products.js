import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductAsync, selectAllProducts } from '../features/productsSlice'
import ProductComponent from '../components/ProductComponent';

const Products = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllProductAsync());
    })
    const products = useSelector(selectAllProducts);

    return (
        <div>
            <ProductComponent data={products} />
        </div>
    )
}

export default Products
