const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   POST /api/reservations
// @desc    Make restaurant reservation
// @access  Private
router.post('/', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const { restaurantName, reservationDate, reservationTime, numberOfGuests, specialRequests } = req.body;

        const insertReservation = db.prepare(`
            INSERT INTO restaurant_reservations (user_id, restaurant_name, reservation_date, reservation_time, number_of_guests, special_requests, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        
        const result = insertReservation.run(req.user.userId, restaurantName, reservationDate, reservationTime, numberOfGuests, specialRequests || '', 'confirmed');
        const reservationId = result.lastInsertRowid;

        global.saveDb();

        const reservation = db.prepare('SELECT * FROM restaurant_reservations WHERE reservation_id = ?').get(reservationId);

        res.status(201).json({
            success: true,
            message: 'Reservation confirmed',
            reservation
        });
    } catch (error) {
        console.error('Make reservation error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/reservations
// @desc    Get user reservations
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const reservations = db.prepare(`
            SELECT * FROM restaurant_reservations WHERE user_id = ? ORDER BY reservation_date DESC
        `).all(req.user.userId);

        res.json({ success: true, reservations });
    } catch (error) {
        console.error('Get reservations error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
