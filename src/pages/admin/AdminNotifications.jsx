import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Send, Users, User, ShieldCheck, AlertCircle, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';
import API from '../../utils/api';

const AdminNotifications = () => {
    const [target, setTarget] = useState('all_users');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [customEmail, setCustomEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSend = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const { data } = await API.post('/notifications/send', {
                target,
                subject,
                message,
                customEmail: target === 'custom' ? customEmail : undefined
            });

            setStatus({ type: 'success', message: data.message || 'Notification sent successfully!' });
            // Reset form
            if (target === 'custom') setCustomEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error("Failed to send notification:", error);
            setStatus({ 
                type: 'error', 
                message: error.response?.data?.message || 'Failed to send notification. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const targetOptions = [
        { id: 'all_users', label: 'All Registered Users', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'all_vendors', label: 'All Registered Vendors', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50' },
        { id: 'all', label: 'Everyone (Users & Vendors)', icon: MessageSquare, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'custom', label: 'Specific Email Address', icon: User, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                        <Bell className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mass Communication</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                             Broadcast emails and notifications across the platform
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Info Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Guidelines</h3>
                        
                        <div className="space-y-4">
                            {[
                                { title: 'Authenticity', desc: 'Ensure all broadcasts are official and follow brand voice.' },
                                { title: 'Clarity', desc: 'Use clear subjects to improve mail open rates.' },
                                { title: 'Compliance', desc: 'Do not send spam or unverified links.' }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.title}</p>
                                        <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex gap-3">
                                <AlertCircle className="w-4 h-4 text-emerald-900 shrink-0" />
                                <p className="text-[10px] text-emerald-900/70 font-bold leading-normal uppercase tracking-tight">
                                    Campaigns sent from here will be delivered via Brevo (Sendinblue) API configured in your backend.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSend} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] space-y-8">
                        
                        {/* Target Selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Recipient Segment</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {targetOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setTarget(opt.id)}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left ${
                                            target === opt.id 
                                            ? 'border-emerald-600 bg-emerald-50/30' 
                                            : 'border-slate-50 bg-white hover:border-slate-200'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${opt.bg} flex items-center justify-center shrink-0`}>
                                            <opt.icon className={`w-5 h-5 ${opt.color}`} />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-tight ${target === opt.id ? 'text-emerald-900' : 'text-slate-700'}`}>
                                                {opt.label}
                                            </p>
                                        </div>
                                        {target === opt.id && (
                                            <div className="ml-auto w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Email Input */}
                        {target === 'custom' && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }} 
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-2"
                            >
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Receiver Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        required
                                        value={customEmail}
                                        onChange={(e) => setCustomEmail(e.target.value)}
                                        placeholder="Enter recipient email address..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-600/40 focus:ring-4 focus:ring-emerald-900/5 transition-all font-bold text-slate-700 text-sm shadow-sm"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Notification Subject</label>
                            <input
                                type="text"
                                required
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="What is this notification about?"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-emerald-600/40 focus:ring-4 focus:ring-emerald-900/5 transition-all font-bold text-slate-700 text-sm shadow-sm"
                            />
                        </div>

                        {/* Message Body */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Detailed Message</label>
                            <textarea
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="6"
                                placeholder="Type your message here... Support for multi-line content."
                                className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-5 px-6 focus:outline-none focus:border-emerald-600/40 focus:ring-4 focus:ring-emerald-900/5 transition-all font-bold text-slate-700 text-sm shadow-sm resize-none"
                            ></textarea>
                        </div>

                        {/* Status Messages */}
                        {status.message && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-4 rounded-2xl flex items-center gap-3 ${
                                    status.type === 'success' ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-rose-50 text-rose-900 border border-rose-100'
                                }`}
                            >
                                {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                <p className="text-xs font-black uppercase tracking-tight">{status.message}</p>
                            </motion.div>
                        )}

                        {/* Actions */}
                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-4">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[200px]">
                                Clicking send will instantly dispatch the notification to the selected segment.
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-emerald-900/20 ${
                                    loading 
                                    ? 'bg-emerald-900/50 cursor-not-allowed opacity-70 text-white' 
                                    : 'bg-emerald-900 text-white hover:bg-emerald-800 hover:-translate-y-1'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Broadcast
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminNotifications;
