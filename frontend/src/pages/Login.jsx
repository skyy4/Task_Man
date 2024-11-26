import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authActions } from '../store/auth';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Data, setData] = useState({ username: '', password: '' });
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const handleSubmit = async () => {
        if (Data.username.trim() === '' || Data.password.trim() === '') {
            alert('Please fill all the fields');
            return;
        }
        try {
            const response = await axios.post('http://localhost:1000/api/v1/log-in', Data);
            setData({ username: '', password: '' });
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('token', response.data.token);
            dispatch(authActions.login());
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <svg className="mx-auto h-12 w-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">TASKMAN</h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Your ultimate task management solution
                    </p>
                </div>
                <div className="bg-gray-800 p-8 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-white mb-4">Log in to your account</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Streamline your workflow, boost productivity, and never miss a deadline with TASKMAN. Organize, prioritize, and collaborate on tasks effortlessly.
                    </p>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={Data.username}
                                onChange={change}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={Data.password}
                                onChange={change}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                onClick={handleSubmit}
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
                <div className="text-center">
                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                        Not having an account? Sign up here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
