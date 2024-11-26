import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Statistics = ({ tasks, darkMode }) => {
    const stats = useMemo(() => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const incompleteTasks = totalTasks - completedTasks;

        const categoryCounts = tasks.reduce((acc, task) => {
            acc[task.category] = (acc[task.category] || 0) + 1;
            return acc;
        }, {});

        const priorityCounts = tasks.reduce((acc, task) => {
            acc[task.priority] = (acc[task.priority] || 0) + 1;
            return acc;
        }, {});

        return {
            taskCompletion: [
                { name: 'Completed', value: completedTasks },
                { name: 'Incomplete', value: incompleteTasks },
            ],
            categoryDistribution: Object.entries(categoryCounts).map(([name, value]) => ({ name, value })),
            priorityDistribution: Object.entries(priorityCounts).map(([name, value]) => ({ name, value })),
        };
    }, [tasks]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h1 className="text-2xl font-bold mb-6">Task Statistics</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={stats.taskCompletion}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {stats.taskCompletion.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.categoryDistribution}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h2 className="text-xl font-semibold mb-4">Priority Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.priorityDistribution}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Statistics;

