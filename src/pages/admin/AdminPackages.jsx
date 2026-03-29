import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, MapPin, IndianRupee, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Button from '../../components/common/Button';

const AdminPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [userRole, setUserRole] = useState('Super Admin'); // 'Super Admin' or 'Vendor'
    const [vendorName, setVendorName] = useState('Ram Rentals');

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const { data } = await API.get('/packages');
            setPackages(data);
        } catch (error) {
            console.error("Error fetching packages, using mock since API didn't provide vendor info", error);
            // Using the new mock data with vendor names
            const mockData = [
                { _id: "1", title: "RE Himalayan 450", location: "Delhi", price: 1300, category: "Cruiser", duration: "24h", vendorName: "Ram Rentals", image: "/bikes/re_himalayan_v2.png" },
                { _id: "2", title: "RE Hunter 350", location: "Delhi", price: 900, category: "Cruiser", duration: "24h", vendorName: "Delhi Motor Hub", image: "/bikes/hunter_350.png" },
                { _id: "3", title: "Yamaha MT-15 V2", location: "Delhi", price: 1100, category: "Sports", duration: "24h", vendorName: "Yamaha Delhi Clan", image: "/bikes/mt15.png" },
                { _id: "4", title: "KTM Duke 390", location: "Delhi", price: 1500, category: "Sports", duration: "24h", vendorName: "Speedsters Delhi", image: "/bikes/ktm_duke_v2.png" },
                { _id: "5", title: "Triumph Speed 400", location: "Bangalore", price: 1800, category: "Premium", duration: "24h", vendorName: "Silicon Valley Scoots", image: "/bikes/triumph_speed400_v2.png" }
            ];
            setPackages(mockData);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            try {
                await API.delete(`/packages/${id}`);
                setPackages(packages.filter(p => p._id !== id));
            } catch (error) {
                alert('Delete failed');
            }
        }
    };

    const filteredPackages = packages.filter(pkg => {
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

        if (userRole === 'Vendor') {
            return matchesSearch && pkg.vendorName === vendorName;
        }
        return matchesSearch;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {userRole === 'Vendor' ? `${vendorName} Dashboard` : 'Global Inventory Management'}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {userRole === 'Vendor' ? `Manage your fleet in ${filteredPackages[0]?.location || 'Delhi'}` : 'Manage all 10+ vendors across WavyGo.'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        className="bg-[#effaf6] border border-emerald-100/50 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <option value="Super Admin">System Admin</option>
                        <option value="Vendor">Vendor View</option>
                    </select>
                    <Link to="/admin/packages/add">
                        <Button className="flex items-center gap-2 rounded-xl py-4">
                            <Plus className="w-5 h-5" /> Add New Package
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-[#f8fefc] rounded-[1.5rem] md:rounded-[2.5rem] border border-emerald-100 shadow-sm overflow-hidden">
                <div className="p-5 md:p-8 border-b border-emerald-50 flex flex-col md:flex-row gap-6 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search packages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#effaf6] border border-emerald-100/50 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                <th className="px-8 py-6">Package</th>
                                <th className="px-8 py-6">Location</th>
                                {userRole === 'Super Admin' && <th className="px-8 py-6">Vendor</th>}
                                <th className="px-8 py-6">Price</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        Loading packages...
                                    </td>
                                </tr>
                            ) : filteredPackages.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center text-slate-400 italic">
                                        No packages found.
                                    </td>
                                </tr>
                            ) : filteredPackages.map((pkg) => (
                                <tr key={pkg._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                                                <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 leading-tight">{pkg.title}</p>
                                                <p className="text-xs font-medium text-slate-400 mt-1">{pkg.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-slate-300" /> {pkg.location}
                                        </div>
                                    </td>
                                    {userRole === 'Super Admin' && (
                                        <td className="px-8 py-6">
                                            <div className="bg-emerald-50 text-primary text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100/50 inline-block uppercase tracking-wider">
                                                {pkg.vendorName}
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-8 py-6 font-bold text-slate-900">
                                        <div className="flex items-center gap-1">
                                            <IndianRupee className="w-4 h-4 text-slate-300" /> {pkg.price.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="relative group/menu flex justify-end">
                                            <button className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-lg transition-all peer">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {/* Beautiful Animated Dropdown */}
                                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#f8fefc] rounded-2xl shadow-2xl border border-emerald-100 p-2 z-20 opacity-0 invisible translate-y-2 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-300">
                                                <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 rounded-xl text-sm font-bold text-slate-700 transition-colors">
                                                    <Edit className="w-4 h-4 text-primary" /> Edit Details
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pkg._id)}
                                                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-rose-50 rounded-xl text-sm font-bold text-rose-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" /> Delete Forever
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View Card Layout */}
                <div className="md:hidden divide-y divide-slate-50">
                    {loading ? (
                        <div className="p-10 text-center text-slate-400 italic">Synchronizing...</div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="p-10 text-center text-slate-400 italic">No inventory found.</div>
                    ) : filteredPackages.map((pkg) => (
                        <div key={pkg._id} className="p-5 space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                                    <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="min-w-0">
                                    <p className="font-bold text-slate-900 leading-tight truncate">{pkg.title}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{pkg.category}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Price</p>
                                    <p className="font-bold text-slate-900 flex items-center gap-1 text-sm">
                                        <IndianRupee className="w-3 h-3 text-slate-400" /> {pkg.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">Duration</p>
                                    <p className="font-bold text-slate-600 flex items-center gap-1 text-sm">
                                        <Clock className="w-3 h-3 text-slate-400" /> {pkg.duration}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                    <MapPin className="w-3.5 h-3.5 text-primary/50" /> {pkg.location}
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl hover:text-primary transition-all">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg._id)}
                                        className="w-10 h-10 flex items-center justify-center text-slate-400 bg-rose-50 rounded-xl hover:text-rose-500 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminPackages;
