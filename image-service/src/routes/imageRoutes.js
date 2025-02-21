const express = require('express');
const router = express.Router();
const { uploadImageController } = require('../controllers/imageController');

// Resim URL eklemek için route
router.post('/upload', uploadImageController);

module.exports = router;
