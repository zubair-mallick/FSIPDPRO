// src/components/SpecialtiesComponent.jsx
import React from 'react';

const specialties = [
  { name: 'Cardiology', image: 'cardiology.jpg' },
  { name: 'Neurology', image: 'neurology.jpg' },
  { name: 'Orthopedics', image: 'orthopedics.jpg' },
  { name: 'Pediatrics', image: 'pediatrics.jpg' },
  // add more specialties as needed
];

const SpecialtiesComponent = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {specialties.map((specialty, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-md">
          <img src={specialty.image} alt={specialty.name} className="w-full h-32 object-cover rounded-t-lg" />
          <div className="p-2 text-center font-bold">{specialty.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SpecialtiesComponent;
