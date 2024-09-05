import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Function to simulate word-by-word animation
const useWordAnimation = (text, delay) => {
  const [displayedText, setDisplayedText] = useState('');
  React.useEffect(() => {
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
    placeholder="Enter your interests and current knowledge or constraints here..."
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
const SuggestionBox = ({ careerTitle, description, whyRecommended }) => (
  <div className="bg-gray-900 p-4 border border-gray-700 rounded-lg shadow-md mb-4">
    <h3 className="text-xl font-semibold text-blue-400">{careerTitle}</h3>
    <p className="text-gray-300 mb-2">{description}</p>
    <p className="text-gray-400 italic">{whyRecommended}</p>
  </div>
);

// Spinner
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

// Main Component
const CareerSuggestionerAI = () => {
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (interests.trim() === '') {
      setError('Please enter your interests.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/career-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ frontendinput: interests }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSuggestions(data.careerRecommendations);
    } catch (error) {
      console.error('Error fetching career recommendations:', error);
      setError('Failed to fetch career recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInterests('');
    setSuggestions([]);
    setLoading(false);
    setError('');
  };

  return (
    <div className='p-6'>
      <h1 className="text-3xl font-bold text-white mb-6">Career Suggestioner AI</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <PromptBox value={interests} onChange={(e) => setInterests(e.target.value)} />
        {error && <p className="text-red-500 mb-4">{error}</p>}
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

      {loading && <Spinner />}

      {!loading && suggestions.length > 0 && (
        <div className="mt-10 px-4 border-2 py-4 rounded-lg border-zinc-500">
          {suggestions.map((suggestion, index) => (
            <SuggestionBox
              key={index}
              careerTitle={suggestion.careerTitle}
              description={suggestion.description}
              whyRecommended={suggestion.whyRecommended}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerSuggestionerAI;
