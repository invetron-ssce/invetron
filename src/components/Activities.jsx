import React, { useState, useEffect } from 'react';
import { Calendar, Award, PenTool, Mic2, Rocket, BookOpen, Star } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'activities'), (snapshot) => {
            setActivities(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="py-24 relative bg-black/50 overflow-hidden">
            {/* Circuit Board Pattern */}
            <div className='absolute inset-0 opacity-10' style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066FF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-[Orbitron] font-bold text-center mb-16 text-white text-shadow-glow">
                    PLANNED <span className="text-cyan-400">ACTIVITIES</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {activities.map((act, index) => (
                        <div key={index} className="relative group">
                            <div className="glass-card p-8 h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-x-2 border border-white/5 group-hover:border-cyan-500/50 bg-gradient-to-b from-white/5 to-transparent">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                                    <div className="text-8xl font-black font-[Orbitron] text-white overflow-hidden" style={{ WebkitTextStroke: '1px cyan' }}>0{index + 1}</div>
                                </div>

                                <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-cyan-900/20 flex items-center justify-center text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(0,255,229,0.2)] overflow-hidden">
                                    {act.image ? <img src={act.image} alt={act.title} className="w-full h-full object-cover" /> : <Star size={32} />}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-white text-center group-hover:text-cyan-400 transition-colors uppercase tracking-wider">{act.title}</h3>
                                <p className="text-gray-400 text-center text-sm leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
                                    {act.desc}
                                </p>

                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Activities;
