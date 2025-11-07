const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const user = db.prepare(
            'SELECT user_id, email, first_name, last_name, phone, date_of_birth, created_at FROM users WHERE user_id = ?'
        ).get(req.user.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const { firstName, lastName, phone, dateOfBirth } = req.body;

        const update = db.prepare(`
            UPDATE users SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = ?
        `);
        
        update.run(firstName, lastName, phone, dateOfBirth, req.user.userId);
        global.saveDb();

        const user = db.prepare(
            'SELECT user_id, email, first_name, last_name, phone, date_of_birth FROM users WHERE user_id = ?'
        ).get(req.user.userId);

        res.json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/user/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const userId = req.user.userId;

        // Get loyalty points
        const loyalty = db.prepare(
            'SELECT total_points, current_tier, tier_progress FROM loyalty_points WHERE user_id = ?'
        ).get(userId);

        // Get recent orders
        const orders = db.prepare(
            'SELECT order_id, total_amount, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT 5'
        ).all(userId);

        // Get upcoming event bookings
        const events = db.prepare(
            `SELECT booking_id, event_name, event_date, number_of_tickets, status 
             FROM event_bookings WHERE user_id = ? AND event_date >= date('now') 
             ORDER BY event_date ASC LIMIT 5`
        ).all(userId);

        // Get restaurant reservations
        const reservations = db.prepare(
            `SELECT reservation_id, restaurant_name, reservation_date, reservation_time, number_of_guests, status 
             FROM restaurant_reservations WHERE user_id = ? AND reservation_date >= date('now') 
             ORDER BY reservation_date ASC LIMIT 5`
        ).all(userId);

        res.json({
            success: true,
            dashboard: {
                loyaltyPoints: loyalty || { total_points: 0, current_tier: 'Silver', tier_progress: 0 },
                recentOrders: orders,
                upcomingEvents: events,
                upcomingReservations: reservations
            }
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
