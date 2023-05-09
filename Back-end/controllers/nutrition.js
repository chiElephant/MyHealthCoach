//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you
const {
  addFoodsToDB,
  addUserFoods,
  getUserFoodsFromDB,
  updateUserFoods,
  removeUserFoods,
  foodSearchInDB
} = require('../model/nutrition');

module.exports = {
  foodSearch: async (req, res, next) => {
    const { food_id } = req.query;
    try {
      const id = await foodSearchInDB(food_id);
      if(id.length === 0){
        const foodId = await module.exports.addFoodToDB(req, res, next);
        res.send(foodId);
      } else {
        res.status(200).send(id[0]);
      }
    } catch (err) {
      next(err);
    }
  },
  getFoodLog: async (req, res, next) => {
    const { user, date } = req.query;
    try {
      const returnedLog = await getUserFoodsFromDB(user, date);
      const foodLog = [];
      returnedLog.map((log) => {
        let { id, food_name, nutrients, food_image, portion } = log;
        log.nutrients = JSON.parse(nutrients);
        foodLog.push(log);
      });
      res.send(foodLog);
    } catch (err) {
      next(err);
    }
  },
  logFood: async (req, res, next) => {
    let allFoods;
    let user = req.body.user;
    let eaten = req.body.consumed;
    let date = req.body.date.slice(0,10);

    if(req.body.items.length){
      allFoods = req.body.items;
    } else {
      allFoods = [req.body.items];
    }

    let successfulAdds = 0;

    await allFoods.map(async ({food, unit, amount}) => {
      console.log(food);
      const { foodId } = food;
      try {
        const addedFood = await addUserFoods(user, date, foodId, amount, eaten, unit);
        successfulAdds++;
        if(successfulAdds === allFoods.length){
          res.send('Successful!');
        };
      } catch (err) {
        next(err);
      }
    })
  },
  addFoodToDB: async (req, res, next) => {
    const { label, foodId, nutrients, image } = req.query.food;
    const stringedMeasurements = JSON.stringify(req.query.measures);
    const stringedNutrients = JSON.stringify(nutrients);
    const food_image = image || 'no image available';
    try {
      const newId = await addFoodsToDB(label, foodId, stringedMeasurements, stringedNutrients, food_image);
      res.send(newId[0]);
    } catch (err) {
      next(err);
    }
  },
  updateLog: async (req, res, next) => {
    const { logId, consumed, portion, measurement } = req.query;
    try {
      const updated = await updateUserFoods(logId, consumed, portion, measurement);
      res.send('Updated Successfully');
    } catch (err) {
      next(err);
    }
  },
  deleteFromLog: async (req, res, next) => {
    const { logId } = req.query;
    try {
      const remove = await removeUserFoods(logId);
      res.send('Deleted Successfully');
    } catch (err) {
      next(err);
    }
  },
};
