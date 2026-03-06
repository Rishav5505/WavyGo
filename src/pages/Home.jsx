import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
    ArrowRight, MapPin, Star, Shield, Zap, Heart, Globe, Compass, Camera, Sparkles, MoveRight,
    Bike, Calendar, Search, CreditCard, CheckCircle, ShieldCheck, Headset
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CTA from '../components/layout/CTA';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import Testimonials from '../components/common/Testimonials';
import FAQ from '../components/common/FAQ';
import PopularPackages from '../components/common/PopularPackages';
import WhyChooseUs from '../components/common/WhyChooseUs';
import BlogSection from '../components/common/BlogSection';
import MobileAppSection from '../components/layout/MobileAppSection';
import SocialSection from '../components/layout/SocialSection';
import Lightbox from '../components/common/Lightbox';

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    const numericValue = parseInt(value.replace(/,/g, '').replace('+', ''));
    const isDecimal = value.includes('.');
    const suffix = value.includes('+') ? '+' : '';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const duration = 2000;
                    const increment = numericValue / (duration / 16);

                    const animate = () => {
                        start += increment;
                        if (start < numericValue) {
                            setCount(start);
                            requestAnimationFrame(animate);
                        } else {
                            setCount(numericValue);
                        }
                    };
                    animate();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [numericValue, hasAnimated]);

    return (
        <span ref={countRef}>
            {isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString()}
            {suffix}
        </span>
    );
};

const Home = () => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

    // 4 Premium Cinematic Hero Images (Website Style)
    const heroImages = [
        "https://www.athensbikerentals.in/assets/web/assets/images/main-slider-01.jpg",
        "https://www.balabikerental.shop/assets/hero-bikes-CmdOP9Iz.jpg",
        "https://twowheelhimalayas.com/wp-content/uploads/2025/12/20230729_112918-scaled.jpg",
        "https://twowheelhimalayas.com/wp-content/uploads/2025/12/20230731_132747-scaled.jpg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000); // Set to 5 seconds for smoother feel
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const stats = [
        { label: "Bikes Available", value: "500+", icon: Bike },
        { label: "Happy Riders", value: "10,000+", icon: Heart },
        { label: "Average Rating", value: "4.9/5", icon: Star },
        { label: "Verified Vendors", value: "50+", icon: Shield },
    ];

    const categories = [
        { title: "e-bike", img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/40710/rv-400-right-side-view-12.png?isig=0&q=80" },
        { title: "Commuter", img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/45481/shine-right-side-view-12.jpeg?isig=0&q=100" },
        { title: "Scooter", img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/44686/activa-6g-right-side-view-2.png?isig=0&q=80" },
        { title: "Cruiser", img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?isig=0&q=80" },
        { title: "Sports", img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/148323/duke-390-right-side-view-14.png?isig=0&q=80" },
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800",
        "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=800",
        "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800",
        "https://images.unsplash.com/photo-1449495169669-7b118f960237?q=80&w=800",
    ];

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col selection:bg-primary selection:text-white overflow-x-hidden">
            <Navbar />

            {/* Premium Cinematic Hero - Website style with Clear Visuals */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#011f15]">
                {/* Fixed Slideshow Logic */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentHeroIndex}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.8, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={heroImages[currentHeroIndex]}
                                className="w-full h-full object-cover pointer-events-none brightness-[0.85]"
                                alt={`WavyGo Experience ${currentHeroIndex + 1}`}
                            />
                            {/* Pro-Grade Overlays: Lighter to show images but dark enough for text */}
                            <div className="absolute inset-0 bg-[#011f15]/50 transition-all"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#011f15] via-[#011f15]/30 to-transparent"></div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content Container - Kona Mode (Extreme Side Alignment) */}
                <div className="w-full relative z-10 pt-32 pb-12 md:pt-40 md:pb-20 px-6 md:px-16 lg:px-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full max-w-[1800px] mx-auto" style={{ perspective: '2000px' }}>

                        {/* Kona Left: Refined Premium Search Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -80, rotateY: 15 }}
                            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                y: {
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                },
                                default: { duration: 1.2, ease: "circOut" }
                            }}
                            className="w-full max-w-sm lg:max-w-[440px] bg-white/95 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-11 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/50"
                        >
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tighter leading-tight md:leading-none">
                                Looking for <span className="text-primary">Best</span> <br />Bike Rentals?
                            </h1>
                            <p className="text-primary font-bold uppercase tracking-[0.3em] text-[8px] md:text-[9px] mb-8 md:mb-10 pl-2 border-l-4 border-primary/30">Book Self-Drive Adventure</p>

                            <form className="space-y-4 md:space-y-6">
                                <div className="space-y-1 group">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Destination</label>
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
                                        <input
                                            type="text"
                                            placeholder="Pick Your City..."
                                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 md:py-4.5 pl-14 pr-4 focus:outline-none focus:border-primary/40 focus:bg-white transition-all font-bold text-slate-700 text-sm hover:shadow-inner"
                                        />
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            whileFocus={{ x: "0%" }}
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Pickup</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            <button type="button" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 md:py-4.5 pl-10 md:pl-12 pr-2 md:pr-4 text-left text-[10px] md:text-[11px] font-bold text-slate-700 hover:border-primary/30 transition-all">
                                                02/03/26
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider ml-1">Dropoff</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            <button type="button" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3.5 md:py-4.5 pl-10 md:pl-12 pr-2 md:pr-4 text-left text-[10px] md:text-[11px] font-bold text-slate-700 hover:border-primary/30 transition-all">
                                                03/03/26
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/packages">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button className="w-full h-14 md:h-18 rounded-2xl bg-primary text-white font-black text-base md:text-lg uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-2xl shadow-primary/40 transition-all mt-2 md:mt-4 border-b-4 border-black/20 active:translate-y-1 active:border-b-0">
                                            SEARCH
                                        </Button>
                                    </motion.div>
                                </Link>
                            </form>
                        </motion.div>

                        {/* Kona Right: Premium USP Detail */}
                        <div className="flex-1 lg:max-w-xl">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8 md:space-y-12 text-center lg:text-left"
                            >
                                <div className="hidden lg:block">
                                    <h2 className="text-5xl md:text-6xl font-black uppercase text-primary tracking-tighter leading-none mb-1 shadow-primary/10">Explore</h2>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase text-white tracking-widest leading-none mb-6">WITHOUT LIMITS</h3>
                                    <div className="h-1 w-20 bg-primary shadow-lg shadow-primary/30 ml-auto lg:ml-0"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 md:gap-x-12 gap-y-10 md:gap-y-14">
                                    {[
                                        { icon: Bike, val: "10k+", label: "premium machines", color: "text-primary" },
                                        { icon: Globe, val: "Unlim.", label: "total freedom", color: "text-primary" },
                                        { icon: ShieldCheck, val: "Secure", label: "insured & safe", color: "text-primary" },
                                        { icon: Headset, val: "24/7", label: "expert support", color: "text-primary" },
                                    ].map((usp, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + (i * 0.15), duration: 0.8 }}
                                            className="space-y-3 md:space-y-4 group flex flex-col items-center lg:items-start text-center lg:text-left translate-y-0 hover:-translate-y-2 transition-transform duration-500"
                                        >
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 shadow-2xl backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary group-hover:shadow-primary/40">
                                                <usp.icon className={`w-6 h-6 md:w-8 md:h-8 ${usp.color} group-hover:text-white transition-colors duration-300`} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-none mb-2">{usp.val}</h3>
                                                <div className="flex items-center gap-2 justify-center lg:justify-start">
                                                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform hidden lg:block"></div>
                                                    <p className="text-white/60 font-medium text-[9px] md:text-[10px] uppercase tracking-[0.15em] leading-none">{usp.label}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Section */}
            <div className="pt-16 pb-12 bg-slate-50 relative z-10 -mt-20">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                            Find Your <span className="text-primary">Perfect Style</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-8">
                        {categories.map((cat, i) => (
                            <Link key={i} to="/packages" className="group">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    whileHover={{ y: -12, scale: 1.02 }}
                                    className="bg-white rounded-3xl md:rounded-[3rem] p-4 md:p-6 flex flex-col items-center justify-center gap-2 border border-slate-100 hover:border-primary/20 transition-all duration-700 shadow-xl shadow-slate-200/50 group h-full"
                                >
                                    <h4 className="text-base md:text-lg font-black text-slate-900 tracking-tight capitalize text-center">{cat.title}</h4>
                                    <div className="relative w-full h-24 md:h-40 flex items-center justify-center mt-auto">
                                        <motion.img
                                            initial={{ rotate: 0 }}
                                            whileHover={{ rotate: [-2, 2, 0] }}
                                            transition={{ duration: 0.5 }}
                                            src={cat.img}
                                            className="max-w-full h-20 md:h-36 object-contain group-hover:scale-110 transition-transform duration-700"
                                            alt={cat.title}
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <PopularPackages />
            <WhyChooseUs />

            {/* Analytics Section */}
            <section className="py-12 bg-primary overflow-hidden relative border-y border-white/10">
                <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-2 md:gap-8 lg:gap-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                className="text-center group p-2 hover:bg-white/5 transition-all duration-500 rounded-2xl relative"
                            >
                                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all group-hover:scale-110 group-hover:bg-white group-hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                                    <stat.icon className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black text-white mb-0.5 tracking-tighter">
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-white/60 font-extrabold uppercase tracking-[0.2em] text-[7.5px]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />
            <SocialSection />
            <FAQ />
            <MobileAppSection />
            <BlogSection />
            <CTA />
            <Footer />

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                images={galleryImages}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
            />
        </div>
    );
};

export default Home;
