import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#030014]/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group pl-2">
            <span className={`text-lg font-bold tracking-widest font-[Orbitron] text-white ${scrolled ? 'opacity-100' : 'opacity-90'}`}>
              INVETRON
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors group"
                >
                  <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/5"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Admin/Dashboard Link */}
            {currentUser ? (
              <Link to="/admin" className="ml-4 flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all">
                <span className="text-xs font-bold uppercase">Dashboard</span>
              </Link>
            ) : (
              <Link to="/login" className="ml-4 p-2 text-gray-500 hover:text-white transition-colors" title="Admin Login">
                <span className="sr-only">Admin Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </Link>
            )}

            <Link to="/contact">
              <button className="ml-3 px-5 py-1.5 rounded-full bg-white text-black font-bold tracking-wide hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 active:scale-95 text-xs">
                JOIN CLUB
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden text-white hover:text-cyan-400 transition-colors pr-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#030014]/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link
                    to={link.path}
                    className="text-xl md:text-2xl font-[Orbitron] font-bold text-gray-300 hover:text-cyan-400 transition-colors active:scale-95 duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
