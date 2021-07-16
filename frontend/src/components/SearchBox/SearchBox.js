import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {

    const [searchText, setSearchText] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        if (searchText.trim()) {
            history.push(`/search/${ searchText }`);
        } else {
            history.push('/');
        }
    };

    return (
        <Form onSubmit={ submitHandler } inline>
            <Form.Control 
                type='search' 
                name='searchText' 
                onChange={e => setSearchText(e.target.value) } 
                placeholder='Search products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
};

export default SearchBox;
