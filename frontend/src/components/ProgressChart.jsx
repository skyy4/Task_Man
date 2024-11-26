import React from 'react';

const ProgressChart = ({ tasks }) => {
    const completedTasks = tasks ? tasks.filter(task => task.complete).length : 0;
    const totalTasks = tasks ? tasks.length : 0;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Task Progress</h2>
            <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                            Completed
                        </span>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-teal-600">
                            {completionPercentage}%
                        </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                    <div
                        style={{ width: `${completionPercentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 transition-all duration-500 ease-in-out"
                    ></div>
                </div>
            </div>
            <p className="mt-4 text-lg text-white">
                <span className="font-bold text-teal-400">{completedTasks}</span>
                <span className="mx-1">/</span>
                <span className="font-bold">{totalTasks}</span>
                <span className="ml-2">tasks completed</span>
            </p>
        </div>
    );
};

export default ProgressChart;

