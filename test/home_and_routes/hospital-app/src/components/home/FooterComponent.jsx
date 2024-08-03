// src/components/FooterComponent.jsx
import React from 'react';

const FooterComponent = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://facebook.com/zubair" className="hover:text-blue-600">Facebook</a>
          <a href="https://linkedin.com/in/zubair" className="hover:text-blue-300">LinkedIn</a>
          <a href="https://instagram.com/zubair" className="hover:text-pink-500">Instagram</a>
        </div>
        <p>&copy; 2024 Hospital Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
