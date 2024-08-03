import React, { useState } from "react";
import SignInSignUp from "../components/SigninSignUp/SignInSignUp";

import Home from '../components/home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
        
     return(
      <div>
        <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home/>} />
            <Route path="/signin" element={<SignInSignUp  />} />
            <Route path="/signup" element={<SignInSignUp  />} />
        </Routes>
      </div>
    </Router>
   
        </div>

        
     )
}

export default App;