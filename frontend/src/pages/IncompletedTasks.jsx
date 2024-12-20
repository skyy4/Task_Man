import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const IncompletedTasks = () => {
    const [Data, setData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: ` Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('http://localhost:1000/api/v2/get-incomp-tasks', { headers });
            setData(response.data.data);
        }
        fetch();
    });
    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Incompleted Tasks</h1>
            <Cards home={'false'} data={Data} />
        </div>
    )
}

export default IncompletedTasks

