import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = "", footer = false }) => {
    return (
        <Link to="/" className={`flex flex-col items-start leading-none group transition-transform duration-500 hover:scale-105 ${className}`}>
            <div className="flex items-baseline mb-[-2px] md:mb-[-4px]">
                <span className={`font-black italic tracking-tighter text-primary ${footer ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>Wavy</span>
                <span className={`font-black italic tracking-tighter text-primary -ml-0.5 ${footer ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>Go</span>
            </div>
            <div className="bg-primary px-1.5 py-0.5 self-end">
                <span className={`font-bold text-white tracking-[0.1em] uppercase whitespace-nowrap ${footer ? 'text-[7px] md:text-[9px]' : 'text-[5px] md:text-[7px]'}`}>
                    Rent · Ride · Explore
                </span>
            </div>
        </Link>
    );
};

export default Logo;
