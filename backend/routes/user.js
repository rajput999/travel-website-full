const express = require('express');
const {handleCreateBookingById, handleUpdateBookingById, handleDeleteBookingById} = require('../controllers/authBooking');
const router = express.Router();

router.get('/', )
router.post('/:id/booknow', handleCreateBookingById);
router.patch('/:id/booknow/:bookingId', handleUpdateBookingById);
router.delete('/:id/booknow/:bookingId', handleDeleteBookingById);


module.exports = router;
