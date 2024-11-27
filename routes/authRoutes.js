const express = require('express');
const { authenticateToken, isAdmin } = require('../middlewares/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Admin-only endpoint to register users
router.post('/register', authenticateToken, isAdmin, registerUser);

// Endpoint to login users
router.post('/login', loginUser);

module.exports = router;