// src/components/ExampleList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import Nav from '../Nav';

const ExampleList = () => {
    const [examples, setExamples] = useState([]);
    const [title, setTitle] = useState('');
    const [data, setData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExamples = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/examples');
                setExamples(response.data.sort((a, b) => a.id - b.id));
            } catch (error) {
                console.error('Error fetching examples:', error);
            }
        };
        fetchExamples();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/examples', {
                title,
                data,
            });
            setExamples([...examples, response.data]);
            setTitle('');
            setData('');
        } catch (error) {
            console.error('Error adding example:', error);
        }

    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/examples/${id}`);
            setExamples(examples.filter(example => example.id !== id)); // Update the UI
        } catch (error) {
            console.error('Error deleting example:', error);
        }
    };

    const handleEdit = (item) => {
        console.log(item);
        navigate('/Edit', { state: { Data:item } });
    };

    return (
        <div className='bg-dark create-post-main p-5 container-fuild'>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='  text-light fs-1'>Posts</div>
                <div className='  text-center my-auto'>
                    <div className='btn btn-info text-light ' data-bs-toggle="modal" data-bs-target="#exampleModal">Create Posts</div>
                </div>
                <Nav/>
            </div>
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Creat Post</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <lable className="form-label " >Title:</lable>
                                <input
                                    className='form-control mb-3'
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                    required
                                />
                                <lable className="form-label" >Data:</lable>
                                <textarea
                                    className='form-control mb-3'
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    placeholder="Data"
                                    required
                                />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div className='row p-2'>
                                <button type='button' class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 border border-light'></div>
            {examples.length > 0 ? (
                <table className='table table-striped table-hover mt-5'>
                    <thead >
                        <tr className=' border-bottom-3 border-dark '>
                            <td>Id</td>
                            <td>Title</td>
                            <td>Data</td>
                            <td>Date & Time</td>
                            <td>Edit</td>
                            <td>delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {examples.map((example) => (
                            <tr key={example.id}>
                                <td>{example.id}</td>
                                <td>{example.title}</td>
                                <td> {example.data}</td>
                                <td>{new Date(example.current_date).toLocaleString()}</td>
                                <td><button className='btn btn-info' onClick={() => handleEdit(example)}>Edit</button></td>
                                <td><button className='btn btn-danger' onClick={() => handleDelete(example.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No examples found.</p>
            )}

        </div>
    );
};

export default ExampleList;
