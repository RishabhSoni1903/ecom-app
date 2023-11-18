import React from 'react'
import ProductComponent from '../components/ProductComponent'
import { selectSearchedProducts } from '../features/productsSlice'
import { useSelector } from 'react-redux'

const Search = () => {

    const products = useSelector(selectSearchedProducts)
    console.log(products)

    return (
        <div>
            <ProductComponent data={products} />
        </div>
    )
}

export default Search
