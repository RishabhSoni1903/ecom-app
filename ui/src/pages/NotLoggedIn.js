import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {

    const navigate = useNavigate()

    function handleOnClick(e) {
        e.preventDefault();
        navigate('/login')
    }

    return (
        <div className='container' style={{ marginTop: '6%' }}>
            You are not logged in currently. Please login first. <br />
            <Button variant='outline-primary' className='mt-2' onClick={handleOnClick} >Log In Here</Button>
        </div>
    )
}

export default NotLoggedIn
