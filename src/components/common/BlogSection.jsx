import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

import blog1Img from '../../assets/blog-1.jpg';
import blog2Img from '../../assets/blog-2.jpg';

const blogs = [
    {
        id: 1,
        date: "July 30, 2025",
        title: "Top 10 Bike Routes for Weekend Getaways",
        desc: "Discover the best bike-friendly routes for your next short adventure.",
        img: blog1Img
    },
    {
        id: 2,
        date: "July 28, 2025",
        title: "Why Renting a Bike is the New Travel Trend",
        desc: "Explore how renting two-wheelers is reshaping urban mobility.",
        img: blog2Img
    },
    {
        id: 3,
        date: "July 25, 2025",
        title: "WavyGo Host Experience: Earn While You Park",
        desc: "Learn how vehicle owners are earning passive income with WavyGo.",
        img: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800"
    }
];

const BlogSection = () => {
    return (
        <section className="pt-20 pb-8 md:py-20 bg-gradient-to-b from-white to-[#f0f9f6] relative overflow-hidden">
            <div className="container-custom">
                <div className="text-center mb-12 md:mb-16 px-4">
                    <Reveal center>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight md:leading-none mb-4">
                            Explore Our <span className="text-primary">Latest Blogs</span>
                        </h2>
                        <p className="text-slate-500 font-medium uppercase tracking-[0.1em] md:tracking-[0.2em] text-[9px] md:text-[10px] whitespace-normal">
                            Stay updated with the newest trends and stories from the world of two‑wheelers.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-gradient-to-br from-[#d1ede1] to-[#f0f9f6] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group border border-[#035c3e]/10"
                        >
                            <div className="relative w-full h-40 md:h-48 overflow-hidden">
                                <img
                                    src={blog.img}
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                    alt={blog.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                            </div>

                            <div className="p-3 md:p-8 flex flex-col h-full">
                                <div className="flex-grow">
                                    <span className="text-primary font-bold uppercase tracking-wider text-[7px] md:text-[10px] mb-1 md:mb-2 block">
                                        {blog.date}
                                    </span>
                                    <h3 className="text-[11px] md:text-xl font-extrabold text-slate-900 mb-1 md:mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-3 md:line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium text-[9px] md:text-base leading-snug md:leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                                        {blog.desc}
                                    </p>
                                </div>
                                <button className="w-fit bg-primary/10 text-primary font-bold px-3 md:px-6 py-1.5 md:py-2.5 rounded-md md:rounded-xl text-[8px] md:text-base hover:bg-primary hover:text-white transition-all inline-flex items-center gap-1 md:gap-2">
                                    Read More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Dots (as seen in screenshot) */}
                <div className="flex justify-center items-center gap-3 mt-8 md:mt-16">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">1</div>
                    <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-300 transition-all cursor-pointer">2</div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
