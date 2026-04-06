const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const GalleryItem = require('../models/GalleryItem');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

// @route   GET /api/gallery
// @desc    Get all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/gallery/upload
// @desc    Upload a new gallery item
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  const { title, category, loc, tag, large } = req.body;
  try {
    if (!req.file) return res.status(400).json({ msg: 'Please upload an image file' });

    const newItem = new GalleryItem({
      title,
      category,
      loc,
      tag,
      imagePath: req.file.path.replace(/\\/g, '/'),
      large: large === 'true', // Multer sends everything as string in body
    });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete a gallery item
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Gallery item not found' });

    // Delete file from filesystem
    if (fs.existsSync(item.imagePath)) {
      fs.unlinkSync(item.imagePath);
    }

    await item.deleteOne();
    res.json({ msg: 'Gallery item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
