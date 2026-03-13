import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, MessageCircle, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActions = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide based on scroll direction
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false); // Hide on scroll down
            } else {
                setIsVisible(true); // Show on scroll up
            }

            // Show scroll-to-top after 500px
            setShowScrollTop(currentScrollY > 500);
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: { 
            opacity: 0, 
            y: 50,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.8, y: 20 }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-end gap-3"
                    >
                        {/* WhatsApp Chat - Premium Glassmorphism */}
                        <motion.a
                            variants={itemVariants}
                            href="https://wa.me/91XXXXXXXXXX" // Replace with actual number
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-[#25D366] text-white pl-5 pr-2 py-2 rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest overflow-hidden max-w-0 group-hover:max-w-[100px] transition-all duration-500 whitespace-nowrap">
                                Chat with us
                            </span>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>
                        </motion.a>

                        {/* Become a Host - Brand Green */}
                        <motion.div variants={itemVariants}>
                            <Link to="/contact">
                                <button className="h-12 md:h-14 px-6 md:px-8 bg-[#035c3e] text-white border-2 border-[#035c3e]/20 rounded-full shadow-2xl hover:bg-[#02442d] hover:scale-105 active:scale-95 transition-all font-black uppercase tracking-widest text-[10px] md:text-xs">
                                    Become a Host
                                </button>
                            </Link>
                        </motion.div>

                        {/* Get App - Glass Design */}
                        <motion.button 
                            variants={itemVariants}
                            className="h-12 md:h-14 px-6 md:px-8 bg-white/80 backdrop-blur-md text-[#035c3e] border-2 border-[#035c3e]/10 rounded-full shadow-xl hover:bg-white hover:border-[#035c3e]/30 transition-all font-black uppercase tracking-wider text-[10px] md:text-xs flex items-center gap-3 group"
                        >
                            <Smartphone className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                            Get App
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Separate Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-md text-[#035c3e] rounded-full shadow-2xl border border-[#035c3e]/10 flex items-center justify-center hover:bg-[#035c3e] hover:text-white transition-all duration-300 group"
                    >
                        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActions;

