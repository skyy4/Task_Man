import React from 'react';
import heroImg from '../assets/hero-img.png';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="hero">
            <div className="hero-text">
                <h1>Task Man</h1>
                <p>
                Welcome to Task Man, your go-to productivity partner! Designed to simplify your life, Task Man is more than just a task manager—it’s your key to staying organized and focused. Whether you’re a busy professional, a student with deadlines, or just seeking a more structured routine, Task Man is built to meet your needs and boost your productivity.
                </p>
            </div>
            <img src={heroImg} alt="Hero desc" />
        </div>
    );
}

export default Home;