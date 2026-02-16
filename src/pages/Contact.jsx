import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Using FormSubmit.co via AJAX
            // Note: First submission requires email activation.
            const response = await fetch("https://formsubmit.co/ajax/invetron.ssce@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `New Message from ${formData.name}: ${formData.subject}`, // Custom subject
                    _template: "table", // Clean email format
                    _captcha: "false" // Disable captcha for cleaner UX (optional)
                })
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                // Reset status after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error("FormSubmit Error:", result);
                setStatus('error');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setStatus('error');
        }
    };

    return (
        <section className="py-24 min-h-screen flex items-center relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-5xl md:text-6xl font-[Orbitron] font-black text-white mb-6 leading-tight">
                            GET IN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TOUCH</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-cyan-500/30 pl-6">
                            Have an idea? Want to join the club? Or just want to say hi? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { icon: Mail, title: "Email Us", val: "invetron.ssce@gmail.com", color: "text-cyan-400", bg: "bg-cyan-500/10" },
                            { icon: Phone, title: "Call Us", val: "+91 98765 00000", color: "text-purple-400", bg: "bg-purple-500/10" },
                            { icon: MapPin, title: "Visit Us", val: "Innovation Center, College Campus", color: "text-pink-400", bg: "bg-pink-500/10" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 10 }}
                                className="flex items-center gap-6 glass-panel p-5 hover:border-white/20 transition-all cursor-default"
                            >
                                <div className={`p-4 rounded-xl ${item.bg} ${item.color} shadow-lg ring-1 ring-white/5`}>
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                                    <p className="text-gray-400">{item.val}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-card p-10 space-y-8 border-t border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                                placeholder="JOHN DOE"
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                                placeholder="JOHN@EXAMPLE.COM"
                            />
                        </div>
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700"
                            placeholder="PROJECT COLLABORATION"
                        />
                    </div>

                    <div className="space-y-2 group">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest group-focus-within:text-cyan-400 transition-colors">Message</label>
                        <textarea
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-gray-700 resize-none"
                            placeholder="YOUR MESSAGE HERE..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold tracking-widest hover:shadow-[0_0_30px_rgba(0,198,255,0.4)] transition-all flex items-center justify-center gap-3 group mt-4 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            <>SENDING... <Loader2 size={18} className="animate-spin" /></>
                        ) : (
                            <>SEND MESSAGE <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                        )}
                    </button>

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 flex items-center gap-3"
                            >
                                <CheckCircle size={20} />
                                <span>Message sent successfully! Please check your email to confirm if it's the first time.</span>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 flex items-center gap-3"
                            >
                                <AlertCircle size={20} />
                                <span>Something went wrong. Please try again later.</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.form>

            </div>
        </section>
    );
};

export default Contact;
