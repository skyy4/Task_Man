import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import Notifications from '../components/Notification'
import { FaMoon, FaSun } from 'react-icons/fa'

const Home = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <div className={`w-64 border-r ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                <Sidebar darkMode={darkMode} />
            </div>
            <div className='flex-1 overflow-auto'>
                <div className={`p-4 flex justify-end ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
                <Outlet />
            </div>
            <Notifications darkMode={darkMode} />
        </div>
    )
}

export default Home

