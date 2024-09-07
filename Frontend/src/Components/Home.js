import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Nav from "../Nav";

export default function Home() {
    const [Examples, setExamples] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExamples = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/examples');
                setExamples(response.data);
                console.log(Examples);
            } catch (error) {
                console.error('Error fetching examples:', error);
            }
        };
        fetchExamples();
    }, [])
    const post = (item) => {
        console.log(item);
        navigate('/Post', { state: { Data: item } });
    }

    return (
        <div className=" container-fuild bg-dark min-vh-100 p-5">
            <div className="d-flex justify-content-between align-items-center">
                <div className="fs-1 text-light">Home</div>
                <Nav />
            </div>
            <div className="border border-light col-12"></div>
            <div className="scroll">
                {
                    Examples != undefined ? (
                        Examples.map((item) => (
                            <div class="card border-3 col-4 mx-auto my-5" >
                                <div class="card-header">
                                    {new Date(item.current_date).toLocaleString()}
                                </div>
                                <div class="card-body bg-black text-white">
                                    <h5 class="card-title">{item.title}</h5>
                                    <hr className="text-white" />
                                    <p class="card-text my-5">{item.data}</p>
                                    <hr className="text-white" />
                                    <div class="btn btn-primary px-5 float-end" onClick={() => post(item)}>Vist</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-light" >No post yet</div>
                    )
                }
            </div>
        </div>
    )
}