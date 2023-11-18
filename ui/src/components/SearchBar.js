import React from 'react'
import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import "./SearchBar.css"

const SearchBar = () => {

    const handleSearch = (e) => {
        e.preventDefault()
        console.log('Search called')
    }

    return (
        <Card>
            <div className='mx-auto ' style={{ marginTop: '5rem', width: '50%' }}>
                <Form onSubmit={handleSearch}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            id="search-bar"
                            className='border rounded border-secondary'
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant='outline-secondary' type='submit'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </Card>
    )
}

export default SearchBar