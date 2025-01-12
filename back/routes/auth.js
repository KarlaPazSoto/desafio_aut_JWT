const express = require('express');
const { signUp, logIn } = require('../controllers/authController');
const checkCredentials = require('../middleware/checkCredentials');

const router = express.Router();

router.post('/registrarse', checkCredentials, signUp);
router.post('/login', checkCredentials, logIn);

module.exports = router;