import React, { useState, useEffect,useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

import { TokenAuthContext } from '../contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthorised, setIsAuthorised } = useContext(TokenAuthContext);
  // if (isAuthorised) {
  //   // console.log("isAuthorized");
  //   }
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Grievance", path: "/grievance" },
  ];
  const handleLogout = () => {
    // Clear session storage or token
    sessionStorage.removeItem("username");
    
    setIsAuthorised(false);  // Update the state to false after logout
    window.location.href = '/';  // Redirect to the login page
  };
  

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Shield className="w-9 h-9 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
              Guardian
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={item.path}
            className="px-6 py-2 text-sm font-medium text-white/90 hover:text-white rounded-full no-underline border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/5"
          >
            {item.name}
          </Link>
        </motion.div>
      ))}
            {isAuthorised ? (
  <motion.button
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="ml-2 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-sm font-medium text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-red-500/20 border border-transparent"
    onClick={handleLogout}
  >
    Logout
  </motion.button>
            ):(
  <motion.button
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="ml-2 px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-sm font-medium text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-red-500/20 border border-transparent"
    onClick={() => window.location.href = '/login'}
  >
    Login
  </motion.button>
            )}

          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white/90 hover:text-white rounded-full border border-white/10 hover:border-white/25 transition-colors backdrop-blur-sm hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-2 py-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-6 py-3 text-sm font-medium text-white/90 hover:text-white rounded-full no-underline border border-white/10 hover:border-white/25 transition-all duration-300 backdrop-blur-sm hover:bg-white/5 text-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-sm font-medium text-white rounded-full hover:from-pink-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-red-500/20 border border-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = 'login'}
                >
                 Login
                </motion.button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
