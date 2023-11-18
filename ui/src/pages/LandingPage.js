import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../features/productsSlice'
import ProductComponent from '../components/ProductComponent'
import CategorySlider from '../components/CategorySlider'
import ShopFor from '../components/ShopFor'

const LandingPage = () => {
    const products = useSelector(selectAllProducts);
    console.log(products)
    const data = products?.slice(0, 4);
    console.log(data)
    return (
        <div>
            <div>
                <Image src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1699686911/Banner_lnyelx.jpg" alt="banner" style={{ width: "100%" }} />
            </div>
            <div style={{ marginTop: '3%' }}>
                <ProductComponent data={data} />
            </div>
            <div style={{ marginTop: '3%' }}>
                <CategorySlider />
            </div>
            <div style={{ marginTop: '3%', marginBottom: '3%' }}>
                <ShopFor />
            </div>
        </div>
    )
}

export default LandingPage