import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Users, Cpu } from 'lucide-react';
import srisivaniLogo from '../assets/srisivani.jpg';

const About = () => {
    const features = [
        {
            icon: <PenTool className="w-8 h-8 text-cyan-400" />,
            title: "Design Thinking",
            desc: "Empathize, Define, Ideate, Prototype, and Test."
        },
        {
            icon: <Cpu className="w-8 h-8 text-purple-400" />,
            title: "Prototype Building",
            desc: "Turning concepts into tangible working models."
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
            title: "Ideation Workshops",
            desc: "Brainstorming sessions to spark creativity."
        },
        {
            icon: <Users className="w-8 h-8 text-pink-400" />,
            title: "Innovation Challenges",
            desc: "Competing to solve real-world problems."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-900/10 rounded-tr-[100px] blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-[Orbitron] font-bold mb-6">
                        ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">INVETRON</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(0,102,255,0.5)]" />
                    <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed border border-white/5 bg-white/5 p-8 rounded-2xl backdrop-blur-sm mb-12">
                        “Invetron Innovation Club fosters creativity, encourages innovative thinking, and enhances students’ ability to design practical, technology-driven solutions for real-world problems.”
                    </p>

                    {/* College Details Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 text-left"
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-white/10 rounded-full flex items-center justify-center p-4 border-2 border-white/20 shadow-[0_0_30px_rgba(0,100,255,0.2)] shrink-0">
                            <img
                                src={srisivaniLogo}
                                alt="Sri Sivani College Logo"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Proudly Powered by <span className="text-cyan-400">SSCE</span></h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                <strong>Sri Sivani College of Engineering (SSCE)</strong>, established in 2006, is a premier institution in Srikakulam, Andhra Pradesh. Permanently affiliated to JNTU-GV, Vizianagaram and approved by AICTE, SSCE provides a state-of-the-art environment for technical excellence.
                            </p>
                            <a href="http://srisivani.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-bold tracking-wide border-b border-cyan-400/50 hover:border-cyan-400 transition-all">
                                Visit Official Website &rarr;
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-8 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="bg-gradient-to-br from-gray-800 to-black w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-cyan-500/50 relative z-10">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-3 text-white relative z-10">{feature.title}</h3>
                            <p className="text-gray-400 text-sm relative z-10 group-hover:text-gray-300 transition-colors">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;

