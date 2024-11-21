const express = require('express');
const { getBfhl, postBfhl } = require('../controllers/bfhlController');
const upload = require('../middleware/upload');

const router = express.Router();

// GET request
router.get('/', getBfhl);

// POST request
router.post('/', upload.single('file'), postBfhl);

module.exports = router;
