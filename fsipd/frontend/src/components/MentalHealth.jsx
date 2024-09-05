import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

const formatMessage = (message) => {
  console.log(message);

  // Convert **text** to bold text
  let formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
  formattedMessage = formattedMessage.replace(/(\.)(\s|$)/g, '$1\n');
  return formattedMessage;
};

// Typing Indicator
const TypingIndicator = () => {
  const props = useSpring({
    opacity: 1,
    config: { duration: 500 },
    from: { opacity: 0 },
  });
  return (
    <animated.div style={props} className="text-gray-400 mb-3 flex items-center">
      <span className="animate-pulse">Loading...</span>
    </animated.div>
  );
};

// ChatBubble component
const ChatBubble = ({ message, sender }) => {
  // Format the message
  const formattedMessage = formatMessage(message);

  return (
    <div className={`flex items-start mb-3 ${sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xs p-3 rounded-lg shadow-md ${sender === 'ai' ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}>
        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
      </div>
    </div>
  );
};

// Counseling Chatbot Component
const CounselingChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageTimestamps, setMessageTimestamps] = useState([]);
  const chatEndRef = useRef(null);

  const formatChatHistory = () => {
    return messages
      .map((msg) => `${msg.sender === 'ai' ? 'ai(you)' : 'user'}: ${msg.message}`)
      .join('\n');
  };

  const handleSendMessage = async () => {
    const currentTime = Date.now();
    const oneMinuteAgo = currentTime - 60000;

    // Filter out messages older than 1 minute
    const recentMessages = messageTimestamps.filter(timestamp => timestamp > oneMinuteAgo);

    if (recentMessages.length >= 10) {
      alert('You have reached the limit of 10 messages per minute. Please wait before sending more messages.');
      return;
    }

    // Add the current message timestamp
    setMessageTimestamps([...recentMessages, currentTime]);

    if (userInput.trim()) {
      // Add user message to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), message: userInput, sender: 'user' },
      ]);

      setUserInput('');
      setIsLoading(true);

      const chatHistory = formatChatHistory();

      try {
        const response = await fetch('http://localhost:3000/api/counseling-chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userInput, chatHistory }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { response: botResponse } = data;

        // Add bot response to chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), message: botResponse, sender: 'ai' },
        ]);
      } catch (error) {
        console.error('Error communicating with chatbot:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), message: 'An error occurred. Please try again.', sender: 'ai' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div id='career-counseling' className="p-6 min-h-screen flex flex-col">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-900 mb-6"> Career Counseling Chatbot</h1>

      <p className="text-lg text-gray-300 mb-8">
        Our Career Counseling Chatbot is designed to help you navigate your career path, provide information, and solve your doubts. It offers a secure and anonymous space to discuss your career-related concerns, with personalized advice and resources to guide you.
      </p>
      <ul className="list-disc list-inside text-gray-300 mb-8 pl-4">
        <li className="mb-4">
          <strong className="text-blue-400">Anonymity: </strong>
          <p>Your conversations are private and confidential, ensuring you feel safe discussing sensitive topics.</p>
        </li>
        <li>
          <strong className="text-blue-400 mb-2">Personalized Advice: </strong>
          <p>Offers tailored responses based on your input, helping you find relevant resources and guidance.</p>
        </li>
      </ul>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Use This Chatbot?</h2>
        <ul className="text-gray-400 list-disc list-inside">
          <li>The chatbot provides a safe and anonymous space to discuss your career goals and challenges.</li>
          <li>It offers unbiased support and guidance to help you make informed decisions.</li>
        </ul>
      </section>

      <div className="p-6">
        <h2 className="text-3xl font-bold text-white mb-6 capitalize"> Chatbot AI</h2>

        <div
          className="bg-gray-800 rounded-lg shadow-md flex-1 overflow-y-auto p-4 max-h-[60vh] min-h-[30vh]"
        >
          {messages.map((msg) => (
            <ChatBubble key={msg.id} message={msg.message.replace(/["/]/g, '')} sender={msg.sender} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center mt-4 border-t border-gray-700 pt-4">
          <input
            type="text"
            className="flex-grow p-3 rounded-l-lg border border-gray-600 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
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

export default CounselingChatbot;
