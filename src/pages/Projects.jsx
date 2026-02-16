import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';


const Projects = () => {
    const [projects, setProjects] = useState([]);

    React.useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
            setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="py-24 min-h-screen relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative">
                <h2 className="text-4xl md:text-6xl font-[Orbitron] font-bold text-center mb-16 text-white">
                    PROJECTS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">INNOVATIONS</span>
                </h2>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {projects.map((proj, index) => (
                        <motion.div
                            key={proj.id || index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid relative group"
                        >
                            <div className={`glass-card p-8 border-t-2 border-blue-500 hover:bg-white/5 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#0A0A1F]`}>
                                {proj.image && (
                                    <div className="mb-6 rounded-lg overflow-hidden border border-white/10">
                                        <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                )}
                                <div className="flex justify-between items-start mb-6">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/50 text-blue-400`}>
                                        {proj.category || 'Tech'}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-2 font-mono">
                                        <span className={`w-2 h-2 rounded-full ${proj.status === 'Ongoing' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`} />
                                        {proj.status || 'Completed'}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-[Orbitron] font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                    {proj.title}
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed text-sm font-light tracking-wide">
                                    {proj.desc}
                                </p>

                                <div className="flex gap-4 pt-6 border-t border-white/5">
                                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                                        <Github size={14} /> Code
                                    </button>
                                    <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors">
                                        <ExternalLink size={14} /> Live Demo
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {projects.length === 0 && <p className="text-center text-gray-500 col-span-full">No projects added yet.</p>}
                </div>
            </div>
        </section>
    );
};

export default Projects;
