import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Function to simulate word-by-word animation
const useWordAnimation = (text, delay) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);
  return displayedText;
};

// Gradient Button
const GradientButton = ({ onClick, children }) => (
  <button 
    onClick={onClick}
    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
  >
    {children}
  </button>
);

// Polished Prompt Box
const PromptBox = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder="Enter your interests and already knowledge or constains here..."
    className="w-full h-22 p-4 mb-6 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
  />
);

// Animated Suggestion
const AnimatedSuggestion = ({ text }) => {
  const animatedText = useWordAnimation(text, 50); // Adjust delay as needed
  return (
    <animated.div className="text-lg font-medium mb-2 text-white">
      {animatedText}
    </animated.div>
  );
};

// Styled Suggestion Box
const SuggestionBox = ({ field, reason }) => (
  <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-md mb-4 ">
    <h3 className="text-xl font-semibold text-blue-400">{field}</h3>
    <p className="text-gray-300">{reason}</p>
  </div>
);

// Main Component

const CareerSuggestionerAI = () => {
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Dummy data for demonstration purposes
    const mockSuggestions = [
      { field: 'Software Engineering', reason: 'High demand and good salary.' },
      { field: 'Data Science', reason: 'Growing field with many opportunities.' },
      { field: 'Graphic Design', reason: 'Creative field with diverse opportunities.' },
      { field: 'Cybersecurity', reason: 'Critical for protecting data in the digital age.' },
      { field: 'Marketing', reason: 'Essential for business growth and customer engagement.' },
      { field: 'Finance', reason: 'Strong earning potential and career stability.' },
      { field: 'Project Management', reason: 'Important for overseeing and delivering successful projects.' },
      { field: 'Teaching', reason: 'Rewarding profession with opportunities to shape future generations.' },
      { field: 'Nursing', reason: 'In-demand profession with a focus on patient care.' },
      { field: 'Engineering Management', reason: 'Combines technical skills with leadership and management.' },
    ];
    setTimeout(() => {
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 2000); // Simulate network delay
  };

  const handleReset = () => {
    setInterests('');
    setSuggestions([]);
    setLoading(false);
  };

  return (
<   div className='p-6'>
    <h1 className="text-3xl font-bold text-white mb-6">Career Suggestioner AI</h1>
        <div className="  ">
      <form onSubmit={handleSubmit} className="mb-6">
        <PromptBox value={interests} onChange={(e) => setInterests(e.target.value)} />
        <GradientButton type="submit">Get Career Suggestions</GradientButton>
        {suggestions.length > 0 && !loading && (
          <button 
            onClick={handleReset}
            className="ml-4 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Reset
          </button>
        )}
      </form>

      {loading && <p className="text-center text-blue-400">Loading...</p>}

      {!loading && suggestions.length > 0 && (
        <div className="mt-10 px-4 border-2 py-4 rounded-lg border-zinc-500">
          {suggestions.map((suggestion, index) => (
            <SuggestionBox key={index} field={suggestion.field} reason={suggestion.reason} />
          ))}
        </div>
      )}
        </div>
    </div>
  );
};

export default CareerSuggestionerAI;
