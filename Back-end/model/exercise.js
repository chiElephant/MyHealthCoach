const { query } = require('../db');

module.exports = {
  //////////////////////////
  //searching for exercises
  //////////////////////////
  getDefaultExercisesFromDB: async () => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id IS NULL`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getMuscleGroupsFromDB: async () => {
    const queryString = `SELECT muscle_groups.id AS muscle_group_id, muscle_group FROM muscle_groups`;

    try {
      const result = await query(queryString);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  //////////////////////////
  //creating custom exercises
  //////////////////////////

  insertUserCustomExerciseInDB: async (
    user_id,
    custom_exercise,
    muscle_group_id
  ) => {
    const queryString = `INSERT INTO exercises(
      exercise, muscle_group_id, user_id)
      VALUES ($1,$2, $3)`;

    const params = [custom_exercise, muscle_group_id, user_id];

    try {
      const result = await query(queryString, params);
      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserExercisesFromDB: async (user_id) => {
    const queryString = `SELECT exercises.id AS exercise_id, exercise, muscle_group_id, muscle_group FROM exercises
    JOIN muscle_groups ON exercises.muscle_group_id=muscle_groups.id
    WHERE user_id=$1`;

    const params = [user_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  insertUserWorkoutExerciseInDB: async (log_date, exercise_id, user_id) => {
    const queryString = `INSERT INTO public.workout_exercises(
      log_date, exercise_id, user_id)
      VALUES ($1, $2, $3)`;

    const params = [log_date, exercise_id, user_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  getUserWorkoutFromDB: async (user_id, log_date) => {
    const workoutQuery = `SELECT we.id,
                                we.est_cals_burned,
                                we.log_date,
                                we.is_complete,
                                e.exercise,
                                mg.muscle_group,
                                mg.photo_url,
                                COALESCE(JSON_AGG(JSON_BUILD_OBJECT(
                                  'set_id', es.id,
                                  'weight_lbs', es.weight_lbs,
                                  'reps', es.reps,
                                  'reps_actual', es.reps_actual,
                                  'workout_id', es.workout_exercise_id
                                ) ORDER BY es.id ) FILTER (WHERE reps IS NOT null), '[]'::json ) AS sets
                          FROM workout_exercises AS we
                          LEFT JOIN exercise_set AS es ON we.id = es.workout_exercise_id
                          JOIN exercises AS e ON e.id = we.exercise_id
                          JOIN users AS u ON u.id = we.user_id
                          JOIN muscle_groups AS mg ON mg.id = e.muscle_group_id
                          WHERE u.id = $1 AND log_date=$2
                          GROUP BY we.id, mg.photo_url, e.exercise, mg.muscle_group
                          ORDER BY we.is_complete`;

    const caloriesQuery = `SELECT total_cals_burned FROM daily_calories WHERE user_id = $1 AND log_date = $2`
    const params = [user_id, log_date];

    //If daily calories has no data for current day, add a row
    const insertDailyCalories = `INSERT INTO daily_calories (total_cals_burned, log_date, user_id) VALUES (0, $2, $1)`

    const data = {}

    try {
      const calories = await query(caloriesQuery, params);

      if ( !calories.rows.length ) {
        data.total_cals_burned = 0;

        await query(insertDailyCalories, params);

      } else {
        data.total_cals_burned = calories.rows[0].total_cals_burned;
      }

      const result = await query(workoutQuery, params);
      data.result = result.rows;

      return data;

    } catch (err) {
      throw err;
    }
  },

  insertUserExerciseSetInDB: async (weights, reps, workout_exercise_id) => {
    const queryString = `INSERT INTO public.exercise_set(
      weight_lbs, reps, workout_exercise_id)
      VALUES ($1, $2, $3)`;

    // const params = [weights, reps, workout_exercise_id];

    try {
      for (var i = 0; i < weights.length; i++) {
        let params = [weights[i], reps[i], workout_exercise_id]

        await query(queryString, params)
      }

      return;
    } catch (err) {
      throw err;
    }
  },

  getUserExerciseSetFromDB: async (workout_exercise_id) => {
    const queryString = `SELECT id AS set_id, weight_lbs, reps, reps_actual, workout_exercise_id
                         FROM public.exercise_set
                         WHERE workout_exercise_id=$1`;

    const params = [workout_exercise_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteExerciseSetFromDB: async (set_id) => {
    const queryString = `DELETE FROM exercise_set WHERE id = $1`

    const params = [set_id];

    try {
      const result = await query(queryString, params);
      return;
    } catch (err) {
      throw err;
    }
  },

  deleteCustomExerciseFromDB: async (user_id, exercise_id) => {
    const queryString = `DELETE FROM public.exercises
    WHERE user_id=$1
    AND exercises.id=$2`;

    const params = [user_id, exercise_id];

    try {
      const result = await query(queryString, params);

      return result.rows;
    } catch (err) {
      throw err;
    }
  },

  deleteWorkoutExerciseFromDB: async (id) => {
    const queryString1 = `DELETE FROM workout_exercises WHERE id = $1`;
    const queryString2 = `DELETE FROM exercise_set WHERE workout_exercise_id = $1`;

    const params = [id];

    try {
      const deleteSets = await query(queryString2, params);
      const deleteWorkout = await query(queryString1, params);

      return;
    } catch (err) {
      throw err;
    }
  },

  setActualRepsForSet: async (set_id, actual_reps, user_id) => {
    const setQuery = `UPDATE exercise_set SET reps_actual = $2 WHERE id = $1`
    const setParams = [set_id, actual_reps]

    const weightQuery = `SELECT weight_lbs FROM USERS where id = $1`
    const weightParams = [user_id]

    const caloriesQuery = `UPDATE workout_exercises SET est_cals_burned = est_cals_burned::integer + $2 WHERE id = ( SELECT workout_exercise_id FROM exercise_set WHERE id = $1 )`
    const caloriesParams = [set_id]


    try {
      const weightResult = await query(weightQuery, weightParams);
      const weight = weightResult.rows[0].weight_lbs;
      const calsBurned = Math.ceil(5 * weight * actual_reps * .000875);

      caloriesParams.push(calsBurned)

      const caloriesResult = await query(caloriesQuery, caloriesParams);

      const result = await query(setQuery, setParams);
      return result;
    } catch (err) {
      throw err;
    }
  },

  setWorkoutExerciseAsComplete: async (workout_exercise_id, user_id, log_date) => {
    const workoutQuery = `UPDATE workout_exercises SET is_complete = true WHERE id = $1`
    const workoutParams = [workout_exercise_id]

    const caloriesQuery = `UPDATE daily_calories
                           SET total_cals_burned = total_cals_burned::integer + (SELECT est_cals_burned FROM workout_exercises WHERE id = $1)::integer
                           WHERE user_id = $2 AND log_date = $3`

    const caloriesParams = [workout_exercise_id, user_id, log_date]

    try {
      await query(workoutQuery, workoutParams);
      await query(caloriesQuery, caloriesParams);

      return;
    } catch (err) {
      throw err;
    }
  },

  editSetsForExerciseFromDB: async (reps, weights, setIDs) => {
      for (var i = 0; i < reps.length; i++) {
        console.log('iterating...', i)
        try {
          const queryString = `UPDATE exercise_set SET reps = $1, weight_lbs = $2 WHERE id = $3`
          const params = [reps[i], weights[i], setIDs[i]]

          await query(queryString, params);
        } catch (error) {
          return error;
        }
      }
  }
};
