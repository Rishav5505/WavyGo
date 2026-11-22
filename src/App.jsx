import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import API from './utils/api';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loader from './components/common/Loader';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingActions from './components/common/FloatingActions';
import { AuthProvider } from './context/AuthContext';

// Public pages (code-split so the home page loads fast)
const Chakrata = lazy(() => import('./pages/Chakrata'));
const Booking = lazy(() => import('./pages/Booking'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Packages = lazy(() => import('./pages/Packages'));
const DestinationDetails = lazy(() => import('./pages/DestinationDetails'));
const BikeDetails = lazy(() => import('./pages/BikeDetails'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Auth = lazy(() => import('./pages/Auth'));
const Profile = lazy(() => import('./pages/Profile'));

// Admin pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminPackages = lazy(() => import('./pages/admin/AdminPackages'));
const AddBike = lazy(() => import('./pages/admin/AddBike'));
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminVendors = lazy(() => import('./pages/admin/AdminVendors'));
const AdminFinancials = lazy(() => import('./pages/admin/AdminFinancials'));
const AdminNotifications = lazy(() => import('./pages/admin/AdminNotifications'));
const AdminCities = lazy(() => import('./pages/admin/AdminCities'));
const AdminSupport = lazy(() => import('./pages/admin/AdminSupport'));
const AdminTestimonials = lazy(() => import('./pages/admin/AdminTestimonials'));
const AdminCoupons = lazy(() => import('./pages/admin/AdminCoupons'));

// Vendor pages
const VendorLayout = lazy(() => import('./components/vendor/VendorLayout'));
const VendorDashboard = lazy(() => import('./pages/vendor/VendorDashboard'));
const VendorPackages = lazy(() => import('./pages/vendor/VendorPackages'));
const VendorBookings = lazy(() => import('./pages/vendor/VendorBookings'));
const VendorSettings = lazy(() => import('./pages/vendor/VendorSettings'));
const VendorInsights = lazy(() => import('./pages/vendor/VendorInsights'));
const VendorEarnings = lazy(() => import('./pages/vendor/VendorEarnings'));
const VendorProfile = lazy(() => import('./pages/vendor/VendorProfile'));

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-10 h-10 rounded-full border-2 border-primary/15 border-t-primary animate-spin" />
  </div>
);

const ComingSoon = ({ title }) => (
  <div className="p-10">
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-slate-500">This section is coming soon.</p>
  </div>
);

const isAdminSession = () => {
  try {
    return Boolean(JSON.parse(sessionStorage.getItem('userInfo'))?.isAdmin);
  } catch {
    return false;
  }
};

const AppRoutes = ({ maintenance }) => {
  const { pathname } = useLocation();
  const blocked = maintenance.active && !pathname.startsWith('/admin') && !isAdminSession();

  if (blocked) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Maintenance message={maintenance.message} />
      </Suspense>
    );
  }

  return (
    <>
      <FloatingActions />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chakrata" element={<Chakrata />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/bike/:id" element={<BikeDetails />} />
          <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Navigate to="/auth" replace />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="vendors" element={<AdminVendors />} />
            <Route path="banners" element={<ComingSoon title="Banner Management" />} />
            <Route path="bike-types" element={<ComingSoon title="Bike Types" />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="packages/add" element={<AddBike />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="cities" element={<AdminCities />} />
            <Route path="support" element={<AdminSupport />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="coupons" element={<AdminCoupons />} />
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

          {/* Unknown URLs go home instead of a blank page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [maintenance, setMaintenance] = useState({ active: false, message: '' });

  // Maintenance check runs in the background with a timeout, so a slow
  // (cold-starting) backend never blocks the site from rendering.
  useEffect(() => {
    let cancelled = false;
    API.get('/settings', { timeout: 4000 })
      .then(({ data }) => {
        if (!cancelled && data?.isMaintenanceMode) {
          setMaintenance({ active: true, message: data.maintenanceMessage });
        }
      })
      .catch(() => { /* backend unreachable: keep site usable */ });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="antialiased text-slate-900 bg-white min-h-screen relative">
          <Loader visible={showIntro} />
          <AppRoutes maintenance={maintenance} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
