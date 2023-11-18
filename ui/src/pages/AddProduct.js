import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import './AddProduct.css'
import { categories } from '../config/categories'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addProductAsync } from '../features/productsSlice';
import { CloudinaryConfig } from '../config/cloudinaryConfig';
import axios from 'axios';

function AddProduct() {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState();
    const [description, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const formData = { name, brand, category, price, description, imageUrl }

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        handleImgChange(image)
        dispatch(addProductAsync(formData))
        handleReset();
        // console.log(formData);
    };

    const handleImgChange = async (file) => {
        // console.log(file)
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', CloudinaryConfig.uploadPreset)

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloudName}/image/upload`,
                formData
            );
            // console.log(response.data)
            setImageUrl(response.data.secure_url)
        } catch (error) {
            console.log("Error uploading image: ", error)
        }
    }

    const handleReset = (e) => {
        // e.preventDefault();
        setName('')
        setBrand('')
        setCategory('')
        setPrice('')
        setDesc('')
    }

    return (
        <div className='container text-start addProduct' style={{ maxWidth: '50%', borderRadius: '10px', border: '3px solid #e2e3e5' }} >

            <div className="heading mb-4">
                <h5>Add A Product</h5>
            </div>

            <Form id='addProductForm' onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter name" value={name} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control onChange={(e) => setBrand(e.target.value)} required type="text" placeholder="Enter brand" value={brand} />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e) => setDesc(e.target.value)} required style={{ height: '100px' }} as="textarea" placeholder="Write about your product..." value={description} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control onChange={(e) => setPrice(parseFloat(e.target.value))} required placeholder='Enter price' type='text' value={price} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value.toLowerCase())} required>
                            <option>Choose...</option>
                            {categories.map((i) => { return <option value={i} key={i}>{i}</option> })}
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className='mb-3'>
                    <Form.Group as={Col} controlId="formGridImage">
                        <Form.Label>Choose a photo of the product</Form.Label>
                        <Form.Control onChange={(e) => setImage(e.target.files[0])} required type='file' />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group className='col-3' as={Col}>
                        <Button variant="outline-primary" type="submit">
                            Add Product
                        </Button>
                    </Form.Group>
                    <Form.Group className='col-3' as={Col} >
                        <Button variant="outline-primary" onClick={handleReset}>
                            Reset Fields
                        </Button>
                    </Form.Group>
                </Row>
            </Form>
        </div >
    );
}

export default AddProduct;