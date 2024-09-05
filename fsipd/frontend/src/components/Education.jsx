import React from 'react';
import AiCarrerSugestor from './AiCarrerSugestor';
import TreeDiagram from './roadmap/TreeDiagram'
import EducationalRoadmapMaker from './roadmap/EducationalRoadmapMaker';
const Education = () => {
  return (
    <div id='education' className="p-8  min-h-screen">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 mb-6">
        Education and Career Guidance
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Welcome to the Education section, where we provide comprehensive guidance to help you navigate your educational journey. Whether you're seeking to explore career paths or refine your academic focus, our tools are designed to support you in making informed decisions.
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-8 pl-4">
        <li className="mb-4">
          <strong className="text-blue-400">AI Career Suggestor:</strong> 
          <p>Discover potential career paths tailored to your interests and existing knowledge. Input your details to receive personalized career suggestions that align with your aspirations.</p>
        </li>
        <li>
          <strong className="text-blue-400  mb-2">Educational Roadmap Maker  </strong> 
          <p>  A tool to assist you in planning your educational journey. It will help you map out your academic goals and strategies based on your career objectives and interests.</p>
        </li>
      </ul>
      <AiCarrerSugestor />

      <EducationalRoadmapMaker/>
    </div>
  );
};

export default Education;
