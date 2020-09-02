const express = require('express');
const {
    register,
    login,
    // logout,
    // getMe,
    // forgotPassword,
    // resetPassword,
    // updateDetails,
    // updatePassword,
    // confirmEmail,
} = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;