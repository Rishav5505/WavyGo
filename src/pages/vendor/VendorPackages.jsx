import React, { useState, useEffect } from 'react';
import { 
    Plus, Search, Edit, Trash2, MapPin, 
    IndianRupee, Bike, Eye, TrendingUp, MoreVertical
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const VendorPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Dynamic vendor info from login session
    const vendorName = localStorage.getItem('vendorName') || "Ram Rentals"; 
    const vendorId = localStorage.getItem('vendorId') || "V1"; 
    const locationName = localStorage.getItem('vendorLocation') || "Delhi";

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            // Simulated: Fetching packages and filtering for this vendor locally for demo
            const { data } = await API.get('/packages');
            // Filter only local bookings/packages if API exists, else use mock
            const filtered = data.filter(p => p.vendorName === vendorName);
            setPackages(filtered);
        } catch (error) {
            console.error("Error fetching vendor packages, using mock", error);
            // Only show mock data for the demo account
            if (vendorName === "Ram Rentals") {
                const mockData = [
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f001",
                        title: "RE Himalayan 450",
                        location: "Delhi",
                        price: 1300,
                        category: "Cruiser",
                        image: "/bikes/himalayan_450.png",
                        status: "Active",
                        views: 452
                    },
                    {
                        _id: "65e5a2e1f1a2b3c4d5e6f111",
                        title: "RE Classic 350",
                        location: "Delhi",
                        price: 1100,
                        category: "Cruiser",
                        image: "/bikes/himalayan.png",
                        status: "Active",
                        views: 289
                    }
                ];
                setPackages(mockData);
            } else {
                setPackages([]); // New vendors start with empty fleet
            }
        } finally {
            setLoading(false);
        }
    };

    const filtered = packages.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Fleet</h1>
                    <p className="text-slate-500 font-medium">You have {packages.length} bikes listed in {locationName}.</p>
                </div>
                <Link to="/vendor/packages/add">
                    <Button className="flex items-center gap-3 rounded-[1.2rem] py-4 bg-slate-950 px-8 shadow-xl hover:bg-primary transition-all">
                        <Plus className="w-5 h-5" /> List New Bike
                    </Button>
                </Link>
            </div>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center font-bold text-slate-400 italic">Loading your bikes...</div>
                ) : filtered.length === 0 ? (
                    <div className="col-span-full py-20 text-center font-bold text-slate-400 italic">No bikes found. Click "List New Bike" to start.</div>
                ) : filtered.map((pkg) => (
                    <div key={pkg._id} className="bg-white rounded-[2.5rem] p-6 border border-emerald-50 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="bg-[#effaf6] text-primary text-[9px] font-black px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-widest">
                                {pkg.status || 'Live'}
                            </span>
                        </div>

                        {/* Image */}
                        <div className="h-44 bg-[#effaf6] rounded-[2rem] mb-6 flex items-center justify-center p-6 transition-colors group-hover:bg-[#d1ede1]">
                            <img src={pkg.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={pkg.title} />
                        </div>

                        {/* Info */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{pkg.title}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{pkg.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div>
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Per Day</p>
                                    <p className="text-xl font-black text-slate-900 flex items-center gap-0.5">
                                        <IndianRupee className="w-4 h-4 text-primary" />{pkg.price}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorPackages;
