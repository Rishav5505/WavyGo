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
import AddPackage from './pages/admin/AddPackage';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSettings from './pages/admin/AdminSettings';

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
                  <Route path="packages/add" element={<AddPackage />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="settings" element={<AdminSettings />} />
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
