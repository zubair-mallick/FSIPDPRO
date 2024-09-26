import CareerGuidance from "./CareerGuidance";
import ResourceFinder from "./ResourceFinder";
import Card from "./ui/Card";

const CounselingPage = () => {
  return (
    <div id="education" className="section">
      <h1 className="mb-6 text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900">
        Counseling and Resource Guidance
      </h1>
      <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-300">
        Welcome to the Counseling section, where we provide comprehensive
        guidance to help you navigate your career and academic journey. Our
        tools are designed to support you in making informed decisions and
        finding the right resources to excel in your chosen path.
      </p>
      <div className="gap-4 px-8 justify-evenly md:flex">
        <Card
          title={"Career Guidance:"}
          desc={`Enter your desired career name to receive detailed information about
            the relevant exams, scholarships, prerequisites, and programs. This
            tool helps you understand the steps needed to pursue your career
            goals effectively.`}
        />
        <Card
          title={"Resource Finder:"}
          desc={`Input an exam or technology to find a curated list of resources,
            including groups, communities, and old question papers. This tool
            connects you with valuable resources to aid your preparation and
            learning journey.`}
        />
      </div>
      <CareerGuidance />
      <ResourceFinder />
    </div>
  );
};

export default CounselingPage;
