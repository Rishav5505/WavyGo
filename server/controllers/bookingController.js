const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const addBookingItems = async (req, res) => {
    try {
        const { packageId, userId, vendorId, vendorName, itemTitle, userName, email, phone, travelDate, guests } = req.body;

        const pkg = await Package.findById(packageId);
        if (!pkg) {
            return res.status(404).json({ message: 'Selected bike not found' });
        }

        const totalPrice = pkg.price * guests;

        const booking = new Booking({
            packageId,
            userId: userId || null,
            vendorId: vendorId || pkg.vendorId,
            vendorName: vendorName || pkg.vendorName,
            itemTitle: itemTitle || pkg.title,
            userName,
            email,
            phone,
            travelDate,
            guests,
            totalPrice
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('packageId', 'title image location').sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get vendor bookings
// @route   GET /api/bookings/vendor
// @access  Private/Vendor
const getVendorBookings = async (req, res) => {
    try {
        // Find bookings where vendorId matches the user email (assuming email is used as unique vendorId in local storage)
        // Adjusting to filter by vendorId precisely
        const vendorId = req.query.vendorId; // Passing it as query param or from auth context
        if (!vendorId) {
            return res.status(400).json({ message: 'Vendor ID required' });
        }
        const bookings = await Booking.find({ vendorId: vendorId }).populate('packageId', 'title').sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('packageId', 'title').sort('-createdAt');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/bookings/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const confirmedBookingsData = await Booking.find({ status: 'confirmed' });
        const revenue = confirmedBookingsData.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
        
        const totalBookings = await Booking.countDocuments();
        const pendingBookings = await Booking.countDocuments({ status: 'pending' });
        const confirmedBookingsCount = await Booking.countDocuments({ status: 'confirmed' });

        res.json({
            totalBookings,
            revenue,
            pendingBookings,
            confirmedBookings: confirmedBookingsCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin/Vendor
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get stats for a specific vendor
// @route   GET /api/bookings/vendor-stats
// @access  Private/Vendor
const getVendorStats = async (req, res) => {
    try {
        const vendorId = req.query.vendorId;
        if (!vendorId) {
            return res.status(400).json({ message: 'Vendor ID required' });
        }

        const bookings = await Booking.find({ vendorId: vendorId });
        
        // Detailed Stats
        const stats = {
            totalBookings: bookings.length,
            earnings: bookings
                .filter(b => b.status === 'confirmed' || b.status === 'completed')
                .reduce((acc, curr) => acc + (curr.totalPrice || 0), 0),
            activeRentals: bookings.filter(b => b.status === 'confirmed' || b.status === 'ongoing').length,
            
            // Payment breakdown
            cash: bookings.filter(b => b.paymentMethod === 'Cash' || !b.paymentMethod).length,
            online: bookings.filter(b => b.paymentMethod === 'Online').length,
            wallet: bookings.filter(b => b.paymentMethod === 'Wallet').length,

            // Status breakdown
            pending: bookings.filter(b => b.status === 'pending').length,
            confirmed: bookings.filter(b => b.status === 'confirmed').length,
            rejected: bookings.filter(b => b.status === 'rejected' || (b.status === 'cancelled' && b.cancelledBy === 'vendor')).length,
            cancelled: bookings.filter(b => b.status === 'cancelled').length,
            ongoing: bookings.filter(b => b.status === 'ongoing').length,
            completed: bookings.filter(b => b.status === 'completed').length,
        };
        
        const totalBikes = await Package.countDocuments({ vendorId: vendorId });
        
        res.json({
            ...stats,
            totalBikes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    addBookingItems, 
    getMyBookings, 
    getVendorBookings, 
    getBookings, 
    getDashboardStats, 
    updateBookingStatus,
    getVendorStats
};
