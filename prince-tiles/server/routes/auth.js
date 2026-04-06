const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Quick setup to create admin user via browser (one-time use)
router.get('/setup', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ msg: 'DB connection not ready' });
    }
    const userCount = await User.countDocuments();
    if (userCount > 0) return res.status(400).json({ msg: 'Admin already exists' });

    const user = new User({
      username: 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
    });
    await user.save();
    res.json({ msg: '✅ Admin user created! Username: admin' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create admin user (only if no users exist)
router.post('/create-admin', async (req, res) => {
  try {
    // Check DB connection state
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ msg: 'Database connection is not ready. Please try again in a few seconds.' });
    }

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
    // Check DB connection state
    if (mongoose.connection.readyState !== 1) {
      console.error('❌ Database connection not ready for login');
      return res.status(503).json({ msg: 'Database connection is not ready. Check your MongoDB Atlas whitelist (0.0.0.0/0).' });
    }

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required.' });
    }

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
    
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is missing in environment variables');
      return res.status(500).json({ msg: 'Server configuration error: JWT_SECRET missing.' });
    }

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) {
        console.error('JWT Signing Error:', err);
        return res.status(500).json({ msg: 'Token generation failed', error: err.message });
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Login error detail:', err);
    res.status(500).json({ 
      msg: 'Internal server error during login', 
      error: err.message,
      tip: 'Check your database connection and environment variables on Render.'
    });
  }
});

module.exports = router;
