import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "./ui/Card";
import img from "../assets/councelling.png";
import img1 from "../assets/councelling2.png";

const CounselingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <div id="education" className="section to-gray-900 py-12">
      <div className="container mx-auto text-center border border-gray-600 shadow-lg rounded-lg p-8 relative">
        
        {/* Image aligned to the left */}
        <img
          src={img1}
          alt="Counseling 2"
          className="absolute left-0"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-bottom"
        />

        {/* Image aligned to the right */}
        <img
          src={img}
          alt="Boy"
          className="absolute right-0"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-anchor-placement="top-bottom"
        />

        <h1
          className="mb-6 text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 text-4xl font-bold"
          data-aos="fade-left"
        >
          Counseling and Resource Guidance
        </h1>
        <p
          className="max-w-3xl mx-auto mb-8 text-lg text-gray-300"
          data-aos="fade-left"
        >
          Welcome to the Counseling section, where we provide comprehensive
          guidance to help you navigate your career and academic journey. Our
          tools are designed to support you in making informed decisions and
          finding the right resources to excel in your chosen path.
        </p>

        <div className="md:flex md:justify-evenly px-8 gap-6">
          <div
            className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-right"
          >
            <Card
              title={"Career Guidance:"}
              desc={`Enter your desired career name to receive detailed information about
              the relevant exams, scholarships, prerequisites, and programs. This
              tool helps you understand the steps needed to pursue your career
              goals effectively.`}
              link={"/counseling"}
            />
          </div>

          <div
            className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-left"
          >
            <Card
              title={"Resource Finder:"}
              desc={`Input an exam or technology to find a curated list of resources,
              including groups, communities, and old question papers. This tool
              connects you with valuable resources to aid your preparation and
              learning journey.`}
              link={"/counseling"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselingPage;
