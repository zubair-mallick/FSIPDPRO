import React, { useState } from 'react';

// Gradient Button
const GradientButton = ({ onClick, children }) => (
  <button 
    onClick={onClick}
    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
  >
    {children}
  </button>
);

// Polished Input Box
const InputBox = ({ value, onChange }) => (
  <textarea
  value={value}
  onChange={onChange}
  placeholder="Enter the facility or technology do u require the resources..."
  className="w-full h-22 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
/>
);

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  } else {
    return num;
  }
};

// Card-like format for displaying group information
const GroupCard = ({ groupName, description, link, members }) => (
  <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-md mb-4">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">{groupName}</a>
    </h3>
    <p className="text-gray-300 mb-2">{description}</p>
    <p className="text-gray-400">Members: {formatNumber(members)}</p>
  </div>
);

// Card-like format for displaying material information
const MaterialCard = ({ name, link, details, type }) => (
  <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-md mb-4">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>
    </h3>
    <p className="text-gray-300 mb-2">{details}</p>
    <p className="text-gray-400">Type: {type}</p>
  </div>
);

const ResourceFinder = () => {
  const [exam, setExam] = useState('');
  const [resources, setResources] = useState(null);

  const handleExamChange = (e) => setExam(e.target.value);

  const handleExamSubmit = (e) => {
    e.preventDefault();
    // Dummy data for demonstration purposes
    const mockResources = {
      groups: [
        { groupName: 'Group A', link: 'https://example.com/group-a', description: 'Discussion group for Exam A', members: 1_000_000 },
        { groupName: 'Group B', link: 'https://example.com/group-b', description: 'Support group for Exam B', members: 250_000 },
        { groupName: 'Group C', link: 'https://example.com/group-c', description: 'Study group for Exam C', members: 75_000 }
      ],
      materials: [
        { name: 'Material A', link: 'https://example.com/material-a', details: 'Comprehensive guide for Exam A', type: 'Guide' },
        { name: 'Material B', link: 'https://example.com/material-b', details: 'Practice questions for Exam B', type: 'Practice' },
        { name: 'Material C', link: 'https://example.com/material-c', details: 'Sample papers for Exam C', type: 'Sample Paper' }
      ]
    };
    setResources(mockResources);
  };

  const handleReset = () => {
    setExam('');
    setResources(null);
  };

  return (
    <div className="">
      <div className="">
  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-900 text-transparent bg-clip-text">
    What is the Resource Finder?
  </h2>
  <p className="mb-4 text-gray-200">
    The <span className="font-semibold text-white">Resource Finder</span> is a valuable tool designed to assist you in locating educational resources, discussion groups, and study materials relevant to your exams or interests. 
    By providing comprehensive information about various resources, this tool helps you find the best options to support your learning journey.
  </p>
  <h3 className="text-2xl font-semibold mb-2 text-white">
    Why Use the Resource Finder?
  </h3>
  <p className="mb-4 text-gray-400">
    Whether you’re preparing for an upcoming exam or exploring new study materials, the <span className="font-semibold ">Resource Finder</span> offers tailored information based on your specific needs. 
    It helps you discover <span className="font-semibold ">discussion groups</span>, <span className="font-semibold ">study materials</span>, and other resources that can enhance your learning experience.
  </p>
  <h3 className="text-2xl font-semibold mb-2 text-white">
    How Does It Assist in Finding Resources?
  </h3>
  <p className="text-gray-400">
    The Resource Finder uses a structured approach to present various resources and groups related to your exam or field of interest. 
    It categorizes information into easily accessible cards, making it simpler for you to identify and access the resources you need.
  </p>
</div>

      <div className='p-6 mt-6'>
      <h2 className="text-3xl font-bold text-white mb-4">Resource Finder</h2>
      <form onSubmit={handleExamSubmit} className="">
        <div className="mb-4">

      

          <label className="block  text-gray-400 mb-2 " htmlFor="exam">Enter Exam or Technology</label>
          <InputBox value={exam} onChange={handleExamChange} />
        </div>
        <GradientButton type="submit">Find Resources</GradientButton>
        {resources && (
          <button 
            onClick={handleReset}
            className="ml-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Reset
          </button>
        )}
      </form >
    
     {resources && (
        <div className="grid grid-cols-1 gap-6 rounded-lg border-zinc-500 border-2 mt-10 p-4 ">
          <div className=''>
            <h3 className="text-xl font-bold text-white mb-2">Groups</h3>
            {resources.groups.map((group, index) => (
              <GroupCard 
                key={index} 
                groupName={group.groupName} 
                description={group.description} 
                link={group.link} 
                members={group.members} 
              />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Materials</h3>
            {resources.materials.map((material, index) => (
              <MaterialCard 
                key={index} 
                name={material.name} 
                link={material.link} 
                details={material.details} 
                type={material.type} 
              />
            ))}
          </div>
        </div>
      )}
    
      </div>
    </div>
  );
};

export default ResourceFinder;
