import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './style.css'; // Ensure your CSS is in this file

const TreeDiagram = ({ data }) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ opacity: 0, content: '', left: 0, top: 0 });
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (data) {
      renderTree(data);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target) && event.target.closest('.node') === null) {
        setTooltip(prev => ({
          ...prev,
          opacity: 0
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderTree = (data) => {
    const width = 1200;
    const height = 1000;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(400,0)");

    const treeLayout = d3.tree().size([height, width - 600]);
    const root = d3.hierarchy(data);
    const treeData = treeLayout(root);

    svg.selectAll(".link")
      .data(treeData.links())
      .enter().append("path")
      .attr("class", "link")
      .attr("d", d => `
        M${d.source.y},${d.source.x}
        C${d.source.y + 100},${d.source.x}
         ${d.target.y - 0},${d.target.x}
         ${d.target.y},${d.target.x}`
      );

    const nodes = svg.selectAll(".node")
      .data(treeData.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .on("mouseover", (event, d) => {
        let tooltipHtml = `<strong>${d.data.name}</strong><br/>${d.data.details || ''}`;
        if (d.data.links && d.data.links.length > 0) {
          tooltipHtml += `<br/><br/><strong>Resources:</strong><br/>`;
          d.data.links.forEach(link => {
            tooltipHtml += `<a href="${link}" target="_blank" style="color: YELLOW; text-decoration: underline;">${link}</a><br/>`;
          });
        }
        setTooltip({
          opacity: 1,
          content: tooltipHtml,
          left: event.pageX + 10,
          top: event.pageY - 28
        });
      })
      .on("mouseout", () => {
        // Do nothing on mouseout to keep the tooltip visible
      });

    nodes.append("circle")
      .attr("r", 8);

    nodes.append("text")
      .attr("dy", 3)
      .attr("x", d => d.children ? -12 : 12)
      .style("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name);
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div
        id="tooltip"
        ref={tooltipRef}
        className="tooltip"
        style={{
          opacity: tooltip.opacity,
          left: tooltip.left,
          top: tooltip.top,
          position: 'absolute',
          textAlign: 'center',
          width: '200px',
          padding: '5px',
          font: '12px sans-serif',
          background: '#333',
          color: '#fff',
          border: '1px solid #ccc',
          borderRadius: '5px',
          pointerEvents: 'auto', // Make sure pointer events are enabled
          cursor: 'pointer', // Change cursor to pointer
          transition: 'opacity 0.3s ease'
        }}
        dangerouslySetInnerHTML={{ __html: tooltip.content }}
      />
    </div>
  );
};

const EducationalRoadmapMaker = () => {
  const [input, setInput] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy data for demonstration purposes
    const mockData = {
      "children": [
        {
          "name": "Build Foundational Skills",
          "children": [
            {
              "name": "Learn HTML",
              "details": "Understand the structure of web pages, semantic markup, and accessibility.",
              "links": ["https://developer.mozilla.org/en-US/docs/Learn/HTML", "https://www.w3schools.com/html/"]
            },
            {
              "name": "Learn CSS",
              "details": "Master styling elements, layouts, responsive design, and CSS frameworks like Bootstrap or Tailwind CSS.",
              "links": ["https://developer.mozilla.org/en-US/docs/Learn/CSS", "https://www.w3schools.com/css/", "https://getbootstrap.com/docs/5.0/getting-started/introduction/", "https://tailwindcss.com/docs/installation"]
            },
            {
              "name": "Learn JavaScript",
              "details": "Grasp the fundamentals of programming, DOM manipulation, event handling, and asynchronous JavaScript.",
              "links": ["https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https://www.w3schools.com/js/"]
            }
          ]
        },
        {
          "name": "Explore Frontend Frameworks/Libraries",
          "children": [
            {
              "name": "Choose a Framework/Library",
              "details": "Research and select a popular framework/library like React, Vue.js, or Angular based on your project needs and learning preferences.",
              "links": ["https://reactjs.org/", "https://vuejs.org/", "https://angular.io/"]
            },
            {
              "name": "Learn the Fundamentals",
              "details": "Understand the core concepts, component-based architecture, state management, and routing within your chosen framework/library."
            }
          ],
          "details": "Frameworks and libraries provide reusable components and efficient development workflows."
        },
        {
          "name": "Master Version Control",
          "details": "Learn Git for tracking changes in your codebase, collaborating with others, and managing different versions of your project.",
          "links": ["https://git-scm.com/", "https://www.atlassian.com/git/tutorials"]
        },
        {
          "name": "Dive into Backend Basics",
          "details": "Gain a basic understanding of how servers work, APIs (Application Programming Interfaces), and how data is fetched from the backend.",
          "links": ["https://developer.mozilla.org/en-US/docs/Learn/Server-side"]
        },
        {
          "name": "Build Projects",
          "details": "Apply your knowledge by creating real-world projects. Start with simple projects and gradually increase complexity as you gain experience.",
          "links": ["https://github.com/florinpop17/app-ideas"]
        },
        {
          "name": "Practice and Continuous Learning",
          "details": "Frontend development is constantly evolving. Stay updated with the latest technologies, best practices, and emerging trends.",
          "links": ["https://www.freecodecamp.org/", "https://www.codecademy.com/", "https://www.udemy.com/"]
        }
      ],
      "name": "Frontend Engineering Roadmap",
      "details": "This roadmap outlines the key steps and skills required to become a successful Frontend Engineer."
    };
    setRoadmapData(mockData);
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

  < div className='p-6'>
    <h1 className="text-3xl font-bold text-white mb-6">Roadmap Maker AI</h1>
      

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter  what sort of roadmap do u reuire it can be of any type and can be very personalized or broad(career, technology , step-by-step process,tech stack ....)"
          className="w-full h-22 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
        <div className="flex space-x-4 mt-4">
          <button 
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
          >
            Generate Roadmap
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
      {roadmapData && <TreeDiagram data={roadmapData} />}
    </div>
    </div>
  );
};

export default EducationalRoadmapMaker;
