import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowUpRight, Loader, Zap, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import Button from './Button';
import API from '../../utils/api';

const PopularPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mocking bike data for WavyGo demonstration
        const mockBikes = [
            {
                _id: "1",
                title: "Royal Enfield Classic 350",
                location: "Available in Delhi",
                price: "1,200",
                rating: "4.9",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Bestseller",
                link: "/booking"
            },
            {
                _id: "2",
                title: "KTM Duke 390",
                location: "Available in Manali",
                price: "1,500",
                rating: "4.8",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/148323/duke-390-right-side-view-14.png?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Modern",
                link: "/booking"
            },
            {
                _id: "3",
                title: "Honda Activa 6G",
                location: "Available in Goa",
                price: "400",
                rating: "4.7",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-side-view-2.png?isig=0&q=80",
                duration: "Self-Drive",
                tag: "Economical",
                link: "/booking"
            },
            {
                _id: "4",
                title: "Honda Shine 125",
                location: "Available in Bangalore",
                price: "1,800",
                rating: "5.0",
                image: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/45481/shine-right-side-view-12.jpeg?isig=0&q=100",
                duration: "Self-Drive",
                tag: "Bestseller",
                link: "/booking"
            }
        ];

        setPackages(mockBikes);
        setLoading(false);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <Loader className="w-8 h-8 text-primary animate-spin" />
        </div>
    );

    if (packages.length === 0) return null;

    return (
        <section className="pt-0 pb-8 md:pb-24 bg-white text-slate-900">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    <div className="text-left space-y-4">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none">Most Wanted <br /><span className="text-primary">Machines</span></h2>
                        </Reveal>
                        <p className="max-w-xl text-slate-500 font-medium text-sm md:text-base leading-relaxed">The most powerful and stylish rides in the city, verified for performance and ready for your next adventure.</p>
                    </div>
                    <Link to="/packages">
                        <Button variant="outline" className="rounded-full px-10 h-[60px] border-slate-200 text-slate-600 font-bold tracking-widest uppercase text-[10px] hover:bg-primary hover:text-white transition-all">Explore Full Fleet</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-0">
                    {packages.map((pkg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col hover:shadow-[0_20px_40px_rgba(3,92,62,0.12)] transition-all duration-700 relative hover:-translate-y-2"
                        >
                            {/* Proximity & Availability Badge */}
                            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                                <div className="bg-white/60 backdrop-blur-2xl px-5 py-2.5 rounded-2xl text-[10px] font-bold text-primary shadow-xl border border-white/40 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                    <MapPin className="w-3.5 h-3.5" /> 0.8 KM AWAY
                                </div>
                                <div className="bg-rose-500/10 backdrop-blur-xl px-4 py-2 rounded-2xl text-xs font-bold text-rose-600 shadow-lg border border-rose-100/50 flex items-center gap-2 invisible group-hover:visible translate-x-4 group-hover:translate-x-0 transition-all">
                                    <Clock className="w-3 h-3" /> 2 Bikes Left
                                </div>
                            </div>

                            <div className="relative h-48 overflow-hidden bg-slate-50 flex items-center justify-center p-4">
                                <img src={pkg.image} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-1000" alt={pkg.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            </div>

                            <div className="p-5 md:p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'text-secondary fill-secondary' : 'text-slate-200 fill-slate-200'}`} />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{pkg.rating} Rating</span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">{pkg.title}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <Zap className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Engine</span>
                                            <span className="text-xs font-semibold text-slate-700 leading-none">Petrol</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/10 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                            <ArrowUpRight className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Start</span>
                                            <span className="text-xs font-semibold text-slate-700 leading-none">Button</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex flex-col gap-4">
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price / Day</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl md:text-2xl font-bold text-primary">₹{pkg.price}</span>
                                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">/Unlimited</span>
                                            </div>
                                        </div>
                                        <Link to={pkg.link} className="h-fit">
                                            <span className="text-[10px] font-black text-primary border-b-2 border-primary hover:text-black hover:border-black transition-all cursor-pointer tracking-widest uppercase">Details</span>
                                        </Link>
                                    </div>

                                    <Link to={pkg.link}>
                                        <Button className="w-full h-12 rounded-xl bg-slate-900 text-white shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-3 group/btn overflow-hidden">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] z-10">Rent This Machine</span>
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform z-10" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularPackages;
