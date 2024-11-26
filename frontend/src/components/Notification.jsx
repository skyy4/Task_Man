import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const headers = {
                i
: localStorage.getItem("id"),
                authorization: ` Bearer ${localStorage.getItem("token")}`,
            };
            try {
                const response = await axios.get('http://localhost:1000/api/v2/get-all-tasks', { headers });
                const tasks = response.data.data.tasks;
                const now = new Date();
                const upcomingTasks = tasks.filter(task => {
                    if (task.complete) return false;
                    const deadline = new Date(task.deadline);
                    const reminder = new Date(task.reminder);
                    const diffTimeDeadline = deadline.getTime() - now.getTime();
                    const diffHoursDeadline = Math.ceil(diffTimeDeadline / (1000 * 3600));
                    const diffTimeReminder = reminder.getTime() - now.getTime();
                    const diffHoursReminder = Math.ceil(diffTimeReminder / (1000 * 3600));
                    return (diffHoursDeadline <= 24 && diffHoursDeadline > 0) || (diffHoursReminder <= 1 && diffHoursReminder > 0);
                });
                setNotifications(upcomingTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
        const interval = setInterval(fetchTasks, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        return date.toLocaleString();
    }

    if (notifications.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-gray-800 p-6 rounded-lg shadow-2xl max-w-sm z-50">
            <h3 className="text-xl font-bold mb-4 text-white">Upcoming Tasks</h3>
            <ul className="space-y-4">
                {notifications.map(task => (
                    <li key={task._id} className="bg-gray-700 p-4 rounded-lg">
                        <span className="font-medium text-lg text-white mb-2 block">{task.title}</span>
                        {task.deadline && (
                            <p className="text-sm text-red-400 flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Deadline: {formatDateTime(task.deadline)}
                            </p>
                        )}
                        {task.reminder && (
                            <p className="text-sm text-blue-400 flex items-center mt-1">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                Reminder: {formatDateTime(task.reminder)}
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
