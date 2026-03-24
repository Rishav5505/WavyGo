const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Package = require('../models/packageModel');
const Booking = require('../models/bookingModel');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            profileImage: user.profileImage,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role, location } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'user',
        location: location || ''
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

module.exports = { authUser, registerUser };

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.deleteOne();
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Get all vendors with aggregated stats
// @route   GET /api/users/vendors-stats
// @access  Private/Admin
const getVendorStatsForAdmin = async (req, res) => {
    try {
        const vendors = await User.find({ role: 'vendor' }).select('-password');

        const vendorsWithStats = await Promise.all(vendors.map(async (vendor) => {
            const vendorIdStr = vendor._id.toString();

            // Count bikes (packages)
            const bikeCount = await Package.countDocuments({ vendorId: vendorIdStr });

            // Calculate total revenue from confirmed bookings
            const bookings = await Booking.find({
                vendorId: vendorIdStr,
                status: 'confirmed'
            });

            const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
            const totalBookings = await Booking.countDocuments({ vendorId: vendorIdStr });

            return {
                id: vendor._id,
                name: vendor.name,
                email: vendor.email,
                location: vendor.location || 'Not Specified',
                status: vendor.isApproved ? 'approved' : 'pending',
                bikes: bikeCount,
                bookings: totalBookings,
                revenue: totalRevenue,
                joinedDate: vendor.createdAt.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
            };
        }));

        res.json(vendorsWithStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.body.id); // Or from auth middleware

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.profileImage = req.body.profileImage || user.profileImage;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            profileImage: updatedUser.profileImage,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Approve a vendor
// @route   PUT /api/users/vendor/:id/approve
// @access  Private/Admin
const approveVendor = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isApproved = true;
            await user.save();
            res.json({ message: 'Vendor approved successfully' });
        } else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authUser, registerUser, getUsers, deleteUser, getVendorStatsForAdmin, updateUserProfile, approveVendor, getUserProfile };
