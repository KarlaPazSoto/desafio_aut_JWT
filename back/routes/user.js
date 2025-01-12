const express = require('express');
const verifyToken = require('../middleware/auth');
const {getProfile} = require('../controllers/userController');

const router = express.Router();

router.get('/perfil', verifyToken, getProfile);

module.exports = router;