import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { duration: 800 },
  });

  return (
    <animated.footer style={animationProps} className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-screen-lg mx-auto px-6">
        <div className="flex flex-wrap justify-between mb-10">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-3">Impower Hub</h3>
            <ul className="list-none mb-4">
              <li className="mb-2">
                <a href="/education" className="hover:text-blue-400 transition-colors">
                  Education
                </a>
              </li>
              <li className="mb-2">
                <a href="/councellinng" className="hover:text-blue-400 transition-colors">
                  Counseling
                </a>
              </li>
              <li className="mb-2">
                <a href="/chatbot" className="hover:text-blue-400 transition-colors">
                  AI Chatbot
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Connect</h3>
            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="https://github.com/zubair-mallick"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/zubair-mallik/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Quick Links</h3>
            <ul className="list-none">
              <li className="mb-2">
                <a href="/education" className="hover:text-blue-400 transition-colors">
                  Career Suggestor
                </a>
              </li>
              <li className="mb-2">
                <a href="/education" className="hover:text-blue-400 transition-colors">
                  AI Roadmap Maker
                </a>
              </li>
              <li className="mb-2">
                <a href="/councellinng" className="hover:text-blue-400 transition-colors">
                  Resource Finder
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-full text-center md:text-left mt-6">
            <h3 className="text-xl font-bold text-white mb-3">About Us</h3>
            <p>
              Impower Hub is a project dedicated to providing comprehensive guidance and support for
              education, career development, and AI chatbot services.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 mt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Impower Hub. All rights reserved. | This is a project
            and not an official service.
          </p>
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;
