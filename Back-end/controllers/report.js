//add your controllers here
//make sure you do error handling like so
//if you take care of errors like the below example, the error middleware will take care of the error for you

const {
  getTest,
  getCalGained,
  getCalBurned,
  getExerciseReports} = require('../model/report');

const turnIntoCoordinates = (array, mode) => {
  // Also finds the max weight that is lifted for exercises
  let [retArray, max] = [[], 0];
  for (let i = 0; i < array.length; i++) {
    let x = new Date(array[i].log_date).getTime();
    let y;;
    if (mode === 'gained') {
      y = array[i].total_cals_gained;
    } else if (mode === 'burned') {
      y = array[i].total_cals_burned;
    } else {
      y = array[i].weight_lbs;
    }
    if (mode = 'exercise' && y > max) {
      max = y;
    }
    retArray.push({x, y});
  }
  return {array: retArray, max: max};
}

module.exports = {
  test: (req, res, next) => {
    try {
      res.send({string: 'report test'});
    } catch (err) {
      next(err);
    }
  },
  dbTest: async (req, res, next) => {
    try {
      let result = await getTest();
      res.status(200).send(result.rows[0].current_date);
    } catch (err) {
      next(err);
    }
  },
  getReportData: async (req, res, next) => {
    let [id, date] = [req.params.userId, req.params.date];
    try {
      let [calGained, calBurned, exerciseReports] = await Promise.all([
        getCalGained(id, date),
        getCalBurned(id, date),
        getExerciseReports(id, date)
      ]);
      if (id === 'test') {
        let result ={calGained: calGained, calBurned: calBurned, exerciseReports: exerciseReports};
        res.status(200).send(result);
      } else {
        let [result, coords] = [[], {}];
        // Add in object for calories gained
        let calG = {
          maxRep: 0,
          type: 'Calories Gained',
          data: []
        };
        coords = turnIntoCoordinates(calGained.rows, 'gained');
        calG.data = coords.array;
        result.push(calG);
        // Add in object for calories burned
        let calB = {
          maxRep: 0,
          type: 'Calories Burned',
          data: []
        };
        coords = turnIntoCoordinates(calBurned.rows, 'burned');
        calB.data = coords.array;
        result.push(calB);
        // Add in objects for each exercise
        let rows = exerciseReports.rows;
        let erOrganizer = {};
        for (let i = 0; i < rows.length; i++) {
          if (erOrganizer[rows[i].exercise]) {
            erOrganizer[rows[i].exercise].push(rows[i]);
          } else {
            erOrganizer[rows[i].exercise] = [rows[i]];
          }
        }
        for (let exercise in erOrganizer) {
          let object = {
            maxRep: 0,
            type: exercise,
            data: []
          };
          coords = turnIntoCoordinates(erOrganizer[exercise], 'exercise');
          object.data = coords.array;
          object.maxRep = coords.max;
          result.push(object);
        }
        res.status(200).send(result);
      }
    } catch (err) {
      next(err);
    }
  }
};
