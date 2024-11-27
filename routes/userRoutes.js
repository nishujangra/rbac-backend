const express = require('express');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const { viewAllUsers } = require('../controllers/userController');

const router = express.Router();

// Endpoint to view all users (Admin only)
router.get('/', authenticateToken, isAdmin, viewAllUsers);

module.exports = router;