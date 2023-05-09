const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  foodSearch,
  getFoodLog,
  logFood,
  addFoodToDB,
  updateLog,
  deleteFromLog
} = controller.nutrition;

//add more sub routes here. See app.js for main route
router.get('/list/foods', foodSearch);

router.get('/list/foodLog', getFoodLog);

router.post('/create/logFoods', logFood);

router.put('/update/foodLog', updateLog);

router.delete('/remove/foodLog', deleteFromLog);

module.exports = router;
