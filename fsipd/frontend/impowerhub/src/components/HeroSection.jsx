import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";
import heroImage from "../assets/hero.jpg"; // Adjust the path as needed

const HeroSection = () => {
  const parallaxRef = useRef(null);

  return (
    <section className="relative overflow-hidden h-screen  bg-black text-white">
      <ScrollParallax isAbsolutelyPositioned>
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
      </ScrollParallax>

      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative z-10 flex items-center justify-center h-full text-center px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empower Hub: Igniting Potential, Shaping Futures
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
  Discover Empower Hub—where innovation meets collaboration. Our platform drives progress and opens new doors, helping you achieve your goals with transformative solutions.
</p>

       
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
