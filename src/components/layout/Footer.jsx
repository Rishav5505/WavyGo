import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#035c3e] text-white pt-8 md:pt-16 pb-6 md:pb-8 relative font-sans overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-8 mb-8 md:mb-12">
                    {/* Brand & Address Section */}
                    <div className="md:col-span-4 flex flex-col items-start gap-4 md:gap-6">
                        <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105">
                            <div className="flex items-baseline">
                                <span className="font-black italic tracking-tighter text-2xl md:text-4xl text-white">Wavy</span>
                                <span className="font-black italic tracking-tighter text-2xl md:text-4xl text-white -ml-0.5">Go</span>
                            </div>
                            <div className="mt-1">
                                <span className="bg-white text-[#035c3e] px-1.5 py-0.5 text-[7px] md:text-[9px] font-black uppercase tracking-widest leading-none">
                                    Rent · Ride · Explore
                                </span>
                            </div>
                        </Link>

                        <div className="max-w-sm">
                            <p className="text-white/70 font-medium text-[10px] md:text-xs leading-relaxed max-w-[250px]">
                                C/o- Ramchandra Mehta, Ward No-08, Bishunpur, Supaul-852215, Bihar
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 md:col-span-4 gap-8">
                        {/* Company Section */}
                        <div className="md:col-span-2">
                            <h4 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 border-b border-white/20 pb-1.5 w-fit">Company</h4>
                            <ul className="space-y-2 text-white/80 font-medium text-[11px] md:text-sm">
                                <li><Link to="/about" className="hover:opacity-70 transition-opacity">About Us</Link></li>
                                <li><Link to="/contact" className="hover:opacity-70 transition-opacity">Contact Us</Link></li>
                                <li><Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:opacity-70 transition-opacity">Terms</Link></li>
                            </ul>
                        </div>

                        {/* Follow Us Section */}
                        <div className="md:col-span-2">
                            <h4 className="text-white font-black uppercase tracking-widest text-[10px] md:text-xs mb-4 md:mb-6 border-b border-white/20 pb-1.5 w-fit">Follow Us</h4>
                            <div className="flex gap-2.5">
                                {[
                                    { Icon: Instagram, link: "#" },
                                    { Icon: Facebook, link: "#" },
                                    { Icon: Linkedin, link: "#" }
                                ].map((item, i) => (
                                    <a key={i} href={item.link} className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#035c3e] transition-all shadow-md">
                                        <item.Icon className="w-3.5 h-3.5 fill-current" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile App Section */}
                    <div className="md:col-span-4 md:pl-8 flex flex-col justify-start">
                        <h4 className="text-white text-xl md:text-3xl font-black leading-tight mb-4 md:mb-6 tracking-tight">
                            WavyGo Mobile App
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            <a href="#" className="transition-transform hover:scale-105">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="App Store"
                                    className="h-8 md:h-10 w-auto rounded-md"
                                />
                            </a>
                            <a href="#" className="transition-transform hover:scale-105">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Play Store"
                                    className="h-8 md:h-10 w-auto rounded-md"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-5 border-t border-white/5 text-center">
                    <p className="text-white/60 font-medium text-[9px] md:text-[10px] tracking-tight">
                        © 2025 WavyGo. All rights Reserved.
                    </p>
                </div>
            </div>


        </footer>
    );
};

export default Footer;
