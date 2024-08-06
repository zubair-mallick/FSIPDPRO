import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

// Typing animation
const useTypingAnimation = (message, delay) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedMessage(message.slice(0, index + 1));
      index += 1;
      if (index >= message.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [message, delay]);
  return displayedMessage;
};

// ChatBubble component
const ChatBubble = ({ message, sender }) => (
  <div className={`flex items-start mb-3 ${sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
    <div className={`max-w-xs p-3 rounded-lg shadow-md ${sender === 'ai' ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}>
      {message}
    </div>
  </div>
);

// Typing Indicator
const TypingIndicator = () => {
  const props = useSpring({
    opacity: 1,
    config: { duration: 500 },
    from: { opacity: 0 },
  });
  return (
    <animated.div style={props} className="text-gray-400 mb-3 flex items-center">
      <span className="animate-pulse">Typing...</span>
    </animated.div>
  );
};

// Mental Health AI Chatbot Component
const MentalHealthChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSendMessage = () => {
   
      
     
      



    if (userInput.trim()) {
      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: userInput, sender: 'user' },
      ]);
      
      // Clear input field
      setUserInput('');

      // Simulate typing and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), message: 'This is an AI-generated response.', sender: 'ai' },
        ]);
      }, 2000); // 2 seconds typing delay
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollbarStyle = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #1f1f1f', // Thumb color and track color
  };
  
  const scrollbarWebkitStyle = {
    WebkitScrollbar: {
      width: '8px',
    },
    WebkitScrollbarThumb: {
      backgroundColor: '#4a4a4a',
      borderRadius: '4px',
    },
    WebkitScrollbarTrack: {
      backgroundColor: '#1f1f1f',
    },
  };

  return (
    <div id='mental-health' className="p-6  min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 mb-6">Mental Health AI Chatbot</h1>
    
      <p className="text-lg text-gray-300 mb-8">
      Our Mental Health AI Chatbot is designed to provide confidential and supportive conversations for those seeking mental health assistance. It offers a secure and anonymous space to discuss your concerns, with the capability to deliver personalized advice and coping strategies. Whether
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-8 pl-4">
        <li className="mb-4">
          <strong className="text-blue-400">Anonymity: </strong> 
          <p>Your conversations are private and confidential, ensuring you feel safe discussing sensitive topics.</p>
        </li>
        <li>
          <strong className="text-blue-400  mb-2">Personalized Advice: </strong> 
          <p>  Offers tailored responses based on your input, helping you find relevant resources and coping mechanisms.</p>
        </li>
      </ul>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Use This Chatbot?</h2>
        <ul className="text-gray-400 list-disc list-inside">
          <li>The chatbot provides a safe and anonymous space to talk about your feelings and mental health.</li>
          <li>It’s a non-judgmental AI that is here to listen and provide support without any bias.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Not to Use This Chatbot?</h2>
        <ul className="text-gray-400 list-disc list-inside">
          <li>It may not replace professional mental health services or therapy.</li>
          <li>For complex mental health issues, human interaction with a qualified professional is recommended.</li>
        </ul>
      </section>
      <div className="p-6">
      <h2 className="text-3xl font-bold text-white mb-6 capitalize">chat with mental health ai</h2>
    
                <div
            className="bg-gray-800 rounded-lg shadow-md flex-1 overflow-y-auto p-4  max-h-[60vh] min-h-[30vh] "
            style={scrollbarStyle}
                 >
            {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.message} sender={msg.sender} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={chatEndRef} />
            </div>
             <div className="flex items-center mt-4 border-t border-gray-700 pt-4">
              <input
                 type="text"
                     className="flex-grow p-3 rounded-l-lg border border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-transparent"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                     placeholder="Type your message..."
             />

                    <button
                    className="p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                    onClick={handleSendMessage}
                    >
                    Send
                    </button>
                </div>
        </div>
    </div>
  );
};

export default MentalHealthChatbot;
