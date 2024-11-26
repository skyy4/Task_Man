import React, { useState, useEffect, useCallback } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
    const [inputDiv, setInputDiv] = useState('hidden')
    const [data, setData] = useState(null);
    const [UpdatedData, setUpdatedData] = useState({ id: '', title: '', desc: '' });
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: ` Bearer ${localStorage.getItem("token")}`,
    }

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/v2/get-all-tasks', { headers });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [headers]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleTaskAdded = () => {
        fetchTasks();
    };

    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <div className='w-full flex justify-end px-6 py-4'>
                    <button 
                        onClick={() => setInputDiv('fixed')}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors duration-300"
                        aria-label="Add new task"
                    >
                        <IoAddCircleSharp className='text-3xl' />
                    </button>
                </div>
                {data && <Cards home={'true'} setInputDiv={setInputDiv} data={data.tasks} setUpdatedData={setUpdatedData} />}
            </div>
            <InputData 
                inputDiv={inputDiv} 
                setInputDiv={setInputDiv} 
                UpdatedData={UpdatedData} 
                setUpdatedData={setUpdatedData} 
                onTaskAdded={handleTaskAdded}
            />
        </>
    )
}

export default AllTasks

