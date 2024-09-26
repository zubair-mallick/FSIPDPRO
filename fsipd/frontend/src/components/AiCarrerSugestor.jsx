import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordation";
// Function to simulate word-by-word animation
const useWordAnimation = (text, delay) => {
  const [displayedText, setDisplayedText] = useState("");
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
export const GradientButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 font-bold text-white transition-transform duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105"
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
    className="w-full p-4 mb-6 text-white transition-all duration-300 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md h-22 focus:outline-none focus:border-blue-500"
  />
);

// Animated Suggestion
const AnimatedSuggestion = ({ text }) => {
  const animatedText = useWordAnimation(text, 50); // Adjust delay as needed
  return (
    <animated.div className="mb-2 text-lg font-medium text-white">
      {animatedText}
    </animated.div>
  );
};

// Styled Suggestion Box
const SuggestionBox = ({ careerTitle, description, whyRecommended }) => (
  <div className="p-4 mb-4 bg-gray-900 border border-gray-700 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold text-blue-400">{careerTitle}</h3>
    <p className="mb-2 text-gray-300">{description}</p>
    <p className="italic text-gray-400">{whyRecommended}</p>
  </div>
);

// Spinner
const Spinner = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

// Main Component
const CareerSuggestionerAI = () => {
  const [interests, setInterests] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (interests.trim() === "") {
      setError("Please enter your interests.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/career-recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frontendinput: interests }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSuggestions(data.careerRecommendations);
    } catch (error) {
      console.error("Error fetching career recommendations:", error);
      setError(
        "Failed to fetch career recommendations. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInterests("");
    setSuggestions([]);
    setLoading(false);
    setError("");
  };

  return (
    <div className="p-6">
      <h1 className="max-w-4xl mb-8 title">AI Career Suggestion </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mb-6 text-left"
      >
        <PromptBox
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="flex">
          <GradientButton type="submit">Get Career Suggestions</GradientButton>
          {suggestions.length > 0 && !loading && (
            <button
              onClick={handleReset}
              className="px-4 py-2 ml-4 font-bold text-white transition-transform duration-300 bg-gray-700 rounded-lg hover:scale-105"
            >
              Reset
            </button>
          )}
        </div>
      </form>

      {loading && <Spinner />}

      {!loading && suggestions.length > 0 && (
        <div className="px-4 py-4 mt-10 border-2 rounded-lg border-zinc-500">
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

      {/* faq */}
      <div className="mt-10">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto text-left"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is the Education Section?</AccordionTrigger>
            <AccordionContent>
              <p className="text-white">
                The{" "}
                <span className="font-semibold text-white">
                  Education Section
                </span>{" "}
                provides comprehensive guidance to help you navigate your
                educational journey. Whether you're seeking to explore career
                paths or refine your academic focus, our tools are designed to
                support you in making informed decisions.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How Does the Career Suggestor Work?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
                The <span className="font-semibold">Career Suggestor</span>{" "}
                helps you discover potential career paths tailored to your
                interests and existing knowledge. Input your details to receive
                personalized career suggestions that align with your
                aspirations.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is the carrer sugestor ai?
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-zinc-400">
              It is a tool to assist you in planning your educational journey. It will help you map out your academic goals and strategies based on your career objectives and interests.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CareerSuggestionerAI;
