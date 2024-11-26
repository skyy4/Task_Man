import React, { useEffect, useState, useCallback } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble, FaChartBar } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';
import ProgressChart from '../ProgressChart';

const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [Data, setData] = useState(null);
    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/",
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks",
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
            link: "/completedTasks",
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />,
            link: "/incompletedTasks",
        },
    ];
    
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        history("/signup");
    }
    
    const headers = {
        id: localStorage.getItem("id"),
        authorization: ` Bearer ${localStorage.getItem("token")}`,
    }
    
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:1000/api/v2/get-all-tasks', { headers });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }, [headers]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const activeLinkClass = "bg-gray-800 text-white";
    const inactiveLinkClass = "text-gray-300 hover:text-white hover:bg-gray-800";

    return (
        <div className="bg-gray-900 text-white h-screen w-64 flex flex-col justify-between p-6">
            {Data && (
                <div className="mb-8">
                    <h2 className='text-2xl font-bold mb-2'>{Data.username}</h2>
                    <h4 className='text-gray-400'>{Data.email}</h4>
                    <hr className="border-gray-700 my-4" />
                </div>
            )}
            <div className="flex-grow">
                {data.map((items, i) => (
                    <Link 
                    to={items.link}
                    key={i}
                    className='mb-4 flex items-center text-gray-300 hover:text-white hover:bg-gray-800 p-3 rounded-lg transition-all duration-300'
                    >  
                        <span className='text-xl mr-3'>{items.icon}</span>
                        {items.title}
                    </Link>
                ))}
              
            </div>
            <div className="mt-8">
                {Data && <ProgressChart tasks={Data.tasks} />}
                <button 
                    className='bg-red-500 w-full p-3 rounded-lg hover:bg-red-600 transition-colors duration-300 mt-6' 
                    onClick={logout}
                >
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default Sidebar

