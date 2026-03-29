const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');
const User = require('../models/userModel');
const { sendEmail } = require('../utils/email');

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

        // Send confirmation email to User
        try {
            await sendEmail({
                to: email,
                subject: `Booking Request Sent: ${itemTitle} 🏍️`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h1 style="color: #035c3e; margin: 0;">Ride Requested!</h1>
                        </div>
                        <p>Hi ${userName}, thanks for choosing WavyGo.</p>
                        <p>Your booking request for <strong>${itemTitle}</strong> has been sent to the vendor. You will be notified once they confirm it.</p>
                        <div style="background-color: #f8fefc; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #035c3e10;">
                            <h3 style="margin-top:0; color: #035c3e;">Booking ID: #${createdBooking._id.toString().slice(-6).toUpperCase()}</h3>
                            <p style="margin: 5px 0;"><strong>Bike:</strong> ${itemTitle}</p>
                            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(travelDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                            <p style="margin: 5px 0;"><strong>Guests:</strong> ${guests}</p>
                            <p style="margin: 5px 0;"><strong>Amount:</strong> ₹${totalPrice}</p>
                        </div>
                        <p>Vendor <strong>${vendorName}</strong> is reviewing your request.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="https://wavygo.com/profile" style="background-color: #035c3e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">Track My Booking</a>
                        </div>
                        <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">Team WavyGo - The Best Bike Rentals In India</p>
                    </div>
                `
            });

            // Notify Vendor
            const vendor = await User.findById(createdBooking.vendorId);
            if (vendor && vendor.email) {
                await sendEmail({
                    to: vendor.email,
                    subject: 'New Booking Received! 🚀',
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #035c3e; text-align: center;">New Booking on WavyGo!</h2>
                            <p>Hi ${vendorName},</p>
                            <p>You have received a new booking for your machine: <strong>${itemTitle}</strong>.</p>
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 5px 0;"><strong>Customer:</strong> ${userName}</p>
                                <p style="margin: 5px 0;"><strong>Travel Date:</strong> ${new Date(travelDate).toLocaleDateString()}</p>
                                <p style="margin: 5px 0;"><strong>Earnings:</strong> ₹${totalPrice}</p>
                            </div>
                            <p>Please log in to your dashboard to confirm or manage this booking.</p>
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="https://wavygo.com/vendor/dashboard" style="background-color: #035c3e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
                            </div>
                        </div>
                    `
                });
            }
        } catch (emailError) {
            console.error('Email notification failed but booking was created:', emailError.message);
            console.log(`Booking details for ${userName}: ID #${createdBooking._id}`);
        }

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
            const oldStatus = booking.status;
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();

            // Notify user if status changed to 'confirmed'
            if (oldStatus !== 'confirmed' && updatedBooking.status === 'confirmed' && updatedBooking.email) {
                try {
                    await sendEmail({
                        to: updatedBooking.email,
                        subject: `Your Ride Status Updated: ${updatedBooking.status.toUpperCase()} ✅`,
                        htmlContent: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                                <h2 style="color: #035c3e; text-align: center;">Booking Update!</h2>
                                <p>Hi ${updatedBooking.userName},</p>
                                <p>The status of your booking for <strong>${updatedBooking.itemTitle}</strong> has been updated to <strong>${updatedBooking.status.toUpperCase()}</strong>.</p>
                                <p>Get ready for your ride!</p>
                                <div style="text-align: center; margin-top: 30px;">
                                    <a href="https://wavygo.com/profile" style="background-color: #035c3e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">View My Bookings</a>
                                </div>
                            </div>
                        `
                    });
                } catch (emailError) {
                    console.error('Status update email failed:', emailError);
                }
            }

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

// @desc    Get Admin Financials
// @route   GET /api/bookings/admin/financials
// @access  Private/Admin
const getAdminFinancials = async (req, res) => {
    try {
        const bookings = await Booking.find({ status: { $in: ['confirmed', 'completed', 'ongoing'] } });
        
        // Let's assume a 15% platform commission
        const COMMISSION_RATE = 0.15;
        
        let totalRevenue = 0;
        let totalBookings = bookings.length;
        let vendorPayoutsMap = {}; // Maps vendorId to their payout payload
        
        bookings.forEach(b => {
            const price = b.totalPrice || 0;
            totalRevenue += price;
            
            if (b.vendorId) {
                if (!vendorPayoutsMap[b.vendorId]) {
                    vendorPayoutsMap[b.vendorId] = {
                        id: b.vendorId, // using vendorId as transaction "id" or grouped payout
                        vendor: b.vendorName || "Unknown Vendor",
                        amount: 0,
                        status: 'pending', // we can consider all current balances pending
                        date: b.createdAt ? b.createdAt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-IN'),
                        method: 'Bank Transfer'
                    };
                }
                // Vendor gets 85%
                vendorPayoutsMap[b.vendorId].amount += price * (1 - COMMISSION_RATE);
            }
        });
        
        const platformRevenue = totalRevenue * COMMISSION_RATE;
        const payoutsList = Object.values(vendorPayoutsMap).filter(p => p.amount > 0);
        const pendingPayoutsTotal = payoutsList.reduce((sum, p) => sum + p.amount, 0);

        res.json({
            stats: {
                platformRevenue: platformRevenue.toFixed(0),
                pendingPayouts: pendingPayoutsTotal.toFixed(0),
                totalBookings: totalBookings
            },
            payouts: payoutsList
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
    getVendorStats,
    getAdminFinancials
};
