import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bike, Navigation } from 'lucide-react';
import Reveal from './Reveal';

const TripCalculator = () => {
    const bikes = [
        { name: "Royal Enfield Himalayan", rate: 1500, mileage: 30, type: "Adventure" },
        { name: "KTM 390 Adventure", rate: 1800, mileage: 28, type: "Adventure" },
        { name: "Harley Cruiser (Super Meteor)", rate: 3000, mileage: 20, type: "Cruiser" },
        { name: "Honda Activa / Commuter", rate: 450, mileage: 45, type: "Commuter" }
    ];

    const [selectedBikeIdx, setSelectedBikeIdx] = useState(0);
    const [distance, setDistance] = useState(300); // KMs
    const [days, setDays] = useState(3); // Days

    const bike = bikes[selectedBikeIdx];
    const fuelPrice = 100; // Rs per Liter

    // Calculations
    const bikeRentalCost = bike.rate * days;
    const fuelNeeded = distance / bike.mileage;
    const bikeFuelCost = Math.round(fuelNeeded * fuelPrice);
    const totalBikeCost = bikeRentalCost + bikeFuelCost;

    const cabRatePerKm = 14;
    const cabDriverAllowance = 350;
    const cabBaseFare = 800;
    const totalCabCost = Math.round((distance * cabRatePerKm) + (days * cabDriverAllowance) + cabBaseFare);

    const savings = Math.max(0, totalCabCost - totalBikeCost);
    const savingsPercent = totalCabCost > 0 ? Math.round((savings / totalCabCost) * 100) : 0;

    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-[#f0faf7] to-slate-50 selection:bg-primary selection:text-white">
            {/* Soft decorative background glows */}
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 bg-primary/20 pointer-events-none z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full blur-[120px] opacity-10 bg-yellow-500/10 pointer-events-none z-0"></div>

            <div className="container-custom relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <Reveal center>
                        <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 block">
                            Trip Budget Planner
                        </span>
                    </Reveal>
                    <Reveal center>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter leading-none mb-4">
                            Rent & <span className="text-primary">Save Big</span>
                        </h2>
                    </Reveal>
                    <Reveal center>
                        <p className="text-slate-500 font-medium text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
                            Compare the cost of renting your dream adventure machine vs booking a taxi. The numbers speak for themselves.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch max-w-6xl mx-auto">
                    {/* Left Column: Sliders */}
                    <div className="lg:col-span-6 bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm flex flex-col justify-between">
                        <div className="space-y-8">
                            {/* Bike Selector */}
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">
                                    1. Choose Your Ride
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedBikeIdx}
                                        onChange={(e) => setSelectedBikeIdx(Number(e.target.value))}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold text-slate-800 focus:outline-none focus:border-primary/30 appearance-none cursor-pointer"
                                    >
                                        {bikes.map((b, idx) => (
                                            <option key={idx} value={idx}>
                                                {b.name} ({b.type}) - ₹{b.rate}/day
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">
                                        ▼
                                    </div>
                                </div>
                            </div>

                            {/* Distance Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        2. Estimated Distance
                                    </label>
                                    <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                                        {distance} km
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="1200"
                                    step="50"
                                    value={distance}
                                    onChange={(e) => setDistance(Number(e.target.value))}
                                    className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-2">
                                    <span>50 KM</span>
                                    <span>600 KM</span>
                                    <span>1200 KM</span>
                                </div>
                            </div>

                            {/* Duration Slider */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        3. Trip Duration
                                    </label>
                                    <span className="text-sm font-black text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                                        {days} {days === 1 ? 'Day' : 'Days'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="14"
                                    step="1"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                    className="w-full accent-primary h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-2">
                                    <span>1 DAY</span>
                                    <span>7 DAYS</span>
                                    <span>14 DAYS</span>
                                </div>
                            </div>
                        </div>

                        {/* Extra Spec Info */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-400 text-xs font-semibold">
                            <Bike className="w-5 h-5 text-primary" />
                            <span>
                                {bike.name} delivers around <strong>{bike.mileage} km/l</strong> mileage.
                            </span>
                        </div>
                    </div>

                    {/* Right Column: Calculations & Comparison */}
                    <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                        {/* Comparison Panels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            {/* WavyGo Column */}
                            <div className="bg-[#023e2a] border border-[#035c3e]/30 rounded-[2rem] p-6 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                                <div>
                                    <span className="bg-white/10 text-emerald-300 border border-white/10 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-4">
                                        WavyGo Ride
                                    </span>
                                    <h4 className="text-3xl font-black mb-1">
                                        ₹{totalBikeCost.toLocaleString('en-IN')}
                                    </h4>
                                    <p className="text-[10px] text-emerald-200/60 font-bold uppercase tracking-wider mb-6">
                                        Total Self-Drive Cost
                                    </p>
                                </div>

                                <div className="space-y-2.5 text-xs border-t border-white/10 pt-4 font-semibold text-emerald-100/80">
                                    <div className="flex justify-between">
                                        <span>Rental Fee:</span>
                                        <span>₹{bikeRentalCost}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Est. Fuel Cost:</span>
                                        <span>₹{bikeFuelCost}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Outstation Cab Column */}
                            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col justify-between shadow-sm text-slate-850">
                                <div>
                                    <span className="bg-slate-100 text-slate-500 text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full inline-block mb-4">
                                        Outstation Cab
                                    </span>
                                    <h4 className="text-3xl font-black mb-1 text-slate-500">
                                        ₹{totalCabCost.toLocaleString('en-IN')}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-6">
                                        Standard Taxi Estimate
                                    </p>
                                </div>

                                <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4 font-semibold text-slate-500">
                                    <div className="flex justify-between">
                                        <span>Cab Fare (Base):</span>
                                        <span>₹{distance * cabRatePerKm}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Driver Allowance:</span>
                                        <span>₹{days * cabDriverAllowance}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Savings Panel */}
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-[2rem] p-6 text-slate-900 shadow-md flex items-center justify-between gap-6 relative overflow-hidden group">
                            {/* Decorative design grid */}
                            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 0.5px, transparent 0)', backgroundSize: '10px 10px' }}></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-950/60 mb-1">
                                    Total Savings
                                </h3>
                                <p className="text-2xl md:text-3xl font-black tracking-tight text-slate-950 leading-none">
                                    Save ₹{savings.toLocaleString('en-IN')}!
                                </p>
                            </div>

                            <div className="bg-slate-950 text-white rounded-2xl px-4 py-3 text-center shrink-0 min-w-[70px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <span className="block text-[10px] font-black tracking-widest uppercase text-yellow-400">Save</span>
                                <span className="text-xl md:text-2xl font-black leading-none">{savingsPercent}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TripCalculator;
