import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import { FaClock, FaBell } from "react-icons/fa";

const TaskForm = ({ onClose, onSubmit, initialTask, darkMode }) => {
    const [task, setTask] = useState(initialTask || {
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        deadline: '',
        reminder: '',
        tags: [],
        subtasks: [],
        notes: '',
        recurrence: 'none'
    });

    useEffect(() => {
        if (initialTask) {
            setTask(initialTask);
        }
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
    };

    const addSubtask = () => {
        setTask(prevTask => ({
            ...prevTask,
            subtasks: [...prevTask.subtasks, { id: Date.now(), title: '', completed: false }]
        }));
    };

    const updateSubtask = (id, title) => {
        setTask(prevTask => ({
            ...prevTask,
            subtasks: prevTask.subtasks.map(subtask => 
                subtask.id === id ? { ...subtask, title } : subtask
            )
        }));
    };

    const removeSubtask = (id) => {
        setTask(prevTask => ({
            ...prevTask,
            subtasks: prevTask.subtasks.filter(subtask => subtask.id !== id)
        }));
    };

    const addTag = (tag) => {
        if (tag && !task.tags.includes(tag)) {
            setTask(prevTask => ({ ...prevTask, tags: [...prevTask.tags, tag] }));
        }
    };

    const removeTag = (tag) => {
        setTask(prevTask => ({
            ...prevTask,
            tags: prevTask.tags.filter(t => t !== tag)
        }));
    };

    return (
        <div className={`fixed inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} bg-opacity-50 overflow-y-auto h-full w-full`}>
            <div className={`relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="mt-3 text-center">
                    <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {initialTask ? 'Edit Task' : 'Create New Task'}
                    </h3>
                    <form className="mt-2 text-left" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="Task Title"
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                            required
                        />
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            placeholder="Task Description"
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        />
                        <select
                            name="category"
                            value={task.category}
                            onChange={handleChange}
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        >
                            <option value="">Select Category</option>
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="study">Study</option>
                        </select>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <div className="mt-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Deadline</label>
                            <div className="relative">
                                <FaClock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="datetime-local"
                                    name="deadline"
                                    value={task.deadline}
                                    onChange={handleChange}
                                    className={`pl-10 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reminder</label>
                            <div className="relative">
                                <FaBell className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                <input
                                    type="datetime-local"
                                    name="reminder"
                                    value={task.reminder}
                                    onChange={handleChange}
                                    className={`pl-10 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subtasks</label>
                            {task.subtasks.map((subtask, index) => (
                                <div key={subtask.id} className="flex items-center mt-1">
                                    <input
                                        type="text"
                                        value={subtask.title}
                                        onChange={(e) => updateSubtask(subtask.id, e.target.value)}
                                        placeholder={`Subtask ${index + 1}`}
                                        className={`p-2 block w-full rounded-m
${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                                    />
                                    <button type="button" onClick={() => removeSubtask(subtask.id)} className="ml-2 text-red-500">
                                        <RxCross2 />
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addSubtask} className={`mt-1 p-1 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}>
                                Add Subtask
                            </button>
                        </div>
                        <div className="mt-2">
                            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tags</label>
                            <div className="flex flex-wrap">
                                {task.tags.map((tag, index) => (
                                    <span key={index} className={`m-1 p-1 ${darkMode ? 'bg-blue-600' : 'bg-blue-100'} rounded`}>
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-red-500">
                                            <RxCross2 />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add a tag"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                                className={`mt-1 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                            />
                        </div>
                        <textarea
                            name="notes"
                            value={task.notes}
                            onChange={handleChange}
                            placeholder="Additional Notes"
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        />
                        <select
                            name="recurrence"
                            value={task.recurrence}
                            onChange={handleChange}
                            className={`mt-2 p-2 block w-full rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}`}
                        >
                            <option value="none">No Recurrence</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <div className="items-center px-4 py-3">
                            <button
                                type="submit"
                                className={`px-4 py-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white text-base font-medium rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
                            >
                                {initialTask ? 'Update Task' : 'Create Task'}
                            </button>
                        </div>
                    </form>
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600">
                    <RxCross2 className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default TaskForm;

