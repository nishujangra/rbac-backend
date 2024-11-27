const Timesheet = require('../models/Timesheet');
const User = require('../models/User');

// Submit a timesheet (Employee only)
const submitTimesheet = async (req, res) => {
    const { date, hoursWorked, description } = req.body;

    try {
        // Validate input
        if (!date || !hoursWorked || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check user role
        if (req.user.role !== 'employee') {
            return res.status(403).json({ message: 'Only employees can submit timesheets.' });
        }

        hoursWorked = parseFloat(hoursWorked);

        // Create new timesheet
        const timesheet = new Timesheet({
            userID: req.user.id,
            date,
            hoursWorked,
            description,
            status: 'pending', // Default status when created
        });

        // Save timesheet to database
        await timesheet.save();

        res.status(201).json({ message: 'Timesheet submitted successfully!', timesheet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// View all timesheets (Manager or Admin only)
const viewAllTimesheets = async (req, res) => {
    try {
        // Check if the user is a manager or admin
        if (req.user.role !== 'manager' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only managers or admins can view timesheets.' });
        }

        let timesheets;

        if (req.user.role === 'admin') {
            // Admin: View all timesheets
            timesheets = await Timesheet.find().populate('userID', 'name email role');
        } else if (req.user.role === 'manager') {
            // Manager: View timesheets of employees in their department
            const employees = await User.find({ department: req.user.department, role: 'employee' }).select('_id');
            const employeeIds = employees.map((employee) => employee._id);

            timesheets = await Timesheet.find({ userID: { $in: employeeIds } }).populate('userID', 'name email role');
        }

        res.status(200).json({ message: 'Timesheets retrieved successfully.', timesheets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Approve or reject a timesheet (Manager only)
const updateTimesheetStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Validate input
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status. Allowed values: approved, rejected.' });
        }

        // Check if user is a manager
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Access denied. Only managers can update timesheet status.' });
        }

        // Find the timesheet
        const timesheet = await Timesheet.findById(id).populate('userID', 'department role');

        if (!timesheet) {
            return res.status(404).json({ message: 'Timesheet not found.' });
        }

        // Check if the manager is authorized to update this timesheet
        const employee = await User.findById(timesheet.userID);
        if (!employee || employee.department !== req.user.department) {
            return res.status(403).json({ message: 'Access denied. You can only manage timesheets of employees in your department.' });
        }

        // Update the status of the timesheet
        timesheet.status = status;
        await timesheet.save();

        res.status(200).json({
            message: `Timesheet successfully ${status}.`,
            timesheet,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Get all timesheets for the logged-in employee
const getMyTimesheets = async (req, res) => {
    try {
        // Extract user ID from the request (populated by auth middleware)
        const userId = req.user.id;

        // Fetch all timesheets associated with the user
        const timesheets = await Timesheet.find({ userID: userId }).sort({ date: -1 });

        res.status(200).json(timesheets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve timesheets' });
    }
};

module.exports = { submitTimesheet, viewAllTimesheets, updateTimesheetStatus, getMyTimesheets };