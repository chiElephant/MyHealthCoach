const db = require('../db');

module.exports = {
  addFoodsToDB: async (food_name, food_id, measurements, nutrients, food_image) => {
    // adds food to DB if it does not exist

    const queryString = `INSERT INTO public.foods(
      food_name, food_id, measurements, nutrients, food_image)
      VALUES ($1, $2, $3, $4, $5);`;

    const params = [food_name, food_id, measurements, nutrients, food_image];
    try {
      await db.query(queryString, params);
      const newId = await module.exports.foodSearchInDB(food_id)
      return newId;

    } catch (err) {
      throw err;
    }
  },
  addUserFoods: async (user_id, log_date, food, portion, consumed, measurement) => {
    // logs food

    const queryString = `INSERT INTO public.nutrition_log(
      user_id, log_date, food, portion, consumed, measurement)
      VALUES ($1, $2, $3, $4, $5, $6);`;

    const params = [user_id, log_date, food, portion, consumed, measurement];

    try {
      const result = await db.query(queryString, params);
      return result.rowCount;

    } catch (err) {
      throw err;
    }
  },
  getUserFoodsFromDB: async (user_id, log_date) => {
    // gets user's food log
    const queryString = `SELECT nlog.id, nlog.portion, nlog.food, nlog.consumed, nlog.measurement, foodinfo.food_name, foodinfo.nutrients, foodinfo.food_image
      FROM public.nutrition_log nlog
      JOIN public.foods foodinfo
      ON nlog.food = foodinfo.id
      WHERE nlog.user_id = $1 AND nlog.log_date = $2;`;

    const params = [user_id, log_date];

    try {
      const result = await db.query(queryString, params);
      return result.rows;

    } catch (err) {
      throw err;
    }
  },
  updateUserFoods: async (logId, consumedStatus, portion, measurement) => {
    // updates a food for user's food log
    const queryString = `UPDATE public.nutrition_log
      SET consumed = $2, portion = $3, measurement = $4
      WHERE id = $1;`;

    const params = [logId, consumedStatus, portion, measurement];

    try {
      const result = await db.query(queryString, params);
      return result.rows;

    } catch (err) {
      throw err;
    }
  },
  removeUserFoods: async (logId) => {
    // delete a food from user's food log
    const queryString = `DELETE from public.nutrition_log WHERE id = $1;`;

    const params = [logId];

    try {
      const result = await db.query(queryString, params);
      return result.rows;

    } catch (err) {
      throw err;
    }
  },
  foodSearchInDB: async (food_id) => {
    // will see if DB has the food
    const queryString = `SELECT id FROM public.foods
      WHERE food_id = $1;`;

    const params = [food_id];

    try {
      const result = await db.query(queryString, params);
      return result.rows;

    } catch (err) {
      throw err;
    }
  }
};
