import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import srisivaniLogo from '../assets/srisivani.jpg';
import invetronLogo from '../assets/invetron.jpeg';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030014] pt-28 lg:pt-0">
      {/* Dynamic Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center px-6">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3 mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <img src={srisivaniLogo} alt="SSCE Logo" className="w-6 h-6 object-cover rounded-full" />
              <span className="text-gray-300 text-sm font-bold tracking-wider uppercase">Sri Sivani College of Engineering</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 backdrop-blur-sm"
          >
            <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase text-shadow-glow">
              Future of Innovation
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-[Orbitron] font-black leading-none mb-6 text-white tracking-tighter mix-blend-screen">
            INVE<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TRON</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 tracking-widest uppercase">
            IDEAS <span className="text-purple-500 font-bold">EVOLVE</span> INTO REALITY
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed border-l-2 border-purple-500/50 pl-6">
            Fostering creativity and engineering the future. Join the elite community of innovators designing solutions for tomorrow's world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold tracking-widest hover:shadow-[0_0_30px_rgba(123,47,255,0.6)] transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">JOIN NOW</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#00FFE5', color: '#00FFE5' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-transparent text-white font-bold tracking-widest hover:bg-white/5 transition-all border border-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.2)]"
              >
                EXPLORE
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Visual Content - 3D HUD Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center items-center h-[500px]"
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
            {/* Rotating Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 border border-cyan-500/20 rounded-full border-t-cyan-500"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              className="absolute inset-8 border border-purple-500/20 rounded-full border-b-purple-500"
            />
            <motion.div
              animate={{ rotate: 180 }}
              transition={{ duration: 10, ease: "linear", repeat: Infinity }}
              className="absolute inset-16 border-[3px] border-dashed border-blue-500/20 rounded-full"
            />

            {/* Center Core */}
            <div className="absolute inset-0 m-auto w-40 h-40 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_60px_rgba(0,102,255,0.4)] flex flex-col items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 to-purple-900/50 opacity-50" />
              <img
                src={invetronLogo}
                alt="College Logo"
                className="w-full h-full object-cover rounded-full relative z-10 opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Orbital Particles */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_10px_#00FFE5] animate-[spin_4s_linear_infinite_reverse] origin-[0_225px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
