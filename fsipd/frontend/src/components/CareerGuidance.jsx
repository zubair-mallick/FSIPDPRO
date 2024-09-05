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
    placeholder="Enter your desired career here..."
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCareerChange = (e) => setCareer(e.target.value);

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    if (!career.trim()) {
      setError('Please enter a desired career.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/career-guidance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frontendinput: career }),
      });
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      setError('Failed to fetch data.');
      console.error('Error fetching career guidance data:', error);
    } finally {
      setLoading(false);
    }
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
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

      {loading && <p className="text-white">Loading...</p>}

      {details && !loading && (
        <div className="grid grid-cols-1 gap-6 mt-10 px-4 border-2 py-4 rounded-lg border-zinc-500">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Relevant Exams</h3>
            {details.relevantExams.map((exam, index) => (
              <InfoCard key={index} name={exam.examTitle} description={exam.description} website="#" />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Scholarships</h3>
            {details.scholarships.map((scholarship, index) => (
              <InfoCard key={index} name={scholarship.scholarshipTitle} description={scholarship.description} website="#" />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Prerequisites</h3>
            {details.prerequisites.map((prerequisite, index) => (
              <InfoCard key={index} name={prerequisite.prerequisiteTitle} description={prerequisite.description} website="#" />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Programs</h3>
            {details.programs.map((program, index) => (
              <InfoCard key={index} name={program.programTitle} description={program.description} website="#" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerGuidance;
