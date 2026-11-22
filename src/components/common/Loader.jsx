import React, { useEffect, useState } from 'react';

/**
 * Brief branded intro shown on first load.
 * Pure CSS so it can never get stuck covering the page, and it stops
 * capturing clicks the moment it starts fading out.
 */
const Loader = ({ visible = true }) => {
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        if (visible) return undefined;
        const t = setTimeout(() => setMounted(false), 600);
        return () => clearTimeout(t);
    }, [visible]);

    if (!mounted) return null;

    return (
        <div
            aria-hidden="true"
            className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#021f15] transition-opacity duration-500 ease-premium ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_60%)]" />

            <div className="relative flex flex-col items-center">
                <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
                    Wavy<span className="text-emerald-400">Go</span>
                </h2>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-100/60">
                    Rent · Ride · Explore
                </p>

                <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-emerald-400 to-secondary animate-loader-bar" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
