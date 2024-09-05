import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import edu from "../../assets/cards/education.jpg";
import guide from "../../assets/cards/guidance.png";
import mental from "../../assets/cards/mental.jpg";

const Card = ({ title, description, image, link }) => {
  const [props, api] = useSpring(() => ({
    transform: 'scale(1)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
    config: { tension: 210, friction: 20 },
  }));

  return (
    <a href={link} className="w-full md:w-[24vw]" aria-label={title}>
      <animated.div
        className="bg-gray-900 h-[80vh] text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-75 transform hover:scale-105"
        style={props}
        onMouseEnter={() => api.start({ transform: 'scale(1.05)' })}
        onMouseLeave={() => api.start({ transform: 'scale(1)' })}
      >
        <img src={image} alt={title} className="w-full h-2/3 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p>{description}</p>
        </div>
      </animated.div>
    </a>
  );
};

const Cards = () => {
  const data = [
    {
      id: 1,
      title: "Education",
      description: "Explore educational resources and opportunities.",
      image: edu,
      link: "#education"
    },
    {
      id: 2,
      title: "Counseling",
      description: "Access counseling services and support.",
      image: guide,
      link: "#counseling"
    },
    {
      id: 3,
      title: "ai chatbot",
      description: "Find ai chatbot resources and support.",
      image: mental,
      link: "#mental-health"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-10 p-4 justify-center">
      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default Cards;
