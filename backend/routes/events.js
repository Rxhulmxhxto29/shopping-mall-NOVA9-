const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   POST /api/events/book
// @desc    Book an event
// @access  Private
router.post('/book', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const { eventName, eventDate, numberOfTickets } = req.body;

        const insertBooking = db.prepare(`
            INSERT INTO event_bookings (user_id, event_name, event_date, number_of_tickets, status) 
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const result = insertBooking.run(req.user.userId, eventName, eventDate, numberOfTickets || 1, 'confirmed');
        const bookingId = result.lastInsertRowid;

        global.saveDb();

        const booking = db.prepare('SELECT * FROM event_bookings WHERE booking_id = ?').get(bookingId);

        res.status(201).json({
            success: true,
            message: 'Event booked successfully',
            booking
        });
    } catch (error) {
        console.error('Book event error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/events/bookings
// @desc    Get user event bookings
// @access  Private
router.get('/bookings', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const bookings = db.prepare(`
            SELECT * FROM event_bookings WHERE user_id = ? ORDER BY event_date DESC
        `).all(req.user.userId);

        res.json({ success: true, bookings });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
