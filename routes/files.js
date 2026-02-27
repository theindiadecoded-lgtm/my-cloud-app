const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// Upload file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      userId: req.user.id,
      filename: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype
    });
    await file.save();
    res.json({ message: 'File uploaded successfully', file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's files
router.get('/', auth, async (req, res) => {
  const files = await File.find({ userId: req.user.id });
  res.json(files);
});

// Delete file
router.delete('/:id', auth, async (req, res) => {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).json({ msg: 'File not found' });
  if (file.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

  await file.remove();
  res.json({ msg: 'File deleted' });
});

module.exports = router;