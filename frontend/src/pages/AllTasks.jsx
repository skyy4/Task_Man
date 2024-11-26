import React, { useState } from 'react'
import { IoAddCircleSharp } from "react-icons/io5";
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskSearch from '../components/TaskSearch';

const AllTasks = ({ tasks, addTask, updateTask, deleteTask, darkMode }) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [sortBy, setSortBy] = useState('deadline');

    const filteredTasks = tasks
        .filter(task => 
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(task => !filterCategory || task.category === filterCategory)
        .filter(task => !filterPriority || task.priority === filterPriority)
        .sort((a, b) => {
            if (sortBy === 'deadline') {
                return new Date(a.deadline) - new Date(b.deadline);
            } else if (sortBy === 'priority') {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return 0;
        });

    const handleEditTask = (task) => {
        setEditingTask(task);
        setShowTaskForm(true);
    };

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>All Tasks</h1>
                <button 
                    onClick={() => setShowTaskForm(true)}
                    className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-full p-2 transition-colors duration-300`}
                    aria-label="Add new task"
                >
                    <IoAddCircleSharp className='text-3xl' />
                </button>
            </div>
            <TaskSearch 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                sortBy={sortBy}
                setSortBy={setSortBy}
                darkMode={darkMode}
            />
            <TaskList 
                tasks={filteredTasks} 
                onEditTask={handleEditTask} 
                onDeleteTask={deleteTask}
                darkMode={darkMode}
            />
            {showTaskForm && (
                <TaskForm
                    onClose={() => {
                        setShowTaskForm(false);
                        setEditingTask(null);
                    }}
                    onSubmit={(task) => {
                        if (editingTask) {
                            updateTask(task);
                        } else {
                            addTask(task);
                        }
                        setShowTaskForm(false);
                        setEditingTask(null);
                    }}
                    initialTask={editingTask}
                    darkMode={darkMode}
                />
            )}
        </div>
    )
}

export default AllTasks

