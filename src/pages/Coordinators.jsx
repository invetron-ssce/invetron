import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Filter, Github, Linkedin, Mail } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';


const Coordinators = () => {
    const [filter, setFilter] = useState('All');
    const [members, setMembers] = useState([]);

    React.useEffect(() => {
        const q = query(collection(db, 'coordinators')); // Can add orderBy('name')
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMembers(data);
        });
        return () => unsubscribe();
    }, []);

    const filteredMembers = filter === 'All' ? members : members.filter(m => m.branch === filter || m.role === filter);

    const filters = ['All', 'CSE', 'AIML', 'President', 'Coordinator'];

    return (
        <section className="py-24 min-h-screen">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-[Orbitron] font-bold text-white mb-4">
                        STUDENT <span className="text-cyan-400">COORDINATORS</span>
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full border transition-all ${filter === f
                                    ? 'bg-cyan-500 border-cyan-500 text-black font-bold'
                                    : 'border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {filteredMembers.map((member) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            key={member.id}
                            className="glass-card p-6 flex flex-col items-center text-center group border border-white/10 hover:border-cyan-500/50"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400 mb-4 shadow-[0_0_15px_rgba(0,255,229,0.3)]">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-sm text-purple-400 font-medium mb-2 uppercase tracking-wide">
                                {member.role}
                            </p>

                            <div className="text-gray-400 text-xs space-y-1 mb-4">
                                <p>{member.branch} • {member.year}</p>
                                <p>{member.roll}</p>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                {member.linkedin && (
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-cyan-500 hover:text-black transition-all">
                                        <Linkedin size={16} />
                                    </a>
                                )}
                                {member.github && (
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-purple-500 hover:text-white transition-all">
                                        <Github size={16} />
                                    </a>
                                )}
                                {member.mail && (
                                    <a href={`mailto:${member.mail}`} className="p-2 rounded-full bg-white/5 hover:bg-pink-500 hover:text-white transition-all">
                                        <Mail size={16} />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Coordinators;
