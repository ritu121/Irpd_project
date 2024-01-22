import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar  from './Components/Layout/Navbar'
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Pages/Dashboard';
import Profile from './Components/Pages/Profile';
import Candidates from './Components/Pages/Candidates';
import NewRequest from './Components/Pages/NewRequest';




function App() {
  return (
    <>
        <Routes>
         <Route exact path="/" element={<Login/>} />
         <Route exact path="/login" element={<Login/>} />
         <Route exact path="/signUp" element={<SignUp/>} />
         <Route exact path="/navbar" element={<Navbar/>} />
         <Route exact path="/dashboard" element={<Dashboard/>} />
         <Route exact path="/profile" element={<Profile/>} />
         <Route exact path="/candidates" element={<Candidates/>} />
         <Route exact path="/newRequest" element={<NewRequest/>} />
        </Routes>
   
    </>
   
   
  )
}

export default App