import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaClock, FaBell } from "react-icons/fa";
import axios from 'axios';

const InputData = ({ inputDiv, setInputDiv, UpdatedData, setUpdatedData, onTaskAdded }) => {
    const [Data, setData] = useState({ title: '', desc: '', deadline: '', reminder: '' });
    
    useEffect(() => {
        setData({ 
            title: UpdatedData.title, 
            desc: UpdatedData.desc, 
            deadline: UpdatedData.deadline ? new Date(UpdatedData.deadline).toISOString().slice(0, 16) : '',
            reminder: UpdatedData.reminder ? new Date(UpdatedData.reminder).toISOString().slice(0, 16) : ''
        });
    }, [UpdatedData]);
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: ` Bearer ${localStorage.getItem("token")}`,
    }
    
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }
    
    const submitData = async () => {
        try {
            if (Data.title === '' || Data.desc === '') {
                alert('Please fill all required fields');
            }
            else {
                const response = await axios.post('http://localhost:1000/api/v2/create-task', Data, { headers: headers });
                console.log(response.data);
                setData({ title: '', desc: '', deadline: '', reminder: '' });
                setInputDiv('hidden');
                onTaskAdded();
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const UpdateTask = async () => {
        if (Data.title === '' || Data.desc === '') {
            alert('Please fill all required fields');
        }
        else {
            await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`, Data, { headers });
            setUpdatedData({ id: '', title: '', desc: '', deadline: '', reminder: '' });
            setData({ title: '', desc: '', deadline: '', reminder: '' });
            setInputDiv('hidden');
            onTaskAdded();
        }
    }

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return date.toLocaleString();
    }

    return (
        <>
            <div className={`${inputDiv} fixed top-0 left-0 bg-gray-900 bg-opacity-50 h-screen w-full`}></div>
            <div className={`${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className="text-2xl font-bold text-white">{UpdatedData.id ? 'Update Task' : 'Create New Task'}</h2>
                        <button 
                            className='text-2xl text-gray-400 hover:text-white transition-colors duration-300' 
                            onClick={() => { 
                                setInputDiv('hidden'); 
                                setData({ title: '', desc: '', deadline: '', reminder: '' }); 
                                setUpdatedData({ id: '', title: '', desc: '', deadline: '', reminder: '' }) 
                            }}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                id="title"
                                name='title'
                                placeholder='Task title'
                                className='px-4 py-3 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                value={Data.title}
                                onChange={change}
                            />
                        </div>
                        <div>
                            <label htmlFor="desc" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                                id="desc"
                                name='desc'
                                rows='4'
                                placeholder='Task description'
                                className='px-4 py-3 rounded-lg w-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
                                value={Data.desc}
                                onChange={change}
                            />
                        </div>
                        <div>
                            <label htmlFor="deadline" className="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                            <div className="relative">
                                <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    name='deadline'
                                    className='pl-10 pr-4 py-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={Data.deadline}
                                    onChange={change}
                                />
                            </div>
                            {Data.deadline && (
                                <p className="mt-1 text-sm text-gray-400">
                                    Deadline set for: {formatDateTime(Data.deadline)}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="reminder" className="block text-sm font-medium text-gray-300 mb-1">Reminder</label>
                            <div className="relative">
                                <FaBell className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="datetime-local"
                                    id="reminder"
                                    name='reminder'
                                    className='pl-10 pr-4 py-3 rounded-lg w-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    value={Data.reminder}
                                    onChange={change}
                                />
                            </div>
                            {Data.reminder && (
                                <p className="mt-1 text-sm text-gray-400">
                                    Reminder set for: {formatDateTime(Data.reminder)}
                                </p>
                            )}
                        </div>
                    </div>
                    {UpdatedData.id === '' ? 
                        <button 
                            className='w-full px-4 py-3 bg-blue-500 rounded-lg text-white text-lg font-semibold hover:bg-blue-600 transition-colors duration-300 mt-6' 
                            onClick={submitData}
                        >
                            Create Task
                        </button> : 
                        <button 
                            className='w-full px-4 py-3 bg-green-500 rounded-lg text-white text-lg font-semibold hover:bg-green-600 transition-colors duration-300 mt-6' 
                            onClick={UpdateTask}
                        >
                            Update Task
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default InputData

