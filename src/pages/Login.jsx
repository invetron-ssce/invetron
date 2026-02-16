import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError('Failed to log in. ' + err.message);
            console.error(err);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#030014]">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md p-8 glass-card border-t border-white/10 relative z-10"
            >
                <h2 className="text-3xl font-[Orbitron] font-bold text-center text-white mb-8 tracking-wider">
                    ADMIN <span className="text-cyan-400">LOGIN</span>
                </h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                                placeholder="ADMIN@INVETRON.CLUB"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold tracking-widest hover:shadow-[0_0_20px_rgba(0,198,255,0.4)] transition-all hover:scale-[1.02] mt-4"
                    >
                        ACCESS DASHBOARD
                    </button>
                </form>
            </motion.div>
        </section>
    );
};

export default Login;
