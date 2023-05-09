const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  getDailyCalories,
  getDailyExercise,
  getDailyNutrition
} = controller.overview;

//add more sub routes here. See app.js for main route
router.get('/calories', getDailyCalories);
router.get('/exercise', getDailyExercise);
router.get('/nutrition', getDailyNutrition);

module.exports = router;
