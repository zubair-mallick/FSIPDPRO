import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Cards from "./components/glowingcard/Card";
import Education from "./components/Education";
import Councellinng from "./components/Councellinng";
import MentalHealth from "./components/MentalHealth";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const Home = () => (
  <>
    <HeroSection />
    <Cards />
  </>
);

const App = () => {
  return (
    <div className="min-h-screen text-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/councellinng" element={<Councellinng />} />
          <Route path="/chatbot" element={<MentalHealth />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
