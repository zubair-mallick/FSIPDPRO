import React, { useState } from "react";
import AiCarrerSugestor from "../components/AiCarrerSugestor";
import EducationalRoadmapMaker from "../components/roadmap/EducationalRoadmapMaker";

const Page = () => {
  const [selectedTool, setSelectedTool] = useState("career");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTool(e.target.value);
  };

  return (
    <main className="container mx-auto section">
      {/* Heading and description */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold ">Education Section</h1>
        <p className="mt-4 text-lg text-gray-400">
          The Education section offers two tools to help you navigate and plan your journey: 
          the AI Career Suggestor and the Educational Roadmap Maker.
        </p>

        {/* Dropdown Selector */}
        <div className="mt-6">
          <label htmlFor="toolSelector" className="mr-4 text-lg font-semibold">
            Select a tool:
          </label>
          <select
            id="toolSelector"
            value={selectedTool}
            onChange={handleSelectChange}
            className="p-2  rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-300"
          >
            <option
              value="career"
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              AI Career Suggestor
            </option>
            <option
              value="roadmap"
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              Ai Roadmap Maker
            </option>
          </select>
        </div>
      </header>

      {/* Render selected component based on dropdown value */}
      <div>
        {selectedTool === "career" && <AiCarrerSugestor />}
        {selectedTool === "roadmap" && <EducationalRoadmapMaker />}
      </div>
    </main>
  );
};

export default Page;
