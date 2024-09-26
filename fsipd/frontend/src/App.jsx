import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Cards from "./components/glowingcard/Card";
import Education from "./components/Education";
import Councellinng from "./components/Councellinng";
import MentalHealth from "./components/MentalHealth";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <HeroSection />
      <Cards />
      <Education />
      <Councellinng />
      <MentalHealth />
      <Footer />
    </div>
  );
};

export default App;
