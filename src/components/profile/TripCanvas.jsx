import React, { useState } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Camera, Bike, Trash2, Plus, GripVertical, Image as ImageIcon, Map as MapIcon, Save, Sparkles } from 'lucide-react';

const MOCK_BIKES = [
    { id: 'b1', name: 'RE Himalayan', image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/183389/classic-350-right-side-view-50.jpeg?q=80' },
    { id: 'b2', name: 'KTM Duke 390', image: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/148323/duke-390-right-side-view-14.png?q=80' },
    { id: 'b3', name: 'Triumph Speed 400', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=400' }
];

const TripCanvas = () => {
    const [elements, setElements] = useState([
        { id: 'e1', type: 'destination', title: 'Manali, HP', date: 'June 12, 2024', x: 50, y: 50 },
        { id: 'e2', type: 'bike', ...MOCK_BIKES[0], x: 300, y: 120 },
        { id: 'e3', type: 'photo', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400', x: 150, y: 250 }
    ]);

    const addElement = (type, data = {}) => {
        const newEl = {
            id: Date.now().toString(),
            type,
            x: Math.random() * 200 + 50,
            y: Math.random() * 200 + 50,
            ...data
        };
        setElements([...elements, newEl]);
    };

    const removeElement = (id) => {
        setElements(elements.filter(el => el.id !== id));
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h2 className="text-lg md:text-2xl font-black uppercase italic tracking-tight text-slate-900 flex items-center gap-2">
                        Trip <span className="text-primary">Canvas</span> <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-500 animate-pulse" />
                    </h2>
                    <p className="text-[9px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Drag, Drop & Design your next adventure moodboard.</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                    <div className="flex gap-2 flex-grow lg:flex-grow-0">
                        <button onClick={() => addElement('destination', { title: 'New Stop', date: 'Select Date' })} className="flex-1 lg:flex-none p-2.5 md:p-3 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-primary hover:border-primary transition-all shadow-sm">
                            <MapPin size={16} />
                        </button>
                        <button onClick={() => addElement('bike', MOCK_BIKES[0])} className="flex-1 lg:flex-none p-2.5 md:p-3 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-primary hover:border-primary transition-all shadow-sm">
                            <Bike size={16} />
                        </button>
                        <button onClick={() => addElement('photo', { url: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=400' })} className="flex-1 lg:flex-none p-2.5 md:p-3 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-primary hover:border-primary transition-all shadow-sm">
                            <Camera size={16} />
                        </button>
                    </div>
                    <button className="w-full lg:w-auto px-4 md:px-6 py-2.5 md:py-3 bg-slate-950 text-white rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
                        <Save size={14} /> Save Canvas
                    </button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="relative w-full h-[450px] md:h-[600px] bg-[#f8fafc] rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-slate-200 overflow-hidden shadow-inner">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#035c3e 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <AnimatePresence>
                    {elements.map((el) => (
                        <motion.div
                            key={el.id}
                            drag
                            dragMomentum={false}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute cursor-grab active:cursor-grabbing z-10 group"
                            style={{ left: el.x, top: el.y }}
                        >
                            {el.type === 'destination' && (
                                <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 min-w-[180px] relative">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                                        <MapPin size={14} />
                                    </div>
                                    <button onClick={() => removeElement(el.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-100 rounded-full flex items-center justify-center text-rose-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={12} />
                                    </button>
                                    <input className="font-black text-slate-900 border-none p-0 focus:ring-0 text-sm bg-transparent w-full" defaultValue={el.title} />
                                    <div className="flex items-center gap-2 mt-2 text-slate-400">
                                        <Calendar size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{el.date}</span>
                                    </div>
                                </div>
                            )}

                            {el.type === 'bike' && (
                                <div className="bg-slate-900 p-2 rounded-[2rem] shadow-2xl overflow-hidden w-48 relative">
                                    <button onClick={() => removeElement(el.id)} className="absolute top-2 right-2 w-8 h-8 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={12} />
                                    </button>
                                    <div className="bg-white rounded-[1.5rem] p-4 flex flex-col items-center">
                                        <div className="h-24 w-full flex items-center justify-center">
                                            <img src={el.image} alt={el.name} className="h-full object-contain" />
                                        </div>
                                        <p className="mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{el.name}</p>
                                    </div>
                                </div>
                            )}

                            {el.type === 'photo' && (
                                <div className="p-2 bg-white rounded-xl shadow-lg rotate-3 group-hover:rotate-0 transition-transform w-40 relative">
                                    <button onClick={() => removeElement(el.id)} className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                        <Trash2 size={10} />
                                    </button>
                                    <img src={el.url} className="rounded-lg w-full h-32 object-cover" />
                                    <div className="pt-2 pb-1 text-center font-handwriting text-slate-400 text-xs italic">Adventure Vibes</div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {elements.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                        <MapIcon size={64} className="mb-4 opacity-20" />
                        <p className="text-sm font-bold uppercase tracking-widest">Canvas is empty. Add elements to start planning.</p>
                    </div>
                )}
            </div>
            
            <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                <p className="text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] leading-relaxed">
                    Tip: Bhai, elements ko drag karke apni trip ka moodboard banaiye. Save karne ke baad ye aapke profile me "Saved Journeys" me dikhega.
                </p>
            </div>
        </div>
    );
};

export default TripCanvas;
