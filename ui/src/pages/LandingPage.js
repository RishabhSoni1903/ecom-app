import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../features/productsSlice'
import ProductComponent from '../components/ProductComponent'
import CategorySlider from '../components/CategorySlider'

const LandingPage = () => {
    const products = useSelector(selectAllProducts);
    const data = products?.slice(0, 8);
    return (
        <div>
            <div>
                <Image src="https://res.cloudinary.com/dy7w54dh1/image/upload/v1699686911/Banner_lnyelx.jpg" alt="banner" style={{ width: "100%" }} />
            </div>
            <div style={{ marginTop: '3%' }}>
                <h4 className='fw-bold'>Today's Deal</h4>
                <ProductComponent data={data} />
            </div>
            <div style={{ marginTop: '3%', marginBottom: '3%' }}>
                <CategorySlider />
            </div>
        </div>
    )
}

export default LandingPage