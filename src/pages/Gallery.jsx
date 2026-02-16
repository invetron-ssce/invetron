import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1531297461136-82lw9z2l3b1c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563770095-39d46baa2c7c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80"
    ];

    return (
        <section className="py-24 min-h-screen">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-[Orbitron] font-bold text-center mb-16 text-white">
                    INNOVATION <span className="text-cyan-400">GALLERY</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group overflow-hidden rounded-xl h-64 border border-white/10 hover:border-cyan-500/50"
                        >
                            <img
                                src={src}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-white font-bold tracking-wide">Event Highlight #{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
