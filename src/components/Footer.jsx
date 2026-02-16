import React from 'react';
import { Github, Instagram, Linkedin, Twitter, Heart, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black/80 backdrop-blur-xl pt-20 pb-10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-[2px]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group w-fit">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-shadow">
                                <Rocket className="text-white w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold tracking-wider font-[Orbitron] text-white">INVETRON</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Empowering the next generation of innovators. Join us to build, create, and inspire the future through technology.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Explore</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Objectives', path: '/objectives' },
                                { name: 'Activities', path: '/activities' },
                                { name: 'Coordinators', path: '/coordinators' },
                                { name: 'Faculty', path: '/faculty' },
                                { name: 'Projects', path: '/projects' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="text-cyan-400 mt-1">📍</span>
                                <span>Sri Sivani College of Engineering, chilakapalem, Srikakulam</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-cyan-400">📧</span>
                                <a href="mailto:invetron.ssce@gmail.com" className="hover:text-white transition-colors">invetron.ssce@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-cyan-400">📞</span>
                                <span>+91 63014 51462</span>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-2 w-fit">Connect</h4>
                        <div className="flex gap-4">
                            {[
                                { Icon: Twitter, href: "https://x.com/invetron_ssce" },
                                { Icon: Instagram, href: "https://instagram.com/invetron_ssce" },
                                { Icon: Linkedin, href: "https://www.linkedin.com/in/invetron-ssce-6537213ab" },
                                { Icon: Github, href: "https://github.com/invetron-ssce" }
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:text-cyan-400 hover:scale-110 transition-all border border-white/5 hover:border-cyan-500/30 group"
                                >
                                    <Icon size={18} className="group-hover:drop-shadow-[0_0_8px_rgba(0,255,229,0.5)]" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-mono">
                    <p>&copy; 2026 Invetron Innovation Club.</p>
                    <p className="flex items-center gap-1">
                        Made with <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" /> by Student Tech Team
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
