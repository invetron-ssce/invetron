import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Layers, Globe, Code, Mic } from 'lucide-react';

const Objectives = () => {
    const objectives = [
        { icon: <Zap />, text: "Promote innovative thinking" },
        { icon: <Target />, text: "Encourage teamwork & collaboration" },
        { icon: <Layers />, text: "Prototype development" },
        { icon: <Globe />, text: "Support idea-to-execution workflow" },
        { icon: <Code />, text: "Exposure to modern tools" },
        { icon: <Mic />, text: "Build leadership & presentation ability" },
    ];

    return (
        <section className="py-24 bg-black/40 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-4xl md:text-5xl font-[Orbitron] font-bold text-center mb-16 text-white"
                >
                    OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">OBJECTIVES</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {objectives.map((obj, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel p-6 flex items-center gap-6 hover:bg-white/5 transition-all border border-white/5 hover:border-purple-500/50 group"
                        >
                            <div className="p-4 bg-gradient-to-br from-purple-900/50 to-black rounded-xl text-purple-400 shadow-inner group-hover:text-cyan-400 transition-colors ring-1 ring-white/10">
                                {obj.icon}
                            </div>
                            <p className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors tracking-wide">{obj.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Objectives;
