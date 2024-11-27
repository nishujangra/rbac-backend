const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to validate JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from 'Bearer <token>'
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach decoded token data to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware to check if the user is an Admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied. Admins only.' });
    }
    next();
};

// Middleware to check if the user is a Manager
const isManager = (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Access Denied. Managers only.' });
    }
    next();
};

// Middleware to check if the user is an Employee
const isEmployee = (req, res, next) => {
    if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Access Denied. Employees only.' });
    }
    next();
};

// Middleware to check if the user is a Manager or Admin
const isManagerOrAdmin = (req, res, next) => {
    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Only managers or admins can perform this action.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    isAdmin,
    isManager,
    isEmployee,
    isManagerOrAdmin,
};
