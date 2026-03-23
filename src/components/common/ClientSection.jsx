import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const clients = [
    {
        id: 1,
        name: "NASA",
        logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/400px-NASA_logo.svg.png",
    },
    {
        id: 2,
        name: "Surat Municipal Corporation",
        logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Surat_Municipal_Corporation_2023.svg/400px-Surat_Municipal_Corporation_2023.svg.png",
    },
    {
        id: 3,
        name: "TIECON",
        logo: "https://images.weserv.nl/?url=tievadodara.com/wp-content/themes/tie-vadodara/assets/images/logo.png",
    },
    {
        id: 4,
        name: "Saurashtra University",
        logo: "https://images.weserv.nl/?url=www.saurashtrauniversity.ac.in/img/logo.png&w=400",
    },
    {
        id: 5,
        name: "Google",
        logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/400px-Google_2015_logo.svg.png",
    },
    {
        id: 6,
        name: "IIM Ahmedabad",
        logo: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/1/1f/IIM-A_text_logo.svg/800px-IIM-A_text_logo.svg.png",
    }
];

// Duplicate for seamless loop
const allClients = [...clients, ...clients, ...clients];

const ClientSection = () => {
    return (
        <section className="py-14 md:py-24 bg-[#f0faf0] relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-8 left-[5%] opacity-15 pointer-events-none transform -rotate-12">
                <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
                    <path d="M30 45C22 45 15 39 15 30C15 22 21 16 29 15C32 9 40 6 48 6C58 6 66 14 66 23C74 23 82 29 82 38C82 46 75 53 66 53H34" stroke="#035c3e" strokeWidth="2" />
                </svg>
            </div>

            <div className="max-w-[1920px] mx-auto relative z-10">
                <div className="text-center mb-10 md:mb-16 px-4">
                    <Reveal center>
                        <p className="text-primary font-bold transition-all duration-300 uppercase tracking-[0.4em] text-[9px] md:text-[11px] mb-3 block opacity-80">
                            The WavyGo Network
                        </p>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none uppercase">
                            Our Valued <span className="text-primary">Partners</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="relative w-full overflow-hidden">
                    {/* Cinematic Gradient Fades */}
                    <div className="absolute inset-y-0 left-0 w-28 md:w-56 bg-gradient-to-r from-[#f0faf0] via-[#f0faf0]/75 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-28 md:w-56 bg-gradient-to-l from-[#f0faf0] via-[#f0faf0]/75 to-transparent z-20 pointer-events-none"></div>

                    <motion.div
                        className="flex gap-4 md:gap-10 w-max px-4"
                        animate={{ x: [0, -100 * clients.length * 2] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {allClients.map((client, i) => (
                            <div
                                key={`${client.id}-${i}`}
                                className="w-[160px] md:w-[280px] h-24 md:h-44 bg-white rounded-[1.8rem] md:rounded-[3rem] p-6 md:p-10 flex items-center justify-center shadow-xl shadow-emerald-900/5 border border-white/50 hover:border-primary/20 transition-all duration-500 flex-shrink-0 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-w-full max-h-full object-contain transition-all duration-700 transform group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ClientSection;
