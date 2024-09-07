import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import axios from 'axios';

export default function Post() {

    const location = useLocation();
    const navigate = useNavigate();

    const { Data } = location.state || {};

    console.log(Data);

    const Edit = (item) => {
        console.log(item);
        navigate('/Edit', { state: { Data: item } });
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/examples/${id}`);
            alert("post is deleted");
            navigate("/Home");
        } catch (error) {
            console.error('Error deleting example:', error);
        }
    }

    return (
        <div className='container-fuild bg-dark min-vh-100 p-5' >
            <div className="d-flex justify-content-between align-items-center">
                <div className="fs-1 text-light">Vist</div>
                <Nav />
            </div>
            <div className='border border-light col-12'></div>
            {
                Data !== undefined ? (
                    <div className='border rounded p-3 text-light col-6 mx-auto mt-3 bg-black'>
                        <div className='fs-3'>{Data.title}</div>
                        <hr />
                        <div>{Data.data}</div>
                        <div className='border my-3 p-2 text-center rounded-pill'>{new Date(Data.current_date).toLocaleString()}</div>
                        <hr />
                        <div className='row d-flex align-items-center justify-content-evenly' >
                            <div className='btn col-5 border rounded text-light' onClick={() => handleDelete(Data.id)} >Delete</div>
                            <div className='btn col-5 border rounded text-light' onClick={() => Edit(Data)} >Edit</div>
                        </div>
                    </div>
                ) : (
                    <div>Something went wrong</div>
                )
            }
        </div>
    )
}