import React from 'react';
import { motion } from 'framer-motion';
import partnerBanner from '../../assets/images/list-your-bike.png';

const MobileAppSection = () => {
    return (
        <section className="pt-2 pb-16 md:py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"
            />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-full rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(3,92,62,0.15)] group cursor-pointer border-[8px] border-white"
                >
                    {/* Hover Effect Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/10 z-10 transition-colors duration-500 pointer-events-none"
                    />

                    {/* Image with Inner Navigation Animation */}
                    <div className="overflow-hidden bg-slate-100 flex items-center justify-center">
                        <motion.img
                            initial={{ scale: 1.1, filter: "blur(10px)" }}
                            whileInView={{ scale: 1, filter: "blur(0px)" }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                scale: { duration: 1.5, ease: "easeOut" },
                                filter: { duration: 1 },
                                whileHover: { duration: 1.5, ease: "circOut" }
                            }}
                            src={partnerBanner}
                            alt="List Your Bike - Become a Partner"
                            className="w-full h-auto object-contain block origin-center"
                        />
                    </div>

                    {/* Interactive Badge */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl z-20 border border-white/50 hidden md:flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900">Partner Program Live</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default MobileAppSection;
