import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", footer = false, light = false }) => {
    const onDark = footer || light;
    // Colors and sizing
    const primaryColor = onDark ? 'text-white' : 'text-emerald-900';
    const tagBg = onDark ? 'bg-white' : 'bg-emerald-900';
    const tagText = onDark ? 'text-[#035c3e]' : 'text-white';

    return (
        <Link to="/" className={`flex flex-col items-start leading-none group transition-all duration-300 hover:scale-105 ${className}`}>
            {/* Main Brand Name - WavyGo (Reduced weight & scale) */}
            <h1 className={`font-bold tracking-tight transition-colors duration-300 ${primaryColor} ${footer ? 'text-2xl md:text-3xl' : 'text-2xl md:text-4xl'}`}>
                WavyGo
            </h1>
            
            {/* Tagline Box - Rent Ride Explore (Clean & Pro) */}
            <div className={`mt-0.5 md:mt-1 ${tagBg} px-2 py-0.5 md:px-3 md:py-1 self-start`}>
                <span className={`font-bold uppercase tracking-[0.15em] whitespace-nowrap ${tagText} ${footer ? 'text-[10px] md:text-[10px]' : 'text-[10px] md:text-[10px]'}`}>
                    Rent · Ride · Explore
                </span>
            </div>
        </Link>
    );
};

export default Logo;
