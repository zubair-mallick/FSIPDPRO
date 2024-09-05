import { useState, useEffect } from "react";
import TreeDiagram from "./TreeDiagram";

const EducationalRoadmapMaker = () => {
  const [input, setInput] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previousPrompts, setPreviousPrompts] = useState([]);

  useEffect(() => {
    // Load previous prompts and corresponding roadmap data from local storage on component mount
    const storedPrompts = JSON.parse(localStorage.getItem('prompts')) || [];
    setPreviousPrompts(storedPrompts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the prompt already exists in previousPrompts
    const existingPrompt = previousPrompts.find((item) => item.prompt === input);
    
    if (existingPrompt) {
      // If the prompt is found, use the stored roadmap data
      setRoadmapData(existingPrompt.roadmap);
    } else {
      // Start loading
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/tree-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ frontendinput: input }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRoadmapData(data); // Update state with the data received from the backend

        // Update previous prompts with the new prompt and roadmap data
        const updatedPrompts = [{ prompt: input, roadmap: data }, ...previousPrompts.slice(0, 9)]; // Keep only the last 10 prompts
        setPreviousPrompts(updatedPrompts);
        localStorage.setItem('prompts', JSON.stringify(updatedPrompts));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Stop loading
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setInput('');
    setRoadmapData(null);
  };

  return (
    <div className="">
      <div className=" mb-6">
        <div className="">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-900 text-transparent bg-clip-text">
            What is the AI Roadmap Generator?
          </h2>
          <p className="mb-4 text-white">
            The <span className="font-semibold text-white">AI Roadmap Generator</span> is a powerful tool designed to help you navigate your educational and career journey with ease. 
            By providing a clear, step-by-step roadmap, this tool simplifies complex topics and breaks down hard-to-understand concepts into manageable steps.
          </p>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            Why Use the AI Roadmap Generator?
          </h3>
          <p className="mb-4 text-zinc-400">
            Whether you’re just starting out or looking to advance your skills, the <span className="font-semibold ">AI Roadmap Generator</span> can provide tailored guidance based on your current knowledge and goals. 
            It helps you identify the <span className="font-semibold ">skills</span> you need to develop and the <span className="font-semibold ">resources</span> available to achieve your objectives.
          </p>
          <h3 className="text-2xl font-semibold mb-2 text-white">
            How Does It Simplify Complexity?
          </h3>
          <p className="text-zinc-400">
            The generator leverages <span className="font-semibold e">AI</span> to analyze your inputs and create a personalized roadmap. 
            It breaks down complex subjects into digestible parts, making it easier for you to follow and understand the steps required to reach your goals.
          </p>
        </div>
      </div>

      <div className='p-6'>
        <h1 className="text-3xl font-bold text-white mb-6">Roadmap Maker AI</h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter what sort of roadmap do you require. It can be of any type and can be very personalized or broad (career, technology, step-by-step process, tech stack, etc.)"
            className="w-full h-22 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
          />
          <div className="flex space-x-4 mt-4">
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <span className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                  <span>Loading...</span>
                </div>
              ) : (
                "Generate Roadmap"
              )}
            </button>
            {roadmapData && (
              <button 
                type="button"
                onClick={handleReset}
                className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {loading && <p className="text-white">Please wait while we generate your roadmap...</p>}
        {roadmapData && <TreeDiagram data={roadmapData} />}
      </div>
    </div>
  );
};

export default EducationalRoadmapMaker;
