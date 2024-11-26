import React from 'react';
import { FaEdit, FaTrash, FaClock, FaBell } from 'react-icons/fa';

const TaskList = ({ tasks, onEditTask, onDeleteTask, darkMode }) => {
    return (
        <div className={`mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow overflow-hidden sm:rounded-md`}>
            <ul className="divide-y divide-gray-200">
                {tasks.map((task) => (
                    <li key={task.id}>
                        <div className={`px-4 py-4 sm:px-6 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                            <div className="flex items-center justify-between">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                                    {task.title}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        task.priority === 'high' 
                                            ? 'bg-red-100 text-red-800' 
                                            : task.priority === 'medium'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {task.priority}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                        {task.category}
                                    </p>
                                    <p className={`mt-2 flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} sm:mt-0 sm:ml-6`}>
                                        <FaClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                        {new Date(task.deadline).toLocaleString()}
                                    </p>
                                    {task.reminder && (
                                        <p className={`mt-2 flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'} sm:mt-0 sm:ml-6`}>
                                            <FaBell className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                            {new Date(task.reminder).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-2 flex items-center text-sm sm:mt-0">
                                    <button
                                        onClick={() => onEditTask(task)}
                                        className={`mr-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => onDeleteTask(task.id)}
                                        className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                            {task.tags.length > 0 && (
                                <div className="mt-2">
                                    {task.tags.map((tag, index) => (
                                        <span key={index} className={`inline-block ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

