const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   GET /api/admin/customers
// @desc    Get all customers with count
// @access  Private (Admin)
router.get('/customers', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        
        // Get all customers
        const customers = db.prepare(`
            SELECT 
                u.user_id,
                u.email,
                u.first_name,
                u.last_name,
                u.phone,
                u.created_at,
                lp.total_points,
                lp.current_tier,
                COUNT(DISTINCT o.order_id) as total_orders,
                COALESCE(SUM(o.total_amount), 0) as total_spent
            FROM users u
            LEFT JOIN loyalty_points lp ON u.user_id = lp.user_id
            LEFT JOIN orders o ON u.user_id = o.user_id
            GROUP BY u.user_id
            ORDER BY u.created_at DESC
        `).all();

        // Get customer count
        const count = db.prepare('SELECT COUNT(*) as total FROM users').get();

        res.json({
            success: true,
            count: count.total,
            customers: customers
        });
    } catch (error) {
        console.error('Get customers error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/stats', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        
        const stats = {
            totalCustomers: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
            totalOrders: db.prepare('SELECT COUNT(*) as count FROM orders').get().count,
            totalRevenue: db.prepare('SELECT COALESCE(SUM(total_amount), 0) as total FROM orders').get().total,
            totalEvents: db.prepare('SELECT COUNT(*) as count FROM event_bookings').get().count,
            totalReservations: db.prepare('SELECT COUNT(*) as count FROM restaurant_reservations').get().count
        };

        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
});



// @route   PUT /api/admin/update-customer/:userId
// @desc    Update customer details
// @access  Private (Admin)
router.put('/update-customer/:userId', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        const { userId } = req.params;
        const { firstName, lastName, email, phone } = req.body;

        // Build update query dynamically
        const updates = [];
        const values = [];

        if (firstName !== undefined) {
            updates.push('first_name = ?');
            values.push(firstName);
        }
        if (lastName !== undefined) {
            updates.push('last_name = ?');
            values.push(lastName);
        }
        if (email !== undefined) {
            updates.push('email = ?');
            values.push(email);
        }
        if (phone !== undefined) {
            updates.push('phone = ?');
            values.push(phone);
        }

        if (updates.length === 0) {
            return res.status(400).json({ success: false, message: 'No fields to update' });
        }

        values.push(userId);
        const updateUser = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE user_id = ?`);
        updateUser.run(...values);
        global.saveDb();

        res.json({ success: true, message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Update customer error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/admin/update-points/:userId
// @desc    Update customer loyalty points
// @access  Private (Admin)
router.put('/update-points/:userId', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        const { userId } = req.params;
        const { points } = req.body;

        if (points === undefined || points < 0) {
            return res.status(400).json({ success: false, message: 'Invalid points value' });
        }

        // Update loyalty points
        const updatePoints = db.prepare(`
            UPDATE loyalty_points 
            SET total_points = ?, 
                current_tier = CASE 
                    WHEN ? >= 10000 THEN 'Platinum'
                    WHEN ? >= 5000 THEN 'Gold'
                    WHEN ? >= 1000 THEN 'Silver'
                    ELSE 'Bronze'
                END
            WHERE user_id = ?
        `);
        
        updatePoints.run(points, points, points, points, userId);
        global.saveDb();

        res.json({ success: true, message: 'Loyalty points updated successfully' });
    } catch (error) {
        console.error('Update points error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});



// @route   DELETE /api/admin/delete-customer/:userId
// @desc    Delete a customer
// @access  Private (Admin)
router.delete('/delete-customer/:userId', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        const { userId } = req.params;

        // Delete from all related tables
        db.prepare('DELETE FROM loyalty_points WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = ?)').run(userId);
        db.prepare('DELETE FROM orders WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM event_bookings WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM restaurant_reservations WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM personal_shopper_bookings WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM customer_feedback WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM lost_found_items WHERE user_id = ?').run(userId);
        db.prepare('DELETE FROM users WHERE user_id = ?').run(userId);
        
        global.saveDb();

        res.json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Delete customer error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @route   GET /api/admin/report
// @desc    Generate sales report
// @access  Private (Admin)
router.get('/report', authMiddleware, async (req, res) => {
    try {
        const db = global.db;
        const { from, to } = req.query;

        const orders = db.prepare(`
            SELECT 
                COUNT(*) as totalOrders,
                COALESCE(SUM(total_amount), 0) as totalRevenue
            FROM orders
            WHERE DATE(order_date) BETWEEN ? AND ?
        `).get(from, to);

        const newCustomers = db.prepare(`
            SELECT COUNT(*) as count
            FROM users
            WHERE DATE(created_at) BETWEEN ? AND ?
        `).get(from, to);

        const avgOrderValue = orders.totalOrders > 0 ? orders.totalRevenue / orders.totalOrders : 0;

        res.json({
            success: true,
            report: {
                totalRevenue: orders.totalRevenue || 0,
                totalOrders: orders.totalOrders || 0,
                newCustomers: newCustomers.count || 0,
                avgOrderValue: avgOrderValue,
                period: { from, to }
            }
        });
    } catch (error) {
        console.error('Report error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// @route   GET /api/admin/analytics
// @desc    Get analytics data
// @access  Private (Admin)
router.get('/analytics', authMiddleware, async (req, res) => {
    try {
        const db = global.db;

        // Top customers by spending
        const topCustomers = db.prepare(`
            SELECT 
                u.first_name || ' ' || u.last_name as name,
                COALESCE(SUM(o.total_amount), 0) as spent
            FROM users u
            LEFT JOIN orders o ON u.user_id = o.user_id
            GROUP BY u.user_id
            ORDER BY spent DESC
            LIMIT 5
        `).all();

        // Growth metrics
        const today = new Date();
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        const thisWeek = db.prepare(`
            SELECT COUNT(*) as count
            FROM users
            WHERE created_at >= ?
        `).get(weekAgo.toISOString());

        const thisMonth = db.prepare(`
            SELECT COUNT(*) as count
            FROM users
            WHERE created_at >= ?
        `).get(monthAgo.toISOString());

        res.json({
            success: true,
            analytics: {
                topCustomers: topCustomers || [],
                growth: {
                    thisWeek: thisWeek.count || 0,
                    thisMonth: thisMonth.count || 0,
                    rate: 0 // Calculate based on your needs
                }
            }
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
