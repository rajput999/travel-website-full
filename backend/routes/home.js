const express = require('express');
const {handleUserSignin, handleUserSignup, handleVerifyEmail} = require('../controllers/authUser');
const home = require('');
const router = express.Router('../../frontend/src/App');

router.get('/', );
router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);
router.get('/verify-email', handleVerifyEmail);

module.exports = router;
