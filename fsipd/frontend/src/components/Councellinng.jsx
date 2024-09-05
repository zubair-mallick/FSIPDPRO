import React, { useState } from 'react';
import CareerGuidance from './CareerGuidance';
import ResourceFinder from './ResourceFinder';

const CounselingPage = () => {
  return (
    <div id='counseling' className="p-8 min-h-screen ">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 mb-6">
        Counseling and Resource Guidance
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Welcome to the Counseling section, where we provide comprehensive guidance to help you navigate your career and academic journey. Our tools are designed to support you in making informed decisions and finding the right resources to excel in your chosen path.
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-8 pl-4">
        <li className="mb-4">
          <strong className="text-blue-400">Career Guidance:</strong> 
          <p>Enter your desired career name to receive detailed information about the relevant exams, scholarships, prerequisites, and programs. This tool helps you understand the steps needed to pursue your career goals effectively.</p>
        </li>
        <li>
          <strong className="text-blue-400 mb-2">Resource Finder:</strong> 
          <p>Input an exam or technology to find a curated list of resources, including groups, communities, and old question papers. This tool connects you with valuable resources to aid your preparation and learning journey.</p>
        </li>
      </ul>
      <CareerGuidance />
      <ResourceFinder />
    </div>
  );
};




export default CounselingPage;
