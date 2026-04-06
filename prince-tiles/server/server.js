require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');

// Force DNS resolution to use IPv4 and set a reliable resolver if SRV fails
dns.setServers(['8.8.8.8', '8.8.4.4']);

const authRoutes = require('./routes/auth');
const designRoutes = require('./routes/designs');
const galleryRoutes = require('./routes/gallery');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/gallery', galleryRoutes);

// Root route for Render health check
app.get('/', (req, res) => {
  res.send('Prince Tiles API is Running');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dbState: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    dbInfo: mongoose.connection.readyState === 1 ? 'Atlas' : 'Not Connected'
  });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  family: 4, // Force IPv4 to avoid common connectivity issues
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.message.includes('timeout') || err.message.includes('SSL alert number 80')) {
      console.log('\n--- �️  TROUBLESHOOTING ---');
      console.log('Your connection is being blocked by MongoDB Atlas.');
      console.log('1. Go to: https://cloud.mongodb.com/');
      console.log('2. Network Access -> IP Access List');
      console.log('3. Click "ADD IP ADDRESS" and select "ADD CURRENT IP ADDRESS"');
      console.log('4. Or select "Allow Access From Anywhere" (0.0.0.0/0) for testing.');
      console.log('---------------------------\n');
    }
  });

// Monitor connection events
mongoose.connection.on('disconnected', () => console.log('⚠️ MongoDB disconnected'));
mongoose.connection.on('error', (err) => console.error('🔴 Mongoose error:', err));
mongoose.connection.on('reconnected', () => console.log('♻️ MongoDB reconnected'));
mongoose.connection.on('connecting', () => console.log('🔄 Attempting to connect to MongoDB...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
