const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const Design = require('../models/Design');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pdfs/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

// @route   GET /api/designs
// @desc    Get all designs
router.get('/', async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/designs/upload
// @desc    Upload a new design
router.post('/upload', auth, (req, res) => {
  upload.single('pdf')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ msg: err.message });
    }

    const { title, desc } = req.body;
    try {
      if (!req.file) return res.status(400).json({ msg: 'Please upload a PDF file' });

      const newDesign = new Design({
        title,
        desc,
        pdfPath: req.file.path.replace(/\\/g, '/'),
      });
      await newDesign.save();
      res.json(newDesign);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

// @route   DELETE /api/designs/:id
// @desc    Delete a design
router.delete('/:id', auth, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ msg: 'Design not found' });

    // Delete file from filesystem
    if (fs.existsSync(design.pdfPath)) {
      fs.unlinkSync(design.pdfPath);
    }

    await design.deleteOne();
    res.json({ msg: 'Design removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
