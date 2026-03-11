import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Reveal from '../components/common/Reveal';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Header */}
            <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-[#035c3e] flex items-center justify-center text-center overflow-hidden">
                <div className="container-custom relative z-10">
                    <Reveal center width="100%">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 tracking-[-0.05em] uppercase leading-none">
                            Contact Us
                        </h1>
                    </Reveal>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-xs md:text-sm text-white/80 max-w-2xl mx-auto font-bold uppercase tracking-[0.4em]"
                    >
                        Elite Support for Elite Riders.
                    </motion.p>
                </div>
            </section>

            <section className="py-8 md:py-20 -mt-16 relative z-30 bg-gradient-to-b from-transparent via-[#f0f9f6]/50 to-[#f0f9f6]">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Info */}
                        <div className="lg:col-span-4 space-y-6">
                            {[
                                { icon: Mail, title: "Email Us", details: ["hello@wavygo.com"], color: "bg-primary/10 text-primary" },
                                { icon: MapPin, title: "Visit Us", details: ["New Delhi, India"], color: "bg-primary/10 text-primary" }
                            ].map((item, i) => (
                                <div key={i} className="bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-8 rounded-3xl shadow-sm border border-[#035c3e]/10 flex items-start gap-6 group hover:scale-105 transition-all duration-300">
                                    <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                                        {item.details.map((detail, idx) => (
                                            <p key={idx} className="text-slate-500 font-medium">{detail}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-8">
                            <div className="bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-[#035c3e]/10">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-primary font-medium" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email ID</label>
                                            <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-900 focus:outline-none focus:border-primary font-medium" placeholder="john@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                                        <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-6 text-slate-900 focus:outline-none focus:border-primary font-medium resize-none" placeholder="Tell us how we can help..."></textarea>
                                    </div>
                                    <Button className="w-full py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 bg-primary hover:bg-[#024a32] transition-colors shadow-lg shadow-primary/20 uppercase tracking-widest">
                                        Send Message <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social */}
            <section className="py-8 md:py-24 bg-white border-t border-slate-50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Connect With Us</h2>
                    <div className="flex justify-center gap-8">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-400 group shadow-sm border border-slate-100">
                                <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
