import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBar = () => {
    return (
        <div className="bg-[#035c3e] py-2 relative overflow-hidden flex items-center border-b border-white/5 h-10">
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .marquee-container {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }
                .marquee-container:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div className="marquee-container">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 px-8 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-secondary fill-secondary" />
                            <span>Flat 20% Off on Group Bookings for March</span>
                        </div>
                        <Link to="/booking" className="flex items-center gap-1.5 text-secondary hover:text-white transition-colors font-bold whitespace-nowrap">
                            Book Now <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-white/20">|</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnouncementBar;
