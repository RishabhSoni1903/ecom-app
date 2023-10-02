import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function NotFound() {

    const navigate = useNavigate();

    function handleOnClick(e) {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "50%", height: "50%", margin: 0 }} alt='Error 404! Page not found' src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png" />
            <Button onClick={handleOnClick} >Go to HomePage</Button>
        </div >
    )
}

export default NotFound