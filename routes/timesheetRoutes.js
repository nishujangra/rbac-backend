const express = require('express');
const { authenticateToken, isEmployee, isManagerOrAdmin, isManager, isAdmin } = require('../middlewares/authMiddleware');
const { submitTimesheet, viewAllTimesheets, updateTimesheetStatus, getMyTimesheets, getDepartmentTimesheets } = require('../controllers/timesheetController');

const router = express.Router();

// Endpoint to submit a timesheet (Employee only)
router.post('/', authenticateToken, isEmployee, submitTimesheet);


// Endpoint to view all timesheets (Manager or Admin only)
router.get('/', authenticateToken, isManagerOrAdmin, viewAllTimesheets);

// Endpoint to approve/reject a timesheet (Manager only)
router.put('/:id', authenticateToken, isManager, updateTimesheetStatus);


// Route to get all timesheets for the logged-in employee
router.get('/mine', authenticateToken, isEmployee, getMyTimesheets);

module.exports = router;