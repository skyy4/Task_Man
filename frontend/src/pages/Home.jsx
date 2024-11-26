import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import Notifications from '../components/Notification'

const Home = () => {
    return (
        <div className='flex h-screen bg-gray-900'>
            <div className='w-64 border-r border-gray-800'>
                <Sidebar />
            </div>
            <div className='flex-1 overflow-auto'>
                <Outlet />
            </div>
            <Notifications />
        </div>
    )
}

export default Home

