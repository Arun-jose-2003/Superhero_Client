import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Shield, MessageCircle, AlertTriangle, ChevronRight, Users, X } from 'lucide-react';

import {chatAPI} from '../Services/allAPI'


import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import image from '../assets/image.jpeg';


import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Button.displayName = 'Button';

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = 'Input';

const LoadingAnimation = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative"
        animate={{
          x: [-100, window.innerWidth],
          transition: { duration: 2, ease: "linear", repeat: Infinity }
        }}
      >
        <img src={superheroRunning} alt="Superhero Running" className="w-32 h-32" />
        <motion.div
          className="absolute bottom-0 left-1/2 w-16 h-4 bg-white opacity-50 rounded-full"
          animate={{
            scaleX: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
      <motion.h2
        className="absolute bottom-10 text-white text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Guardian is on the way...
      </motion.h2>
    </motion.div>
  );
};


const SuperheroAnimation = ({ onClose }) => {
  const [text, setText] = useState('');
  const fullText = "I am Guardian, protector of the community. Together, we can make a difference. Report incidents, stay vigilant, and let's keep our world safe!";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75"
    >
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={24} />
        </button>
        <div className="flex items-center mb-4">
          <Shield className="text-yellow-400 mr-4" size={48} />
          <h2 className="text-3xl font-bold text-white">Guardian</h2>
        </div>
        <p className="text-lg text-white mb-4">{text}</p>
      </div>
    </motion.div>
  );
};

const SuperheroStory = ({ hero, description, image, direction }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center justify-between mb-32 ${direction === 'right' ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="w-1/2 pr-8">
        <h3 className="text-3xl ms-4 font-bold mb-4 text-yellow-400">{hero}</h3>
        <p className="text-blue-200 text-md ms-4">{description}</p>
      </div>
      <div className="w-1/2">
        <img src={image} alt={hero} className="rounded-lg shadow-2xl" />
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  

  const [showSuperhero, setShowSuperhero] = useState(false);
  const chatSectionRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSuperhero(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (chatSectionRef.current) {
      observer.observe(chatSectionRef.current);
    }

    return () => {
      if (chatSectionRef.current) {
        observer.unobserve(chatSectionRef.current);
      }
    };
  }, []);


  // --------------------------------------------------------------------------------------------------------

  const handleChatSubmit = async (e) => {
    e.preventDefault();
  
    if (chatMessage.trim() === "") return; // Prevent sending an empty message
  
    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: chatMessage, isUser: true },
    ]);
  
    setLoading(true); // Set loading state when making the API request
  
    try {
      // Send the user's message to the backend and get the AI's response
      const result = await chatAPI({ message: chatMessage });
  
      if (result.status === 200) {
        // Access the reply message from the API response
        const aiReply = result.data;
  // console.log(result.data);
  
        // Add AI response to chat
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiReply, isUser: false },
        ]);
      } else {
        // Handle error response
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error: Unable to fetch response", isUser: false },
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error: Something went wrong!", isUser: false },
      ]);
    } finally {
      setLoading(false); // Remove loading state after the request is done
    }
  
    setChatMessage(""); // Clear the input field after sending the message
  };
  
  // --------------------------------------------------------------------------------------------------------

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        <Header />

        <motion.div
          className="fixed inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20v-1.41l2.83-2.83 1.41 1.41L1.41 20H0zm20 0v-1.41l2.83-2.83 1.41 1.41L21.41 20H20zM0 0v1.41l2.83 2.83-1.41 1.41L0 3.41V0h1.41l2.83 2.83-1.41 1.41L0 1.41V0h20v1.41l-2.83 2.83 1.41 1.41L20 3.41V0h1.41l2.83 2.83-1.41 1.41L20 1.41V0h20zm0 38.59L22.24 40H20v-1.41l2.83-2.83 1.41 1.41L21.41 40H20v-1.41zM40 38.59l-2.83-2.83 1.41-1.41L40 36.59V38h-1.41l-2.83-2.83 1.41-1.41L40 36.59V38zm1.41-20l-2.83 2.83-1.41-1.41L40 16.59V18h-1.41l-2.83-2.83 1.41-1.41L40 16.59V18h1.41zM20 38.59l-2.83-2.83 1.41-1.41L20 36.59V38h-1.41l-2.83-2.83 1.41-1.41L20 36.59V38z" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </motion.div>

        <main className="container mx-auto mt-24 px-4 relative z-10">
          <Parallax translateY={[-20, 20]} className="relative min-h-[80vh] flex flex-col items-center justify-center text-center mb-16">
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              GUARDIAN
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-blue-200 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              In a world where voices often go unheard, Guardian rises as the beacon of hope.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >

            </motion.div>
          </Parallax>

          <Parallax translateY={[10, -10]} className="mb-32">
            <motion.section
              id="story"
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-yellow-400">The Birth of Guardian</h2>
              <p className="mb-6 text-blue-100 leading-relaxed">
                In a bustling city plagued by unaddressed grievances and silent sufferings, a group of extraordinary
                individuals came together with a shared vision. They saw the pain in the eyes of those whose voices
                were lost in the chaos of bureaucracy and indifference. Thus, Guardian was born - a beacon of hope
                and a shield for the voiceless.
              </p>
              <p className="mb-6 text-blue-100 leading-relaxed">
                Guardian isn't just a platform; it's a movement. It's the embodiment of the belief that every voice
                matters, every concern deserves attention, and every individual has the power to make a difference.
                Our mission is to empower you, to amplify your voice, and to ensure that your grievances are not just
                heard, but acted upon.
              </p>
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <Shield className="text-yellow-500 mb-3" size={40} />
                  <span className="text-blue-200 font-medium">Protection</span>
                </div>
                <div className="flex flex-col items-center">
                  <AlertTriangle className="text-red-500 mb-3" size={40} />
                  <span className="text-blue-200 font-medium">Swift Response</span>
                </div>
                <div className="flex flex-col items-center">
                  <MessageCircle className="text-blue-500 mb-3" size={40} />
                  <span className="text-blue-200 font-medium">Community Engagement</span>
                </div>
                <div className="flex flex-col items-center">
                  <Users className="text-green-500 mb-3" size={40} />
                  <span className="text-blue-200 font-medium">Empowerment</span>
                </div>
              </div>
            </motion.section>
          </Parallax>

          <div className="grid md:grid-cols-2 gap-8">
            <Parallax translateY={[10, -10]} className="h-full">
              <motion.section
                className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700 h-full"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Our Promise</h2>
                <p className="mb-6 text-blue-100 leading-relaxed">
                  At Guardian, we stand as vigilant protectors, dedicated to keeping our community safe and heard.
                  With cutting-edge technology and unwavering commitment, we're here to address your concerns
                  and swiftly respond to incidents. Your voice is our mission, your safety our priority.
                </p>
                <a href="/about" className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">Learn more about our mission</a>
              </motion.section>
            </Parallax>

            <Parallax translateY={[-10, 10]} className="h-full">
              <motion.section className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700 h-full"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <h2 className="text-3xl font-semibold mb-6 text-yellow-400">How It Works</h2>
                <ol className="list-decimal list-inside space-y-4 text-blue-100">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Report an incident through our secure online form</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>Guardian reviews and assesses the situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Receive updates on the progress of your report</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Guardian takes action to resolve the issue</span>
                  </li>
                </ol>
                {/* <a href="/report" className="mt-8 block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Report an Incident
                  </Button>
                </a> */}
              </motion.section>
            </Parallax>
          </div>

          <Parallax translateY={[20, -20]} className="mt-16">
            <motion.section
              ref={chatSectionRef}
              className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-yellow-400">
                Chat with our AI Assistant
              </h2>
              <button
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => setShowModal(true)}
              >
                Chat
              </button>
            </motion.section>

            {/* Modal for Chat */}
          {/* Modal for Chat */}
{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gray-800 rounded-lg shadow-2xl relative w-11/12 md:w-2/3 lg:w-1/2 flex flex-col h-[500px]">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>

      {/* Header */}
      <h3 className="text-2xl font-bold mb-4 text-yellow-400 text-center mt-4">
        AI Chat Assistant
      </h3>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-700 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg ${message.isUser ? "bg-green-500 text-white" : "bg-gray-600 text-blue-100"} max-w-xs`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleChatSubmit}
        className="p-4 bg-gray-700 rounded-b-lg flex items-center space-x-4"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          className="flex-1 bg-gray-600 text-white p-3 rounded-lg border border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Send
        </button>
      </form>
    </div>
  </div>
)}

            </Parallax>



            <div className="mt-32">
              <h2 className="text-4xl font-extrabold text-center mb-16 text-yellow-400">Guardian's Superhero Team</h2>
              <SuperheroStory
                hero="Captain Vigilance"
                description="With her keen eye and unwavering focus, Captain Vigilance leads our team in identifying and preventing potential threats before they escalate."
                image={img2}
                direction="left"
              />
              <SuperheroStory
                hero="The Responder"
                description="Armed with lightning-fast reflexes and state-of-the-art technology, The Responder is always first on the scene, ready to tackle any emergency."
                image={img1}
                direction="right"
              />
              <SuperheroStory
                hero="Cyber Sentinel"
                description="In the digital realm, Cyber Sentinel stands guard, protecting our community from online threats and ensuring the security of our virtual spaces."
                image={image}
                direction="left"
              />
            </div>
        </main>

        <footer className="mt-16 mb-2 py-8">
          <Footer />
        </footer>
      </div>

      <AnimatePresence>
        {showSuperhero && (
          <SuperheroAnimation onClose={() => setShowSuperhero(false)} />
        )}
      </AnimatePresence>
    </ParallaxProvider>
  );
};

export default Home;