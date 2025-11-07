const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// @route   GET /api/loyalty
// @desc    Get loyalty points info
// @access  Private
router.get('/', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const loyalty = db.prepare('SELECT * FROM loyalty_points WHERE user_id = ?').get(req.user.userId);

        res.json({ success: true, loyalty });
    } catch (error) {
        console.error('Get loyalty error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/loyalty/redeem
// @desc    Redeem loyalty points
// @access  Private
router.post('/redeem', authMiddleware, (req, res) => {
    try {
        const db = global.db;
        const { points, rewardName } = req.body;

        // Check if user has enough points
        const loyalty = db.prepare('SELECT total_points FROM loyalty_points WHERE user_id = ?').get(req.user.userId);

        if (loyalty.total_points < points) {
            return res.status(400).json({ success: false, message: 'Insufficient points' });
        }

        // Deduct points
        const updatePoints = db.prepare(`
            UPDATE loyalty_points SET total_points = total_points - ?, updated_at = CURRENT_TIMESTAMP 
            WHERE user_id = ?
        `);
        updatePoints.run(points, req.user.userId);

        global.saveDb();

        res.json({
            success: true,
            message: `${rewardName} redeemed successfully`,
            pointsRedeemed: points
        });
    } catch (error) {
        console.error('Redeem points error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
