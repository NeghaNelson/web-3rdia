const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctors
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/doctors')
  .get(getDoctors);

router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
