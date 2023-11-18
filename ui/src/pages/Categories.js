import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filterByCategoryAsync, selectProductByCategory, setCategory } from '../features/productsSlice';
import ProductComponent from '../components/ProductComponent';

const Categories = () => {

    let { category } = useParams();
    // console.log(category)
    category = category.toLowerCase();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(filterByCategoryAsync(category))
        dispatch(setCategory(category))
        console.log('fetching products of category ' + category)
    }, [])

    const data = useSelector(selectProductByCategory)

    return (
        <div>
            {data.length > 0 ? <ProductComponent data={data} /> : <div style={{ margin: '5%' }} >Coming Soon</div>}
        </div>
    )
}

export default Categories

