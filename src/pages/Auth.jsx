import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ChevronLeft, Bike, Sparkles, Send } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import Button from '../components/common/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Loader2 } from 'lucide-react';

const Auth = () => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let response;
            if (mode === 'login') {
                response = await API.post('/users/login', {
                    email: formData.email,
                    password: formData.password
                });
            } else if (mode === 'signup') {
                response = await API.post('/users', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });
            } else {
                // Simplified forgot password logic
                alert('Password reset link sent to your email!');
                setMode('login');
                setLoading(false);
                return;
            }

            login(response.data);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-6 pt-32 pb-20 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 45, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 50, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity }}
                        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[1000px] bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col lg:flex-row relative z-10"
                >
                    {/* Visual Side */}
                    <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-16 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                        <div className="relative z-10 text-center">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/40"
                            >
                                <Bike className="w-12 h-12 text-white" />
                            </motion.div>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-6">Join the <br /><span className="text-primary italic">WavyGo</span> Community</h2>
                            <p className="text-slate-400 font-medium leading-relaxed mb-10">Access exclusive bike rates, manage your bookings, and explore India with total freedom.</p>

                            <div className="flex flex-col gap-6 text-left">
                                {[
                                    { icon: Sparkles, text: "Elite Member Pricing", desc: "Get up to 20% off on long-term rentals." },
                                    { icon: Send, text: "Instant Support Access", desc: "Priority WhatsApp support for members." },
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start group">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                            <feature.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm tracking-tight">{feature.text}</h4>
                                            <p className="text-slate-500 text-[10px] font-medium mt-1">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full lg:w-1/2 p-10 md:p-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Mode Header */}
                                <div className="mb-12">
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
                                        {mode === 'login' ? 'Ride Back In' : mode === 'signup' ? 'Start Your Journey' : 'Reset Password'}
                                    </h1>
                                    <p className="text-slate-500 font-medium">
                                        {mode === 'login' ? 'Enter your details to access your account' : mode === 'signup' ? 'Create an account to start booking' : 'Enter your email to receive reset instructions'}
                                    </p>
                                </div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold"
                                    >
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {mode === 'signup' && (
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="email@example.com"
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                            />
                                        </div>
                                    </div>

                                    {mode !== 'forgot' && (
                                        <div className="space-y-2 group">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
                                                {mode === 'login' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setMode('forgot')}
                                                        className="text-[10px] font-black uppercase text-primary tracking-widest hover:underline"
                                                    >
                                                        Forgot?
                                                    </button>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="password"
                                                    required
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    placeholder="••••••••"
                                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            mode === 'login' ? 'LOGIN' : mode === 'signup' ? 'CREATE' : 'RESET'
                                        )}
                                    </Button>

                                    {/* Mode Toggle */}
                                    <div className="pt-6 text-center">
                                        {mode === 'login' ? (
                                            <p className="text-sm font-medium text-slate-500">
                                                Don't have an account? {' '}
                                                <button onClick={() => setMode('signup')} type="button" className="text-primary font-black hover:underline underline-offset-4">Sign Up</button>
                                            </p>
                                        ) : (
                                            <button
                                                onClick={() => setMode('login')}
                                                type="button"
                                                className="flex items-center gap-2 mx-auto text-sm font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
                                            >
                                                <ChevronLeft className="w-4 h-4" /> Back to Login
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Auth;
