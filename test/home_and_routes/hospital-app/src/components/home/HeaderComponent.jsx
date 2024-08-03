// src/components/HeaderComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import lightModeImg from '../../assets/logo/lightmodeimg.png'
import darkModeImg from '../../assets/logo/darkmodeimg.png'
const HeaderComponent = ({theme}) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold text-red-600">Hospital Name</div>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-red-600">Home</Link>
          <Link to="/appointment" className="text-gray-600 hover:text-red-600">Book an Appointment</Link>
          <Link to="/reports" className="text-gray-600 hover:text-red-600">Lab Reports</Link>
          <Link to="/about" className="text-gray-600 hover:text-red-600">About Us</Link>
          <Link to="/signin" className="text-gray-600 hover:text-red-600">Register/Sign In</Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
