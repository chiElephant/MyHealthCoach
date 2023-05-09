const { query } = require('../db/index');

module.exports = {
  getDailyCaloriesFromDB: async (date) => {
    const queryString = `SELECT * FROM daily_calories WHERE log_date=$1`;
    const params = [date];
    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getDailyExerciseFromDB: async (date) => {
    const params = [date];
    /* const queryString = `SELECT * FROM workout_exercises WHERE log_date=$1`; */
    const queryString = `
      SELECT
        exercises.exercise,
        workout_exercises.est_cals_burned
      FROM
        workout_exercises
      INNER JOIN
        exercises
      ON
        workout_exercises.exercise_id = exercises.id
      WHERE
        workout_exercises.log_date=$1;`;

    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getDailyNutritionFromDB: async (date) => {
    const queryString = `SELECT * FROM daily_calories WHERE log_date=$1`;
    const params = [date];
    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },
};
