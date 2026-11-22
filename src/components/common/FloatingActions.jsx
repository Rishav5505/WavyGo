import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, MessageCircle, ChevronUp, Download, Bike } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const FloatingActions = () => {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // Don't show on admin or vendor pages
    const isHiddenRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/vendor');

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

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
        return () => {
             window.removeEventListener('scroll', handleScroll);
             window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, [lastScrollY]);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            handleFallbackInstallClick();
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const handleFallbackInstallClick = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (isIOS) {
            alert('To install WavyGo on iOS:\n\n1. Tap the Share button (square with arrow pointing up) at the bottom.\n2. Scroll down and tap "Add to Home Screen".');
        } else {
            alert('To install WavyGo:\n\nOpen this link directly in Google Chrome. Then tap "Install App" or check the browser menu (⋮) for "Add to Home screen".');
        }
    };

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

    if (isHiddenRoute) return null;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] flex flex-col items-end gap-2.5">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-end gap-2.5"
                    >
                        {/* WhatsApp Chat - Premium Glassmorphism */}
                        <motion.a
                            variants={itemVariants}
                            href="https://wa.me/919508287609"
                            aria-label="Chat with us on WhatsApp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center bg-[#25D366] text-white p-1.5 group-hover:pl-4 rounded-full shadow-premium hover:shadow-[0_12px_32px_-8px_rgba(37,211,102,0.55)] transition-all duration-300"
                        >
                            <span className="text-xs font-semibold overflow-hidden max-w-0 group-hover:max-w-[110px] group-hover:pl-3 group-hover:pr-2 transition-all duration-500 whitespace-nowrap">
                                Chat with us
                            </span>
                            <div className="w-10 h-10 md:w-11 md:h-11 bg-white/15 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>
                        </motion.a>

                        {/* Become a Host - Brand Green */}
                        <motion.div variants={itemVariants}>
                            <Link to="/contact">
                                <button type="button" aria-label="Become a host" className="h-11 w-11 md:w-auto md:px-5 bg-primary text-white rounded-full shadow-premium hover:bg-primary-light hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2">
                                    <Bike className="w-4 h-4" />
                                    <span className="hidden md:inline">Become a Host</span>
                                </button>
                            </Link>
                        </motion.div>

                        {/* Get App - Glass Design / PWA Install */}
                        {deferredPrompt ? (
                            <motion.button 
                                variants={itemVariants}
                                onClick={handleInstallClick}
                                aria-label="Install app"
                                className="h-11 w-11 md:w-auto md:px-5 bg-white/90 backdrop-blur-md text-primary ring-1 ring-primary/10 rounded-full shadow-premium hover:bg-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group"
                            >
                                <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="hidden md:inline">Install App</span>
                            </motion.button>
                        ) : (
                            <motion.button 
                                variants={itemVariants}
                                onClick={handleFallbackInstallClick}
                                aria-label="Get the app"
                                className="h-11 w-11 md:w-auto md:px-5 bg-white/90 backdrop-blur-md text-primary ring-1 ring-primary/10 rounded-full shadow-premium hover:bg-white hover:-translate-y-0.5 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 group"
                            >
                                <Smartphone className="w-4 h-4" />
                                <span className="hidden md:inline">Get App</span>
                            </motion.button>
                        )}
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
                        aria-label="Back to top"
                        className="w-11 h-11 bg-white/90 backdrop-blur-md text-primary rounded-full shadow-premium ring-1 ring-primary/10 flex items-center justify-center hover:bg-[#035c3e] hover:text-white transition-all duration-300 group"
                    >
                        <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingActions;

