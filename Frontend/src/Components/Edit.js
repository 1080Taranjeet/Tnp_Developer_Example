import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav';

const Edit = () => {
    const [example, setExample] = useState({ title: '', data: '' });
    const location = useLocation();
    const navigate = useNavigate();
    const { Data } = location.state || {};
    const id = Data.id;

    useEffect(() => {
        // Fetch the example data by ID when component mounts
        axios.get(`http://localhost:8000/api/examples/${id}`)
            .then(response => {
                setExample(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the example!', error);
            });
    }, [Data.id]);

    const handleChange = (e) => {
        setExample({
            ...example,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send PUT request to update the example
        console.log(example);
        axios.put(`http://localhost:8000/api/examples/${id}`, example)
            .then(response => {
                alert('Example updated successfully!');
                navigate("/Create-post");
            })
            .catch(error => {
                console.error('There was an error updating the example!', error);
            });
    };

    return (
        <div className='container-fuild min-vh-100 bg-dark p-5' >
             <div className="d-flex justify-content-between align-items-center">
                <div className="fs-1 text-light">Edit</div>
                <Nav />
            </div>
            <div className='border border-light col-12'></div>
            <form className='border rounded p-3 mt-3 text-light col-6 mx-auto' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='fs-3' >Post id : {example.id}</div>
                </div>
                <hr/>
                <div className='my-4 col-12' >
                    <label className='form-lable fs-5 col-2'>Title</label>
                    <input
                        type="text"
                        name="title"
                        className='form-control mt-3 '
                        value={example.title}
                        onInput={handleChange}
                        required
                    />
                </div>
                <div className='my-4 col-12'>
                    <label className='fs-5 col-2' >Data</label>
                    <textarea
                        name="data"
                        className='form-control mt-3 '
                        value={example.data}
                        onInput={handleChange}
                        required
                    />
                </div>
                <button type="submit" className='btn btn-success' >Update Post</button>
            </form>
        </div>
    );
};

export default Edit;
