import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Chakrata from './pages/Chakrata';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import Packages from './pages/Packages';
import DestinationDetails from './pages/DestinationDetails';
import BikeDetails from './pages/BikeDetails';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';

import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingActions from './components/common/FloatingActions';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPackages from './pages/admin/AdminPackages';
import AddBike from './pages/admin/AddBike';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVendors from './pages/admin/AdminVendors';
import AdminFinancials from './pages/admin/AdminFinancials';

// Vendor Pages
import VendorLayout from './components/vendor/VendorLayout';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorPackages from './pages/vendor/VendorPackages';
import VendorBookings from './pages/vendor/VendorBookings';
import VendorSettings from './pages/vendor/VendorSettings';
import VendorInsights from './pages/vendor/VendorInsights';
import VendorEarnings from './pages/vendor/VendorEarnings';
import VendorProfile from './pages/vendor/VendorProfile';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Shorter loader for a snappier feel
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="antialiased text-slate-900 bg-white min-h-screen relative">
          <AnimatePresence mode="wait">
            {loading && <Loader key="loader" />}
          </AnimatePresence>

          {!loading && (
            <>
              <FloatingActions />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chakrata" element={<Chakrata />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
                <Route path="/bike/:id" element={<BikeDetails />} />
                <Route
                  path="/booking"
                  element={
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/packages" element={<Packages />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="packages" element={<AdminPackages />} />
                  <Route path="packages/add" element={<AddBike />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="vendors" element={<AdminVendors />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="financials" element={<AdminFinancials />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Vendor Routes */}
                <Route path="/vendor" element={<VendorLayout />}>
                  <Route index element={<VendorDashboard />} />
                  <Route path="dashboard" element={<VendorDashboard />} />
                  <Route path="packages" element={<VendorPackages />} />
                  <Route path="packages/add" element={<AddBike />} />
                  <Route path="bookings" element={<VendorBookings />} />
                  <Route path="insights" element={<VendorInsights />} />
                  <Route path="earnings" element={<VendorEarnings />} />
                  <Route path="profile" element={<VendorProfile />} />
                  <Route path="settings" element={<VendorSettings />} />
                </Route>
              </Routes>


            </>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
