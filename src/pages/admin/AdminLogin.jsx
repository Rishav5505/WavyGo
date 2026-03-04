import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import Button from '../../components/common/Button';
import Logo from '../../components/common/Logo';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.isAdmin) {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await API.post('/users/login', {
                email,
                password
            });

            const data = response.data;

            if (data.isAdmin) {
                login(data);
                navigate('/admin/dashboard');
            } else {
                setError('Not authorized as admin');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed or could not connect to server');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100"
            >
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center mb-8">
                        <Logo className="items-center" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h1>
                    <p className="text-slate-500 mt-2">Sign in to manage WavyGo</p>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm mb-6 font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                                placeholder="admin@wavygo.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-700 mb-2 block ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back to Website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
