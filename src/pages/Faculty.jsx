import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Award } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Faculty = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'faculty'), (snapshot) => {
            setFaculty(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-[Orbitron] font-bold text-center mb-16 text-white">
                    FACULTY <span className="text-purple-500">IN-CHARGE</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-8">
                    {faculty.map((fac, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="glass-panel p-8 max-w-md w-full flex items-center gap-6 border border-purple-500/20 hover:border-purple-500 transition-colors"
                        >
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-[0_0_20px_rgba(123,47,255,0.4)] flex-shrink-0">
                                <img src={fac.image} alt={fac.name} className="w-full h-full object-cover" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{fac.name}</h3>
                                <p className="text-purple-400 font-medium mb-1">{fac.designation}</p>
                                <p className="text-gray-400 text-sm mb-4">{fac.dept}</p>

                                <div className="flex gap-4 text-sm text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-cyan-400" />
                                        {fac.contact}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faculty;
