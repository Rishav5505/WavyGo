import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, HeartHandshake, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActions = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling Down - Hide
                setIsVisible(false);
            } else {
                // Scrolling Up - Show
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="fixed bottom-6 right-6 z-[60] flex flex-row items-center gap-3"
                >
                    {/* Become a Host Pill - Solid Green */}
                    <Link to="/contact">
                        <button className="h-12 md:h-14 px-6 md:px-8 bg-[#035c3e] text-white border-2 border-[#035c3e] rounded-full shadow-2xl hover:bg-[#02442d] transition-all font-black uppercase tracking-wider text-[10px] md:text-xs">
                            Become a Host
                        </button>
                    </Link>

                    {/* Get App Pill - Solid Green */}
                    <button className="h-12 md:h-14 px-6 md:px-8 bg-[#035c3e] text-white border-2 border-[#035c3e] rounded-full shadow-2xl hover:bg-[#02442d] transition-all font-black uppercase tracking-wider text-[10px] md:text-xs flex items-center gap-2 md:gap-3 group">
                        <div className="relative">
                            <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        Get App
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingActions;
