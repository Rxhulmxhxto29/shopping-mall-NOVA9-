const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { email, password, firstName, lastName, phone, dateOfBirth } = req.body;
        const db = global.db;
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const insertUser = db.prepare('INSERT INTO users (email, password, first_name, last_name, phone, date_of_birth) VALUES (?, ?, ?, ?, ?, ?)');
        const result = insertUser.run(email, hashedPassword, firstName, lastName, phone || null, dateOfBirth || null);
        const userId = result.lastInsertRowid;
        const insertLoyalty = db.prepare('INSERT INTO loyalty_points (user_id, total_points, current_tier) VALUES (?, ?, ?)');
        insertLoyalty.run(userId, 0, 'Silver');
        global.saveDb();
        const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.status(201).json({ success: true, message: 'User registered successfully', token, user: { userId, email, firstName, lastName } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration', error: error.message });
    }
});

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { email, password } = req.body;
        const db = global.db;
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.json({ success: true, message: 'Login successful', token, user: { userId: user.user_id, email: user.email, firstName: user.first_name, lastName: user.last_name } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
    }
});

module.exports = router;