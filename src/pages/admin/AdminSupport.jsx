import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, Mail, User, Clock, Trash2, 
    CheckCircle2, AlertCircle, MessageSquare, 
    Search, Filter, ChevronRight, X, ExternalLink,
    Send, Loader2
} from 'lucide-react';
import API from '../../utils/api';

const AdminSupport = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [filter, setFilter] = useState('all');
    
    // Reply states
    const [replyText, setReplyText] = useState('');
    const [sendingReply, setSendingReply] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await API.get('/contact');
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch support messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await API.put(`/contact/${id}`, { status: newStatus });
            setMessages(messages.map(m => m._id === id ? { ...m, status: newStatus } : m));
            if (selectedMsg?._id === id) setSelectedMsg({ ...selectedMsg, status: newStatus });
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Delete this message forever?')) {
            try {
                await API.delete(`/contact/${id}`);
                setMessages(messages.filter(m => m._id !== id));
                if (selectedMsg?._id === id) setSelectedMsg(null);
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const handleSendReply = async () => {
        if (!replyText.trim()) return;
        setSendingReply(true);
        try {
            await API.post(`/contact/${selectedMsg._id}`, { replyMessage: replyText });
            alert('Reply sent successfully via email!');
            setReplyText('');
            setShowReplyForm(false);
            // Update local state to show 'replied' status
            setMessages(messages.map(m => m._id === selectedMsg._id ? { ...m, status: 'replied' } : m));
            setSelectedMsg({ ...selectedMsg, status: 'replied' });
        } catch (error) {
            console.error("Reply Error:", error);
            alert('Failed to send reply. Please check server logs.');
        } finally {
            setSendingReply(false);
        }
    };

    const filteredMessages = messages.filter(m => {
        const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             m.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || m.status === filter;
        return matchesSearch && matchesFilter;
    });

    const statusColors = {
        new: 'bg-rose-50 text-rose-600 border-rose-100',
        read: 'bg-emerald-50 text-emerald-900 border-emerald-100',
        replied: 'bg-indigo-50 text-indigo-600 border-indigo-100'
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-900 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl shadow-emerald-900/20">
                        <HelpCircle className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Help & Support</h1>
                        <p className="text-slate-500 text-sm font-bold flex items-center gap-2">
                            Manage inquiries and support requests from your community
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Total Requests</p>
                        <p className="text-xl font-black text-slate-900">{messages.length}</p>
                    </div>
                    <div className="bg-rose-50 px-6 py-3 rounded-2xl border border-rose-100 shadow-sm">
                        <p className="text-[10px] font-black uppercase text-rose-400 tracking-widest leading-none mb-1">Unread</p>
                        <p className="text-xl font-black text-rose-600">{messages.filter(m => m.status === 'new').length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-600/40 transition-all font-bold text-slate-700 text-sm shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                    {['all', 'new', 'read', 'replied'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                filter === f 
                                ? 'bg-white text-emerald-900 shadow-md ring-1 ring-emerald-900/5' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnimatePresence>
                    {filteredMessages.map((msg) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={() => {
                                setSelectedMsg(msg);
                                setShowReplyForm(false);
                            }}
                            className={`group cursor-pointer bg-white p-8 rounded-[2.5rem] border transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 ${
                                selectedMsg?._id === msg._id ? 'border-emerald-600/40 ring-4 ring-emerald-900/5' : 'border-slate-100'
                            }`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                        {msg.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">{msg.name}</h3>
                                        <p className="text-xs text-slate-400 font-bold tracking-tight">{msg.email}</p>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${statusColors[msg.status]}`}>
                                    {msg.status}
                                </span>
                            </div>

                            <p className="text-slate-500 text-sm font-bold leading-relaxed line-clamp-3 mb-6">
                                "{msg.message}"
                            </p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                    <Clock className="w-3 h-3" /> 
                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-emerald-900 group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {!loading && filteredMessages.length === 0 && (
                <div className="py-20 text-center space-y-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase italic">Inbox Empty</h3>
                        <p className="text-slate-400 text-xs font-bold">No messages found matching your criteria.</p>
                    </div>
                </div>
            )}

            {/* Message Detail Modal */}
            <AnimatePresence>
                {selectedMsg && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedMsg(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-emerald-900 font-extrabold text-xl">
                                            {selectedMsg.name[0]}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2">{selectedMsg.name}</h2>
                                            <div className="flex items-center gap-3">
                                                <a href={`mailto:${selectedMsg.email}`} className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">
                                                    <Mail className="w-3.5 h-3.5" /> {selectedMsg.email}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedMsg(null)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400">
                                        <X className="w-7 h-7" />
                                    </button>
                                </div>

                                <div className="bg-slate-50 p-6 md:p-8 rounded-[2rem] mb-8 border border-slate-100 relative">
                                    <MessageSquare className="absolute -top-4 -left-4 w-12 h-12 text-white fill-slate-50" />
                                    <p className="text-slate-700 text-lg font-bold leading-relaxed relative z-10">
                                        "{selectedMsg.message}"
                                    </p>
                                </div>

                                {showReplyForm ? (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4 mb-8"
                                    >
                                        <label className="text-[10px] font-black uppercase text-emerald-600 tracking-widest ml-1">Type Your Response</label>
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Hello! Thank you for reaching out..."
                                            className="w-full bg-emerald-50/30 border-2 border-emerald-100 rounded-[2rem] p-6 focus:outline-none focus:border-emerald-600/40 font-bold text-slate-700 min-h-[150px] transition-all"
                                        />
                                        <div className="flex gap-3 justify-end">
                                            <button 
                                                onClick={() => setShowReplyForm(false)}
                                                className="px-6 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={handleSendReply}
                                                disabled={sendingReply || !replyText.trim()}
                                                className="flex items-center gap-3 px-8 py-4 bg-emerald-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all disabled:opacity-50"
                                            >
                                                {sendingReply ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                                Send Email Response
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-2">
                                            {['new', 'read', 'replied'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateStatus(selectedMsg._id, s)}
                                                    className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                                        selectedMsg.status === s 
                                                        ? statusColors[s] 
                                                        : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => deleteMessage(selectedMsg._id)}
                                                className="p-4 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-2xl transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => setShowReplyForm(true)}
                                                className="flex items-center gap-3 px-8 py-4 bg-emerald-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-900/20 hover:bg-emerald-800 transition-all"
                                            >
                                                <Mail className="w-4 h-4" /> Reply Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminSupport;
