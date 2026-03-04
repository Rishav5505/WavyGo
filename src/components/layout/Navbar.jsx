import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, User, ChevronRight, Compass, Map, Info, Phone, Bike, Smartphone } from 'lucide-react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Logo from '../common/Logo';

const Navbar = () => {
    const { scrollYProgress } = useScroll();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/', icon: Compass, desc: 'Where the ride begins' },
        { name: 'Bikes', path: '/packages', icon: Map, desc: 'Explore our fleet' },
        { name: 'About', path: '/about', icon: Info, desc: 'Our story & mission' },
        { name: 'Contact', path: '/contact', icon: Phone, desc: 'Get in touch with us' },
    ];

    const menuVariants = {
        closed: {
            clipPath: "circle(0% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40,
                staggerChildren: 0.1,
                staggerDirection: -1
            }
        },
        open: {
            clipPath: "circle(150% at 90% 40px)",
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: 30, filter: 'blur(10px)' },
        open: { opacity: 1, y: 0, filter: 'blur(0px)' }
    };

    return (
        <header className="fixed top-0 w-full z-[100]">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[1000]"
                style={{ scaleX: scrollYProgress }}
            />
            {/* Announcement Bar */}
            <AnimatePresence>
                {!scrolled && !isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-primary py-2 relative overflow-hidden"
                    >
                        <div className="w-full relative z-10 font-bold uppercase tracking-widest overflow-hidden flex items-center text-white text-[10px] md:text-xs">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                                className="flex whitespace-nowrap w-max"
                            >
                                {/* First Set to create infinite loop */}
                                <div className="flex items-center gap-20 px-10">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={`m1-${i}`} className="flex items-center gap-3">
                                            <Sparkles className="w-3 h-3 text-secondary" />
                                            <span>Flat 20% Off on Group Bookings for March</span>
                                            <Link to="/booking" className="inline-flex items-center gap-1 hover:text-white/80 transition-colors relative z-20">
                                                Book Now <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                                {/* Second Set to complete seamless scroll */}
                                <div className="flex items-center gap-20 px-10">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={`m2-${i}`} className="flex items-center gap-3">
                                            <Sparkles className="w-3 h-3 text-secondary" />
                                            <span>Flat 20% Off on Group Bookings for March</span>
                                            <Link to="/booking" className="inline-flex items-center gap-1 hover:text-white/80 transition-colors relative z-20">
                                                Book Now <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navbar */}
            <nav className={`fixed left-0 right-0 z-[100] transition-all duration-700 pointer-events-none ${scrolled ? 'top-4 md:top-6' : 'top-0'}`}>
                <div className={`container-custom pointer-events-auto transition-all duration-700 ${scrolled ? 'max-w-5xl' : 'max-w-7xl'}`}>
                    <div className={`relative flex items-center justify-between transition-all duration-700 px-6 md:px-10 ${scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/50' : 'py-6 md:py-10'}`}>
                        <Logo />

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all relative group ${scrolled ? 'text-slate-900' : 'text-white hover:text-primary transition-colors'}`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 bg-primary/10 rounded-full z-0 border border-primary/5"
                                        />
                                    )}
                                </Link>
                            ))}
                            <div className="w-px h-6 bg-slate-200/20 mx-2" />

                            {user ? (
                                <div className="relative">
                                    <motion.button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center gap-2 group"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                                            <User className="w-5 h-5 fill-white" />
                                        </div>
                                        <span className={`text-sm font-bold transition-all ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                                            {user.name}
                                        </span>
                                    </motion.button>

                                    {/* User Dropdown Premium Menu */}
                                    <AnimatePresence>
                                        {showUserDropdown && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-0"
                                                    onClick={() => setShowUserDropdown(false)}
                                                />
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute top-full right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border border-slate-100 p-6 z-10"
                                                >
                                                    <div className="flex items-center gap-4 mb-6">
                                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                            <User className="w-6 h-6 fill-primary" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-black text-slate-900 leading-none mb-1">{user.name}</h4>
                                                            <p className="text-[10px] font-medium text-slate-400 break-all">{user.email}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                                                            <button className="flex items-center gap-3 w-full p-3 px-4 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition-all">
                                                                <User className="w-4 h-4" /> My Profile
                                                            </button>
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                logout();
                                                                setShowUserDropdown(false);
                                                            }}
                                                            className="flex items-center gap-3 w-full p-3 px-4 rounded-xl text-red-500 hover:bg-red-50 font-bold text-xs transition-all"
                                                        >
                                                            <ArrowRight className="w-4 h-4" /> Sign Out
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link to="/booking" className="ml-2">
                                    <Button
                                        className="rounded-full px-8 h-12 bg-primary text-white shadow-xl hover:shadow-primary/40 transition-all duration-500 group flex items-center gap-2"
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-widest">Book Now</span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button - Premium Hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            className={`lg:hidden w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all relative z-[110] ${scrolled || isOpen ? 'bg-primary text-white shadow-2xl' : 'bg-white/10 text-white backdrop-blur-md border border-white/10'}`}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                                className="w-7 h-1 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                                className="w-7 h-1 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                                className="w-7 h-1 bg-current rounded-full"
                            />
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Ultra-Premium Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 lg:hidden bg-white z-[105] flex flex-col overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
                            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px]" />
                        </div>

                        <div className="relative z-10 flex flex-col h-full pt-32 p-8 overflow-y-auto">
                            <motion.p
                                variants={itemVariants}
                                className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-12 border-l-2 border-primary pl-4"
                            >
                                Ride Across India
                            </motion.p>

                            <div className="space-y-8">
                                {navLinks.map((link) => (
                                    <motion.div key={link.name} variants={itemVariants}>
                                        <Link
                                            to={link.path}
                                            className="group block"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${location.pathname === link.path ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-primary'}`}>
                                                        <link.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-2xl font-bold tracking-tight transition-colors ${location.pathname === link.path ? 'text-slate-900' : 'text-slate-600 group-hover:text-primary'}`}>
                                                            {link.name}
                                                        </h3>
                                                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">{link.desc}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${location.pathname === link.path ? 'text-primary' : 'text-slate-200 group-hover:text-primary'}`} />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div variants={itemVariants} className="mt-auto pt-12 pb-6 space-y-8">
                                <div className="p-6 rounded-[2rem] bg-slate-900 text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Adventure Awaits</p>
                                        <h4 className="text-lg font-bold mb-4">Ready to start your journey?</h4>
                                        <Link to="/booking">
                                            <Button className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-primary hover:bg-white hover:text-primary transition-all shadow-xl">
                                                Rent A Bike Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-2">
                                    <Link
                                        to="/admin/login"
                                        className="flex items-center gap-2 text-slate-400 font-bold text-[9px] uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        <User className="w-3.5 h-3.5" /> Portal
                                    </Link>
                                    <div className="flex gap-4">
                                        {[1, 2, 3].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                        ))}
                                    </div>
                                    <span className="text-slate-300 font-bold text-[9px] uppercase tracking-widest">Est. 2024</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
