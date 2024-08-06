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
  placeholder="Enter your desire career here..."
  className="w-full h-22 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
/>
);

// Card-like format for displaying data
const InfoCard = ({ name, description, website }) => (
  <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-md mb-4">
    <h3 className="text-xl font-semibold text-blue-400">
      <a href={website} target="_blank" rel="noopener noreferrer">{name}</a>
    </h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const CareerGuidance = () => {
  const [career, setCareer] = useState('');
  const [details, setDetails] = useState(null);

  const handleCareerChange = (e) => setCareer(e.target.value);

  const handleCareerSubmit = (e) => {
    e.preventDefault();
    // Dummy data for demonstration purposes
    const mockDetails = {
      exams: [
        { name: 'Exam A', description: 'Description for Exam A', website: 'https://example.com/a' },
        { name: 'Exam B', description: 'Description for Exam B', website: 'https://example.com/b' },
        { name: 'Exam C', description: 'Description for Exam C', website: 'https://example.com/c' }
      ],
      scholarships: [
        { name: 'Scholarship A', description: 'Description for Scholarship A', website: 'https://example.com/scholarship-a' },
        { name: 'Scholarship B', description: 'Description for Scholarship B', website: 'https://example.com/scholarship-b' },
        { name: 'Scholarship C', description: 'Description for Scholarship C', website: 'https://example.com/scholarship-c' }
      ],
      prerequisites: [
        { name: 'Prerequisite A', description: 'Description for Prerequisite A', website: 'https://example.com/prerequisite-a' },
        { name: 'Prerequisite B', description: 'Description for Prerequisite B', website: 'https://example.com/prerequisite-b' },
        { name: 'Prerequisite C', description: 'Description for Prerequisite C', website: 'https://example.com/prerequisite-c' }
      ],
      programs: [
        { name: 'Program A', description: 'Description for Program A', website: 'https://example.com/program-a' },
        { name: 'Program B', description: 'Description for Program B', website: 'https://example.com/program-b' },
        { name: 'Program C', description: 'Description for Program C', website: 'https://example.com/program-c' }
      ]
    };
    setDetails(mockDetails);
  };

  const handleReset = () => {
    setCareer('');
    setDetails(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-4">Career Guidance</h2>
      
   

      <form onSubmit={handleCareerSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="career">Desired Career</label>
          <InputBox value={career} onChange={handleCareerChange} />
        </div>
        <GradientButton type="submit">Get Details</GradientButton>
        {details && (
          <button 
            onClick={handleReset}
            className="ml-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Reset
          </button>
        )}
      </form>
      {details && (
        <div className="grid grid-cols-1 gap-6 mt-10 px-4 border-2 py-4 rounded-lg border-zinc-500">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Relevant Exams</h3>
            {details.exams.map((exam, index) => (
              <InfoCard key={index} name={exam.name} description={exam.description} website={exam.website} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Scholarships</h3>
            {details.scholarships.map((scholarship, index) => (
              <InfoCard key={index} name={scholarship.name} description={scholarship.description} website={scholarship.website} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Prerequisites</h3>
            {details.prerequisites.map((prerequisite, index) => (
              <InfoCard key={index} name={prerequisite.name} description={prerequisite.description} website={prerequisite.website} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Programs</h3>
            {details.programs.map((program, index) => (
              <InfoCard key={index} name={program.name} description={program.description} website={program.website} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
