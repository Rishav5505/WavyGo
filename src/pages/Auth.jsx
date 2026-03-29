import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ChevronLeft, Bike, Sparkles, Send, ShieldCheck, MapPin, Loader2 } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/api';
import Button from '../components/common/Button';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Auth = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState('login'); // login, signup, forgot
    const [role, setRole] = useState('user'); // user, vendor, admin
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: '',
        location: ''
    });
    const [isOtpSent, setIsOtpSent] = useState(false);

    const from = location.state?.from?.pathname || "/";

    if (user && mode === 'login') {
        return (
            <div className="min-h-screen pt-40 pb-20 container-custom flex items-center justify-center">
                <div className="w-full max-w-md bg-white p-12 rounded-[3.5rem] border border-emerald-50 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary relative z-10">
                        <User className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 relative z-10">Already Logged In</h2>
                    <p className="text-slate-500 font-medium mb-10 italic relative z-10">You are currently logged in as <span className="text-primary font-bold">{user.name}</span>.</p>

                    <div className="space-y-4 relative z-10">
                        <Button
                            onClick={() => navigate(user.role === 'admin' ? '/admin/dashboard' : user.role === 'vendor' ? '/vendor/dashboard' : '/profile')}
                            className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold shadow-xl hover:scale-[1.02] transition-all"
                        >
                            Go to Dashboard
                        </Button>
                        <button
                            onClick={() => logout()}
                            className="w-full py-4 text-red-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-rose-50 rounded-2xl transition-all"
                        >
                            Sign Out to Switch Accounts
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (mode === 'signup' && role === 'vendor') {
                if (step === 1) {
                    if (!formData.location) throw new Error('Please select a location');
                    setStep(2);
                    setLoading(false);
                    return;
                } else if (step === 2) {
                    // Send real OTP
                    await API.post('/users/send-otp', { email: formData.email });
                    setIsOtpSent(true);
                    setStep(3);
                    setLoading(false);
                    return;
                }
            }

            let response;
            if (mode === 'login') {
                // Simulation for Admin
                if (role === 'admin' && formData.email === 'admin@wavygo.com' && formData.password === 'admin123') {
                    login({ name: 'Super Admin', email: formData.email, role: 'admin', isAdmin: true, token: 'mock-admin-token' });
                    navigate('/admin/dashboard');
                    return;
                }

                // Try Real Login for BOTH User and Vendor
                response = await API.post('/users/login', {
                    email: formData.email,
                    password: formData.password
                });

                sessionStorage.setItem('userInfo', JSON.stringify(response.data));
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userRole', response.data.role);
                sessionStorage.setItem('userId', response.data._id);
            } else if (mode === 'signup') {
                if (!isOtpSent) {
                    // Step 1: Send OTP
                    await API.post('/users/send-otp', { email: formData.email });
                    setIsOtpSent(true);
                    setLoading(false);
                    return;
                } else {
                    // Step 2: Verify OTP and Register
                    response = await API.post('/users/verify-otp', {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        role: role,
                        location: formData.location,
                        otp: formData.otp
                    });

                    if (role === 'vendor') {
                        setStep(4); // Show success screen for vendor
                        setLoading(false);
                        return;
                    }
                }
            } else {
                alert('Password reset link sent to your email!');
                setMode('login');
                setLoading(false);
                return;
            }

            login(response.data);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || err.response?.data?.message || 'Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow flex items-center justify-center p-3 md:p-6 pt-24 md:pt-40 pb-20 overflow-hidden relative">
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
                    className="w-full max-w-[1000px] bg-white rounded-[2rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white overflow-hidden flex flex-col lg:flex-row relative z-10"
                >
                    {/* Visual Side - Featured Artwork */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#035c3e] relative items-center justify-center p-0 overflow-hidden group">
                        {/* Background Image - High Quality JPG */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src="/assets/images/auth-monkey.jpg"
                                alt="Punch Story"
                                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full lg:w-1/2 p-6 md:p-16">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Mode Header */}
                                <div className="mb-6 md:mb-10">
                                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2 md:mb-3 leading-tight">
                                        {mode === 'login' ? 'Ride Back In' : mode === 'signup' ? 'Start Your Journey' : 'Reset Password'}
                                    </h1>
                                    <p className="text-[11px] md:text-sm font-medium text-slate-500">
                                        {mode === 'login' ? 'Enter your details to access your account' : mode === 'signup' ? 'Create an account to start booking' : 'Enter your email to receive reset instructions'}
                                    </p>
                                </div>

                                {mode === 'login' && (
                                    <div className="flex bg-slate-100 p-1 rounded-xl md:rounded-2xl mb-6 md:mb-8">
                                        {['user', 'vendor', 'admin'].map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setRole(r)}
                                                className={`flex-1 py-2 md:py-3 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${role === r
                                                    ? 'bg-white text-primary shadow-sm'
                                                    : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                )}

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
                                    {mode === 'signup' && role === 'vendor' ? (
                                        <div className="space-y-6">
                                            {step === 1 && (
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Business Location</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Jaipur', 'Goa', 'Ahmedabad', 'Chandigarh', 'Hyderabad', 'Dehradun', 'Rishikesh', 'Manali'].map((loc) => (
                                                            <button
                                                                key={loc}
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, location: loc })}
                                                                className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all ${formData.location === loc
                                                                    ? 'bg-primary/5 border-primary text-primary shadow-sm'
                                                                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-200'
                                                                    }`}
                                                            >
                                                                {loc}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-6">
                                                    <div className="space-y-2 group">
                                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Business Name</label>
                                                        <div className="relative">
                                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                            <input
                                                                type="text"
                                                                required
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                placeholder="e.g. Royal Rentals"
                                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Business Email</label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                            <input
                                                                type="email"
                                                                required
                                                                value={formData.email}
                                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                                placeholder="vendor@business.com"
                                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 group">
                                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Create Password</label>
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
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div className="space-y-2 group">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Enter OTP (Sent to {formData.email})</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                                                        <input
                                                            type="text"
                                                            required
                                                            maxLength={6}
                                                            value={formData.otp}
                                                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                            placeholder="ENTER 6-DIGIT OTP"
                                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold tracking-[1em] text-center text-slate-700 text-lg"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {step === 4 ? (
                                                <motion.div
                                                    initial={{ scale: 0.9, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="bg-[#effaf6] border border-emerald-100 p-8 rounded-[2.5rem] text-center space-y-4"
                                                >
                                                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-primary/20">
                                                        <ShieldCheck className="w-8 h-8" />
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Request Submitted!</h3>
                                                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                                                        Our Admin team will review your {formData.location} rental profile. You'll receive an approval email within 24 hours.
                                                    </p>
                                                    <button
                                                        onClick={() => setMode('login')}
                                                        className="pt-4 text-xs font-black text-primary uppercase tracking-widest underline underline-offset-4"
                                                    >
                                                        Back to login
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <Button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="w-full h-16 rounded-2xl bg-primary text-white font-black text-lg uppercase tracking-[0.4em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
                                                >
                                                    {loading ? (
                                                        <Loader2 className="w-6 h-6 animate-spin" />
                                                    ) : (
                                                        step === 1 ? 'NEXT' : step === 2 ? 'SEND OTP' : 'VERIFY'
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    ) : (
                                        <>
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
                                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
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
                                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {mode !== 'forgot' && !isOtpSent && (
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
                                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {mode === 'signup' && isOtpSent && (
                                                <div className="space-y-2 group">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Enter Verification Code</label>
                                                    <div className="relative">
                                                        <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary transition-colors" />
                                                        <input
                                                            type="text"
                                                            required
                                                            maxLength={6}
                                                            value={formData.otp}
                                                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                                            placeholder="6-DIGIT OTP"
                                                            className="w-full bg-slate-50 border-2 border-primary/20 rounded-xl md:rounded-2xl py-3.5 md:py-4 pl-12 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-black text-primary text-center tracking-[1em] text-lg"
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">Sent to {formData.email}</p>
                                                </div>
                                            )}

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full h-14 md:h-16 rounded-xl md:rounded-2xl bg-primary text-white font-black text-base md:text-lg uppercase tracking-[0.2em] md:tracking-[0.4em] shadow-2xl shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
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
                                                        <button onClick={() => { setMode('signup'); setIsOtpSent(false); }} type="button" className="text-primary font-black hover:underline underline-offset-4">Sign Up</button>
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
                                        </>
                                    )}
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
