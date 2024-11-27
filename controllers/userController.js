const User = require('../models/User');

// View all users (Admin only)
const viewAllUsers = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can view all users.' });
        }

        // Fetch all users
        const users = await User.find().select('-password'); // Exclude password field for security

        res.status(200).json({
            message: 'Users retrieved successfully.',
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { viewAllUsers };