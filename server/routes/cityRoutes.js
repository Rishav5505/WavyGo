const express = require('express');
const router = express.Router();
const { getCities, addCity, updateCity, deleteCity } = require('../controllers/cityController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
      .get(getCities)
      .post(protect, admin, addCity);

router.route('/:id')
      .put(protect, admin, updateCity)
      .delete(protect, admin, deleteCity);

module.exports = router;
