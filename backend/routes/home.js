const express = require('express');
const { signup, signin } = require('../controllers/authUser');
const home = require('');
const router = express.Router('../../frontend/src/App');

router.get('/', home);
router.post('/signup', signup);
router.post('/signin', signin);


module.exports = router;
