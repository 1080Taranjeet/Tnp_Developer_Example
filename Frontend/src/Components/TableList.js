// src/components/TableList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tables');
                setTables(response.data);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        fetchTables();
    }, []);

    return (
        <div>
            <h1>Tables in Database</h1>
            {tables.length > 0 ? (
                <ul>
                    {tables.map((table, index) => (
                        <li key={index}>{table}</li>
                    ))}
                </ul>
            ) : (
                <p>No tables found.</p>
            )}
        </div>
    );
};

export default TableList;
