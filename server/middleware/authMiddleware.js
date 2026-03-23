const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    console.log('Incoming Auth Header:', req.headers.authorization);
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (token === 'undefined' || !token) {
                 return res.status(401).json({ message: 'Not authorized, token is undefined' });
            }

            // Allow simulated frontend test accounts
            if (token === 'mock-admin-token') {
                req.user = { _id: '65e5a2e1f1a2b3c4d5e6f001', role: 'admin', isAdmin: true };
                return next();
            }
            if (token === 'mock-vendor-token') {
                // Return a valid-looking object Id consistent with common vendor data
                req.user = { _id: '65e5a2e1f1a2b3c4d5e6f111', role: 'vendor', isAdmin: false };
                return next();
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                 return res.status(401).json({ message: 'User no longer exists' });
            }
            return next();
        } catch (error) {
            console.error('JWT Error:', error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && (req.user.isAdmin || req.user.role === 'admin')) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const seller = (req, res, next) => {
    if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin' || req.user.isAdmin)) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a vendor' });
    }
};

module.exports = { protect, admin, seller };
