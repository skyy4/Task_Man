import React from 'react';
import { FaSearch } from 'react-icons/fa';

const TaskSearch = ({ 
    searchTerm, 
    setSearchTerm, 
    filterCategory, 
    setFilterCategory, 
    filterPriority, 
    setFilterPriority,
    sortBy,
    setSortBy,
    darkMode 
}) => {
    return (
        <div className={`mb-6 p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
            <div className="flex flex-wrap -mx-2">
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4 mb-4">
                    <div className="relative">
                        <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search tasks..."
                            className={`pl-10 p-2 w-full rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                </div>
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4 mb-4">
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className={`p-2 w-full rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        <option value="">All Categories</option>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="study">Study</option>
                    </select>
                </div>
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4 mb-4">
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className={`p-2 w-full rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        <option value="">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div className="px-2 w-full sm:w-1/2 lg:w-1/4 mb-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className={`p-2 w-full rounded-md ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        <option value="deadline">Sort by Deadline</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TaskSearch;

