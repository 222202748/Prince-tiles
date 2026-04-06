const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create admin user (only if no users exist)
router.post('/create-admin', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) return res.status(400).json({ msg: 'Admin already exists' });

    const user = new User({
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    await user.save();
    res.json({ msg: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username}`);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Password mismatch for user: ${username}`);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log(`Login successful for user: ${username}`);
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
