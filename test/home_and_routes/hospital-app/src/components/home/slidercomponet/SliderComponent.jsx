import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './DemoCarousel.css'; 

const images = [
  {image:'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', text:"best hospital ever"}
  ,{image:'https://images.unsplash.com/photo-1516575901726-efcb7a9895a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', text:"i love u ..."}
  ,{image:'https://plus.unsplash.com/premium_photo-1664475477169-46b784084d4e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',text:"pls love me "}
];

const settings = {
  showArrows: true,
  interval: 3500,
  dynamicHeight: true,
  stopOnHover: false,
  infiniteLoop: true,
  showStatus: false,
  transitionTime: 500,
  showThumbs: false,
  showIndicators: true,
  swipeable: true,
  emulateTouch: true,
  autoPlay: true,
};

const DemoCarousel = () => (
  <div className="carousel-container">
    <Carousel {...settings}>
      {images.map((img, i) => (
        <div key={i} className="slide">
          <img src={img.image} alt={`Slide ${i + 1}`} />
          <div className="text-overlay">{img.text}</div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default DemoCarousel;
