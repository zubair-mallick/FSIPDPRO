import AiCarrerSugestor from "./AiCarrerSugestor";
import EducationalRoadmapMaker from "./roadmap/EducationalRoadmapMaker";
import Card from "./ui/Card";

const Education = () => {
  return (
    <div id="education" className="section">
      <div className="container mx-auto text-center">
        <h1 className="mb-6 text-transparent title bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900">
          Education and Career Guidance
        </h1>
        <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-300">
          Welcome to the Education section, where we provide comprehensive
          guidance to help you navigate your educational journey. Whether
          you&apos;re seeking to explore career paths or refine your academic
          focus, our tools are designed to support you in making informed
          decisions.
        </p>
        <div className="gap-4 px-8 justify-evenly md:flex">
          <Card
            title={"AI Career Suggestor:"}
            desc={`Discover potential career paths tailored to your interests and
              existing knowledge. Input your details to receive personalized
              career suggestions that align with your aspirations.`}
          />
          <Card
            title={"Educational Roadmap Maker"}
            desc={`A tool to assist you in planning your educational journey. It will
              help you map out your academic goals and strategies based on your
              career objectives and interests.`}
          />
        </div>
        <AiCarrerSugestor />

        <EducationalRoadmapMaker />
      </div>
    </div>
  );
};

export default Education;
