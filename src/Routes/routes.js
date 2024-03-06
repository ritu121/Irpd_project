
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedAdmin from './ProtectedAdmin';

import SignUp from '../Components/Auth/SignUp';
import Login from '../Components/Auth/Login';
import Dashboard from '../Components/Pages/Dashboard';
import Profile from '../Components/Pages/Profile';
import Candidates from '../Components/Pages/Candidates';
import NewRequest from '../Components/Pages/NewRequest';
import AccessDeniedPage from '../Components/Pages/AccessDeniedPage';
import Register_employee from '../Components/Pages/Register_employee';

function routes() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signUp" element={<SignUp />} />
            <Route exact path="/dashboard" element={<ProtectedAdmin><Dashboard/></ProtectedAdmin>} />
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/candidates" element={<Candidates/>} />
            <Route exact path="/newRequest" element={<NewRequest/>} />
            <Route exact path="/accessDenied" element={<AccessDeniedPage/>} />
            <Route exact path="/register_employee" element={<Register_employee/>}/>
        </Routes>
    )
}

export default routes




