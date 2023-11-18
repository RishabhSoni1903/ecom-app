import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, selectMessage, selectShow, } from '../features/toastSlice';

function ToastComponent() {

    const message = useSelector(selectMessage)
    const show = useSelector(selectShow)

    const dispatch = useDispatch()
    return (
        <ToastContainer
            className="p-3"
            position='bottom-center'
            style={{ zIndex: 1, marginBottom: '3%' }}
        >
            <Toast
                onClose={() => dispatch(hideToast())}
                className='d-flex justify-content-between text-white'
                bg='dark'
                show={show}
                delay={3000}
                autohide
            >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;