const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

router.put('/profile', require('../middleware/authMiddleware'), require('../controllers/authController').updateProfile);

module.exports = router;