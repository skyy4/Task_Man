import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: ` Bearer ${localStorage.getItem("token")}`,
    }

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-comp-task/${id}`, {}, { headers });
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleImportant = async (id) => {
        try {
            await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {}, { headers });
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (id, title, desc, deadline, reminder) => {
        setInputDiv('fixed');
        setUpdatedData({ id, title, desc, deadline, reminder });
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
        }
        catch (error) {
            console.log(error);
        }
    }

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return date.toLocaleString();
    }

    const isDeadlineNear = (deadline) => {
        if (!deadline) return false;
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - now.getTime();
        const diffHours = Math.ceil(diffTime / (1000 * 3600));
        return diffHours <= 24 && diffHours > 0;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {data && data.map((items, i) => (
                <div key={i} className='flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105'>
                    <div>
                        <h3 className='text-2xl font-bold mb-3 text-white'>{items.title}</h3>
                        <p className='text-gray-300 mb-4'>{items.desc}</p>
                        {items.deadline && (
                            <p className={`text-sm mb-2 ${isDeadlineNear(items.deadline) ? 'text-red-400' : 'text-gray-400'} flex items-center`}>
                                <FaClock className="inline mr-2" />
                                Deadline: {formatDateTime(items.deadline)}
                            </p>
                        )}
                        {items.reminder && (
                            <p className="text-sm text-blue-400 flex items-center">
                                <FaBell className="inline mr-2" />
                                Reminder: {formatDateTime(items.reminder)}
                            </p>
                        )}
                    </div>
                    <div className='mt-6 w-full flex items-center justify-between'>
                        <button 
                            className={`${items.complete ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"} py-2 px-4 rounded-full text-white font-semibold transition-colors duration-300`} 
                            onClick={() => handleCompleteTask(items._id)}
                        >
                            {items.complete ? "Completed" : "Incomplete"}
                        </button>
                        <div className='text-white text-xl flex space-x-4'>
                            <button onClick={() => handleImportant(items._id)} className="hover:text-red-400 transition-colors duration-300">
                                {items.important ? (<FaHeart className="text-red-500" />) : (<CiHeart />)}
                            </button>
                            {home === 'true' && (
                                <button onClick={() => handleEdit(items._id, items.title, items.desc, items.deadline, items.reminder)} className="hover:text-blue-400 transition-colors duration-300">
                                    <FaEdit />
                                </button>
                            )}
                            <button onClick={() => deleteTask(items._id)} className="hover:text-red-400 transition-colors duration-300">
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === 'true' && (
                <button 
                    className='flex flex-col justify-center items-center bg-gray-800 rounded-lg p-6 text-gray-300 hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl' 
                    onClick={() => setInputDiv('fixed')}
                >
                    <IoAddCircleSharp className='text-6xl mb-4 text-blue-400' />
                    <h2 className='text-2xl font-semibold'>Add Task</h2>
                </button>
            )}
        </div>
    )
}

export default Cards
