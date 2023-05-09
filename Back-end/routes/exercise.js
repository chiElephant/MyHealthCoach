const express = require('express');
const router = express.Router();
const controller = require('../controllers');

//add your controllers to this object
const {
  getDefaultExercises,
  postUserCustomExercise,
  getUserExercises,
  postUserWorkoutExercise,
  getUserWorkoutForDate,
  postExerciseSet,
  getExerciseSet,
  deleteExerciseSet,
  deleteWorkoutExercise,
  deleteCustomExercise,
  completeExerciseSet,
  completeWorkoutExercise,
  editSetsForExercise
} = controller.exercise;

//********GET********/
//searching for exercises
router.get('/default/list', getDefaultExercises);

//get sets for exercise
router.get('/list/sets', getExerciseSet); //query params: workout_exercise_id

//searching for custom exercises
router.get('/custom/list', getUserExercises); //query params: user_id

//get exercises in a workout
router.get('/workout/list', getUserWorkoutForDate); //query params: user_id, log_date

//********POST********/
//making a new custom exercise
router.post('/custom/create', postUserCustomExercise); //query params: user_id, custom_exercise, muscle_group_id

//add a new set to an exercise
router.post('/create/set', postExerciseSet); //body params: weights: array, reps: array, workout_exercise_id

//adding an exercise to a workout
router.post('/create', postUserWorkoutExercise); //query params: user_id, exercise_id, log_date

//********DELETE********/
//delete a custom exercise
router.delete('/custom/delete', deleteCustomExercise); //query params: user_id, exercise_id

//delete an exercise from a workout
router.delete('/workout', deleteWorkoutExercise); //query params: id, user_id, log_date

//delete a set from an exercise
router.delete('/sets', deleteExerciseSet); //query params: set_id

//********PUT***********/
//marking a set as complete
router.put('/set', completeExerciseSet); //query params: set_id, actual_reps, user_id

//marking an exercise as complete
router.put('/workout', completeWorkoutExercise) //query params: workout_exercise_id, user_id, log_date

//editing sets for a workout
router.put('/workout/sets', editSetsForExercise) //body params: reps: array, weights: array, setIDs: array

module.exports = router;
