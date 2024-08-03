// src/App.jsx
import React from 'react';
import HeaderComponent from './HeaderComponent';
import SliderComponent from './slidercomponet/SliderComponent';
import SpecialtiesComponent from './SpecialtiesComponent';
import DoctorsComponent from './DoctorsComponent';
import DetailsComponent from './DetailsComponent';
import FooterComponent from './FooterComponent';

const Home = ({theme}) => {
  return (
    <div className="font-sans">
      <HeaderComponent theme={theme} />
      <SliderComponent theme={theme} />
      <div className="bg-gray-100 py-8">
        <SpecialtiesComponent theme={theme} />
      </div>
      <div className="bg-white py-8">
        <DoctorsComponent theme={theme} />
      </div>
      <div className="bg-gray-100 py-8">
        <DetailsComponent theme={theme}  />
      </div>
      <FooterComponent theme={theme}  />
    </div>
  );
};

export default Home;
