const { query } = require('../db/');

const findDates = (date) => {
  let UTC = new Date(date);
  let year = UTC.getFullYear();
  let start = new Date(year - 1, 11, 24).toISOString().split('T')[0];
  let end = new Date(year, 11, 31).toISOString().split('T')[0];
  return {start, end};
};

module.exports = {
  getTest: async () => {
    try {
      let queryString = 'SELECT CURRENT_DATE';
      let result = await query(queryString);
      return result;
    } catch (err) {
      throw err;
    }
  },
  getCalGained: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let queryString = `SELECT (total_cals_gained, log_date) FROM daily_calories WHERE (user_id = ${id}) AND (log_date >= '${start}' AND log_date <= '${end}') ORDER BY log_date`;
        let result = await query(queryString);
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  getCalBurned: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let params = [id, start, end];
        let queryString = `SELECT (total_cals_burned, log_date) FROM daily_calories WHERE (user_id = ${id}) AND (log_date >= '${start}' AND log_date <= '${end}') ORDER BY log_date`;
        let result = await query(queryString);
        return result;
      } catch (err) {
        throw err;
      }
    }
  },
  getExerciseReports: async (id, date) => {
    if (id === 'test') {
      return true;
    } else {
      try {
        let {start, end} = findDates(date);
        let params = [id, start, end];
        let queryString = `SELECT DISTINCT w.id, w.log_date, e.exercise, s.weight_lbs FROM workout_exercises AS w INNER JOIN exercises AS e ON (w.exercise_id = e.id) INNER JOIN exercise_set AS s ON (s.workout_exercise_id = w.id) WHERE (w.user_id = ${id}) And (w.is_complete = true) AND (w.log_date >= '${start}' AND w.log_date <= '${end}') AND (s.weight_lbs = (SELECT MAX(weight_lbs) FROM exercise_set WHERE workout_exercise_id = w.id)) ORDER BY w.log_date`;
        let result = await query(queryString);
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};