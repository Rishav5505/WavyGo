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
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <Reveal center>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
                            Explore Our <span className="text-primary">Latest Blogs</span>
                        </h2>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all group border border-slate-100"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={blog.img}
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                    alt={blog.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="p-8">
                                <span className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-3 block">
                                    {blog.date}
                                </span>
                                <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                                    {blog.desc}
                                </p>
                                <button className="bg-primary/10 text-primary font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-primary hover:text-white transition-all">
                                    Read More
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Dots (as seen in screenshot) */}
                <div className="flex justify-center items-center gap-3 mt-16">
                    <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">1</div>
                    <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm hover:bg-slate-300 transition-all cursor-pointer">2</div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
