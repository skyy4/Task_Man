import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from './store/auth';

import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id) {
      dispatch(authActions.login());
    } else if (!isLoggedIn && window.location.pathname === "/") {
      navigate("/login");
    }
  }, [dispatch, isLoggedIn, navigate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />}>
          <Route index element={<AllTasks />} />
          <Route path="importantTasks" element={<ImportantTasks />} />
          <Route path="completedTasks" element={<CompletedTasks />} />
          <Route path="incompletedTasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;

