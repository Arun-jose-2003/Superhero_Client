'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, MessageCircle, AlertTriangle, Users } from 'lucide-react';
import { gsap } from 'gsap';

const Button = React.forwardRef(({ className, ...props }, ref) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Button.displayName = 'Button';

const BlastAnimation = ({ isVisible, onAnimationComplete }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="fixed inset-0 pointer-events-none z-50"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 2], opacity: [1, 0.8, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={onAnimationComplete}
      >
        <div className="absolute inset-0 bg-white opacity-50 rounded-full" />
      </motion.div>
    )}
  </AnimatePresence>
);

const quotes = [
  "I am vengeance. I am the night. I am Moon Knight.",
  "The moon is a loyal companion. It never leaves.",
  "In the darkness, we find our true selves.",
  "Embrace the chaos, for in it lies your strength.",
  "The night is darkest just before the dawn. But I promise you, the dawn is coming.",
];

const images = [
  "https://preview.redd.it/i-made-a-4k-moon-night-desktop-wallpaper-using-photoshop-v0-n232qq3nzdc81.jpg?width=1080&crop=smart&auto=webp&s=fd3cc5762e52d7f8353b453c2e39ccfb23d3ee4f",
  "https://cdn.wallpapersafari.com/20/72/axr5pi.jpg",
  "https://images2.alphacoders.com/122/thumb-1920-1225025.jpg",
  "https://wallpapercave.com/wp/wp10957293.jpg",
  "https://bmgator.org/wp-content/uploads/2022/05/MV5BMTUyNDlkZDEtNmE5OS00NzMzLWI3Y2ItY2EzYWNlN2JlZmRmXkEyXkFqcGdeQWFsZWxvZw@@._V1_-900x506.jpg",
];

function About() {
  const [showSuperhero, setShowSuperhero] = useState(false);
  const [showBlast, setShowBlast] = useState(false);
  const [isMoonKnightTheme, setIsMoonKnightTheme] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [currentImage, setCurrentImage] = useState(images[0]);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuperhero(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prevQuote => {
        const newQuote = quotes[(quotes.indexOf(prevQuote) + 1) % quotes.length];
        return newQuote;
      });
    }, 5000);

    const imageInterval = setInterval(() => {
      gsap.to(imageRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setCurrentImage(prevImage => {
            const newImage = images[(images.indexOf(prevImage) + 1) % images.length];
            return newImage;
          });
          gsap.to(imageRef.current, { opacity: 1, duration: 0.5 });
        }
      });
    }, 10000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(imageInterval);
    };
  }, []);

  useEffect(() => {
    const animateCardBorder = (cardRef) => {
      if (cardRef.current) {
        gsap.to(cardRef.current, {
          borderImage: isMoonKnightTheme
            ? 'linear-gradient(45deg, #2a2a2a, #4a4a4a, #2a2a2a) 1'
            : 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff) 1',
          duration: 5,
          repeat: -1,
          yoyo: true,
        });
      }
    };

    animateCardBorder(card1Ref);
    animateCardBorder(card2Ref);
  }, [isMoonKnightTheme]);

  const handleMoonClick = () => {
    setShowBlast(true);
    setIsMoonKnightTheme(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isMoonKnightTheme ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'} text-white overflow-hidden`}>
      <BlastAnimation 
        isVisible={showBlast} 
        onAnimationComplete={() => setShowBlast(false)} 
      />
      
      <motion.div 
        className="fixed inset-0 z-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: isMoonKnightTheme 
            ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath d=\'M20 0 L40 20 L20 40 L0 20 Z\' fill=\'%23fff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")'
            : 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cpath d=\'M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20v-1.41l2.83-2.83 1.41 1.41L1.41 20H0zm20 0v-1.41l2.83-2.83 1.41 1.41L21.41 20H20zM0 0v1.41l2.83 2.83-1.41 1.41L0 3.41V0h1.41l2.83 2.83-1.41 1.41L0 1.41V0h20v1.41l-2.83 2.83 1.41 1.41L20 3.41V0h1.41l2.83 2.83-1.41 1.41L20 1.41V0h20zm0 38.59L22.24 40H20v-1.41l2.83-2.83 1.41 1.41L21.41 40H20v-1.41zM40 38.59l-2.83-2.83 1.41-1.41L40 36.59V38h-1.41l-2.83-2.83 1.41-1.41L40 36.59V38zm1.41-20l-2.83 2.83-1.41-1.41L40 16.59V18h-1.41l-2.83-2.83 1.41-1.41L40 16.59V18h1.41zM20 38.59l-2.83-2.83 1.41-1.41L20 36.59V38h-1.41l-2.83-2.83 1.41-1.41L20 36.59V38z\' fill=\'%23fff\' fill-opacity=\'0.1\'/%3E%3C/svg%3E")',
        }}
      />
      
      <main className="container mx-auto mt-24 px-4 relative z-10">
        <motion.h1 
          className={`text-6xl md:text-8xl font-bold bg-clip-text text-transparent ${isMoonKnightTheme ? 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300' : 'bg-gradient-to-r from-yellow-300 via-red-500 to-pink-500'} mb-6 text-center`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Moon Knight: Guardian of the Night
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <motion.div 
              className="text-center p-6 rounded-xl shadow-xl"
              ref={card1Ref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="text-lg md:text-xl text-white">{currentQuote}</p>
            </motion.div>
          </div>

          <div className="flex justify-center items-center">
            <motion.div 
              className="text-center p-6 rounded-xl shadow-xl"
              ref={card2Ref}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                ref={imageRef} 
                src={currentImage} 
                alt="Moon Knight" 
                className="w-full h-auto rounded-lg" 
              />
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button 
            className={`px-8 py-2 text-lg font-semibold rounded-md shadow-md transition-all ${
              isMoonKnightTheme ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-yellow-500 hover:to-pink-700'
            }`}
            onClick={handleMoonClick}
          >
            {isMoonKnightTheme ? 'Switch to Hero Mode' : 'Switch to Moon Knight Mode'}
          </Button>
        </div>
      </main>
    </div>
  );
}

export default About;
