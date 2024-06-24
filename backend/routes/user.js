const express = require('express');
const { signup, signin } = require('../controllers/authUser');
const { route } = require('./home');
const router = express.Router();

router.get('/')
router.post('/:id/booknow', handleCreateBooking());
router.patch('/:id/booknow/:bookingId', handleUpdateBooking());
route.delete('/:id/booknow/:bookingId', handleDeleteBooking());


module.exports = router;
