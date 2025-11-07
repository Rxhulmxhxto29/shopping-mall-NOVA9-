const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const { items, totalAmount, paymentMethod, shippingAddress } = req.body;

        // Create order
        const insertOrder = db.prepare(`
            INSERT INTO orders (user_id, total_amount, payment_method, shipping_address, status) 
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const orderResult = insertOrder.run(req.user.userId, totalAmount, paymentMethod, shippingAddress, 'confirmed');
        const orderId = orderResult.lastInsertRowid;

        // Insert order items
        const insertItem = db.prepare(`
            INSERT INTO order_items (order_id, product_name, quantity, price, image_url) 
            VALUES (?, ?, ?, ?, ?)
        `);

        for (const item of items) {
            insertItem.run(orderId, item.name, item.quantity, item.price, item.image);
        }

        // Add loyalty points (1 point per dollar spent)
        const pointsToAdd = Math.floor(totalAmount);
        const updatePoints = db.prepare(`
            UPDATE loyalty_points SET total_points = total_points + ?, updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = ?
        `);
        updatePoints.run(pointsToAdd, req.user.userId);

        global.saveDb();

        const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId);

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            order,
            pointsEarned: pointsToAdd
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const orders = db.prepare(`
            SELECT o.order_id, o.total_amount, o.payment_method, o.status, o.created_at
            FROM orders o
            WHERE o.user_id = ?
            ORDER BY o.created_at DESC
        `).all(req.user.userId);

        // Get items for each order
        const getItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?');
        
        orders.forEach(order => {
            order.items = getItems.all(order.order_id);
        });

        res.json({ success: true, orders });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
