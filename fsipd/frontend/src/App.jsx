import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Cards from "./components/glowingcard/Card";
import Education from "./components/Education";
import Councellinng from "./components/Councellinng";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import EducationPage from "./education/page";
import CounselingPage from "./counseling/Page";
import ChatbotPage from "./chatbot/Page";

const Home = () => (
  <>
    <HeroSection />
    <Cards />
    <Education />
    <Councellinng />
    <Chatbot />
  </>
);

const App = () => {
  return (
    <div className="min-h-screen text-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
