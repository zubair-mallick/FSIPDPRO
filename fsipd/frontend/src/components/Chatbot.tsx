import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";


const Chatbot = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div id="career-counseling" className="mb-10 container mx-auto text-center section relative border border-gray-600 shadow-lg rounded-lg p-8">
      
      {/* Image aligned to the right */}
      

      <h2
        className="mb-6 text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 text-4xl font-bold"
        data-aos="fade-left"
      >
        Career Counseling Chatbot
      </h2>
      <p
        className="max-w-3xl mx-auto mb-8 text-lg text-gray-300"
        data-aos="fade-left"
      >
        Our Career Counseling Chatbot is here to guide you through your career
        journey, offering expert advice and answers to your questions. It
        provides a safe, anonymous environment where you can explore your career
        options, receive personalized guidance, and access valuable resources
        tailored to your needs.
      </p>
      
      <Link
        className="mx-auto max-w-56 gradient-btn"
        to={"/chatbot"}
        data-aos="fade-left"
      >
        Try the Chatbot
      </Link>
    </div>
  );
};

export default Chatbot;
