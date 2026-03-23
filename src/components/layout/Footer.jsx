import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#035c3e] text-white pt-12 md:pt-16 pb-8 md:pb-8 relative font-sans">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-y-0 md:gap-x-8 mb-10 md:mb-12">
                    {/* Brand & Address Section */}
                    <div className="md:col-span-4 flex flex-col items-start gap-5 md:gap-6">
                        <Link to="/" className="inline-block group transition-transform duration-500 hover:scale-105">
                            <div className="flex items-baseline">
                                <span className="font-black italic tracking-tighter text-4xl text-white">Wavy</span>
                                <span className="font-black italic tracking-tighter text-4xl text-white -ml-0.5">Go</span>
                            </div>
                            <div className="mt-1.5">
                                <span className="bg-white text-[#035c3e] px-2 py-0.5 text-[8px] md:text-[9px] font-black uppercase tracking-widest leading-none">
                                    Rent · Ride · Explore
                                </span>
                            </div>
                        </Link>

                        <div className="max-w-sm">
                            <p className="text-white/80 font-medium text-xs md:text-xs leading-relaxed max-w-[280px]">
                                C/o- Ramchandra Mehta, Ward No-08, Bishunpur, Daullatpur, Raghopur, Supaul-852215, Bihar
                            </p>
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="md:col-span-2 mt-8 md:mt-0">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-5 md:mb-6 border-b-2 border-white/20 pb-2 w-fit">Company</h4>
                        <ul className="space-y-2.5 text-white/90 font-medium text-sm md:text-sm">
                            <li><Link to="/about" className="hover:opacity-70 transition-opacity">About Us</Link></li>
                            <li><Link to="/contact" className="hover:opacity-70 transition-opacity">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:opacity-70 transition-opacity">Terms & Condition</Link></li>
                            <li><Link to="/blogs" className="hover:opacity-70 transition-opacity">Blogs</Link></li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div className="md:col-span-2 mt-8 md:mt-0">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-5 md:mb-6 border-b-2 border-white/20 pb-2 w-fit">Follow Us</h4>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, link: "#" },
                                { Icon: Facebook, link: "#" },
                                { Icon: Linkedin, link: "#" },
                                { Icon: MessageCircle, link: "#" }
                            ].map((item, i) => (
                                <a key={i} href={item.link} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#035c3e] hover:scale-110 transition-transform shadow-md">
                                    <item.Icon className="w-4 h-4 fill-current" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Mobile App Section */}
                    <div className="md:col-span-4 md:pl-8 mt-8 md:mt-0 flex flex-col justify-start">
                        <h4 className="text-white text-3xl md:text-3xl font-black leading-[1.1] mb-5 md:mb-6 tracking-tight">
                            WavyGo - Bike <br />
                            Rental Mobile <br />
                            Application
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <a href="#" className="transition-transform hover:scale-105">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                    alt="Download on the App Store"
                                    className="h-10 w-auto shadow-lg rounded-lg transition-all"
                                />
                            </a>
                            <a href="#" className="transition-transform hover:scale-105">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Get it on Google Play"
                                    className="h-10 w-auto shadow-lg rounded-lg transition-all"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Bar */}
                <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-white/90 font-bold text-xs tracking-tight">
                        @ Copyright 2025 wavyGo. All rights Reserved.
                    </p>
                </div>
            </div>


        </footer>
    );
};

export default Footer;
