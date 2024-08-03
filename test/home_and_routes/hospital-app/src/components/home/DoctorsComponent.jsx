// src/components/DoctorsComponent.jsx
import React from 'react';

const doctors = [
  { name: 'Dr. John Doe', specialty: 'Cardiologist', image: 'https://t4.ftcdn.net/jpg/06/01/95/47/360_F_601954739_dJ0VcsEl7js0vq8Ag2hx8giMpo71km3o.jpg' },
  { name: 'Dr. Jane Smith', specialty: 'Neurologist', image: 'https://t4.ftcdn.net/jpg/06/01/95/47/360_F_601954739_dJ0VcsEl7js0vq8Ag2hx8giMpo71km3o.jpg' },
  { name: 'Dr. William Brown', specialty: 'Orthopedic Surgeon', image: 'https://t4.ftcdn.net/jpg/06/01/95/47/360_F_601954739_dJ0VcsEl7js0vq8Ag2hx8giMpo71km3o.jpg' },
  { name: 'Dr. Emily White', specialty: 'Pediatrician', image: 'https://t4.ftcdn.net/jpg/06/01/95/47/360_F_601954739_dJ0VcsEl7js0vq8Ag2hx8giMpo71km3o.jpg' },
  // add more doctors as needed
];

const DoctorsComponent = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {doctors.map((doctor, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <img src={doctor.image} alt={doctor.name} className="w-full h-32 object-cover rounded-t-lg" />
          <div className="p-2 text-center font-bold">{doctor.name}</div>
          <div className="text-center text-gray-600">{doctor.specialty}</div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsComponent;
