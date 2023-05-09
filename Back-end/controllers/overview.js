//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  getDailyCaloriesFromDB,
  getDailyExerciseFromDB,
  getDailyNutritionFromDB,
} = require('../model/overview');

module.exports = {
  getDailyCalories: async (req, res, next) => {
    try {
      let { date } = req.query;
      if (date === undefined) {
        let today = new Date();
        date = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
      }
      const result = await getDailyCaloriesFromDB(date);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },

  getDailyExercise: async (req, res, next) => {
    try {
      let { date } = req.query;
      if (date === undefined) {
        let today = new Date();
        date = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
      }
      const result = await getDailyExerciseFromDB(date);
      let output = [];

      result.map((item) => {
        let obj = {};
        obj['text'] = item.exercise;
        obj['calorie'] = item.est_cals_burned;
        output.push(obj);
      });
      res.status(200).send(output);
    } catch (err) {
      next(err);
    }
  },

  getDailyNutrition: async (req, res, next) => {
    try {
      let { date } = req.query;
      if (date === undefined) {
        let today = new Date();
        date = `${today.getFullYear()}-${
          today.getMonth() + 1
        }-${today.getDate()}`;
      }
      const result = await getDailyNutritionFromDB(date);
      res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  },
};
