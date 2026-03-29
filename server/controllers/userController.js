const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Package = require('../models/packageModel');
const Booking = require('../models/bookingModel');
const OTP = require('../models/otpModel');
const { sendEmail } = require('../utils/email');

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

// @desc    Send OTP for registration
// @route   POST /api/users/send-otp
// @access  Public
const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        
        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Email already registered. Please login.' });
        }

        // 2. Generate 6-digit OTP
        const otpValue = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Save OTP to DB (it will expire in 10 mins)
        await OTP.findOneAndUpdate(
            { email },
            { otp: otpValue, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // 4. Send Email via Brevo
        try {
            await sendEmail({
                to: email,
                subject: 'WavyGo Verification OTP 🏍️',
                htmlContent: `
                    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 50px 0; color: #333; text-align: center;">
                        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #e1e8e5;">
                            <h2 style="color: #035c3e; margin-bottom: 30px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Verify Your Identity</h2>
                            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Hi there! Use the verification code below to complete your registration on WavyGo.</p>
                            
                            <div style="background-color: #f8fefc; border: 2px dashed #035c3e50; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
                                <span style="font-size: 42px; font-weight: 900; color: #035c3e; letter-spacing: 10px; text-shadow: 1px 1px 0 #fff;">${otpValue}</span>
                            </div>
                            
                            <p style="font-size: 14px; color: #666; margin-bottom: 5px;">This OTP will expire in <strong>10 minutes</strong>.</p>
                            <p style="font-size: 14px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
                            
                            <div style="margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
                                <p style="font-style: italic; font-size: 13px; color: #999;">Best Regards,<br>Team WavyGo - Ride With Passion</p>
                            </div>
                        </div>
                    </div>
                `
            });
            console.log(`Email successfully sent to ${email}`);
        } catch (emailError) {
            console.error('Brevo Email failed to send, showing OTP in console for testing:');
            console.log('------------------------------------');
            console.log(`|  TEST OTP FOR ${email}: ${otpValue}  |`);
            console.log('------------------------------------');
        }

        res.status(200).json({ message: 'OTP sent to your email successfully.' });
    } catch (error) {
        console.error('OTP Send Error:', error);
        res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
    }
};

// @desc    Verify OTP and register
// @route   POST /api/users/verify-otp
// @access  Public
const verifyOTPAndRegister = async (req, res) => {
    try {
        const { name, email, password, role, location, otp } = req.body;

        // 1. Find OTP in DB
        const otpRecord = await OTP.findOne({ email, otp });
        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // 2. OTP is valid, proceed with user creation
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
            location: location || ''
        });

        if (user) {
            // Remove the OTP record after successful registration
            await OTP.deleteOne({ _id: otpRecord._id });

            // Send Welcome Email
            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Welcome to WavyGo! 🏍️',
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #035c3e; text-align: center;">Welcome to WavyGo, ${user.name}!</h2>
                            <p>Thank you for joining India's premium bike rental platform. We're excited to help you on your next adventure.</p>
                            <div style="background-color: #f8fefc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                <p style="margin: 0;"><strong>Account Details:</strong></p>
                                <p style="margin: 5px 0;">Email: ${user.email}</p>
                                <p style="margin: 5px 0;">Role: ${user.role}</p>
                            </div>
                            <p>You can now log in and start exploring our wide range of premium bikes.</p>
                            <div style="text-align: center; margin-top: 30px;">
                                <a href="https://wavygo.com/login" style="background-color: #035c3e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Login to Your Account</a>
                            </div>
                            <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">If you didn't create this account, please ignore this email.</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Registration welcome email failed:', emailError);
            }

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
            res.status(400).json({ message: 'Invalid user data during final registration.' });
        }
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { authUser, sendOTP, verifyOTPAndRegister };

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

            // Send Approval Email
            try {
                await sendEmail({
                    to: user.email,
                    subject: 'Congratulations! Your Vendor Account is Approved 🎊',
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #035c3e; text-align: center;">Vendor Approval Successful!</h2>
                            <p>Hi ${user.name},</p>
                            <p>Great news! Your vendor application for WavyGo has been reviewed and approved by our administration team.</p>
                            <p>You can now access your vendor dashboard to list your bikes, manage bookings, and track your revenue.</p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="https://wavygo.com/vendor/dashboard" style="background-color: #035c3e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access Vendor Dashboard</a>
                            </div>
                            <p>We're happy to have you as a partner in providing premium rental services!</p>
                            <p style="font-size: 12px; color: #777; margin-top: 40px; text-align: center;">Best Regards,<br>Team WavyGo</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Approval email failed:', emailError);
            }

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

module.exports = { authUser, getUsers, deleteUser, getVendorStatsForAdmin, updateUserProfile, approveVendor, getUserProfile, sendOTP, verifyOTPAndRegister };
