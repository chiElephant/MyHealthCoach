const { exerciseList } = require('../__mocks__/exercise');
const { query } = require('../db');
const request = require('supertest');
const axios = require('axios');
const app = require('../app');
const db = require('../db');

const user_id = 43353; //test user id
const log_date = '2022-12-13'; //test log date

describe('Exercise API', () => {
  afterAll(async () => {
    const params = [user_id];

    const queryString = `DELETE FROM public.users WHERE id=$1`;

    try {
      await query(queryString, params);
    } catch (err) {
      throw err;
    }
  });

  afterAll(async () => {
    await db.end();
  });

  beforeAll(async () => {
    const params = [user_id];

    const queryString = `INSERT INTO
    public.users (
      id,
      firstname,
      lastname
      ) VALUES
    ($1, 'John','Doe')`;

    try {
      await query(queryString, params);
    } catch (err) {
      throw err;
    }
  });

  describe('GET ', () => {
    describe('when a user searches for default exercises', () => {
      describe('a get request is made to retrieve a list of default exercises along with a list of default muscle groups', () => {
        it('should respond with 200 status', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.statusCode).toBe(200);
        });

        it('should return default exercise list', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.body.exercises).toEqual(
            expect.arrayContaining(exerciseList.exercises)
          );
        });

        it('should return muscle groups list for default exercises', async () => {
          const res = await request(app).get('/exercise/default/list');

          expect(res.body.muscle_groups).toEqual(exerciseList.muscle_groups);
        });
      });
    });
  });

  describe('when a user searches for custom exercises', () => {
    describe('a get request is made to retrieve a list of custom exercises', () => {
      beforeEach(async () => {
        const params = [user_id];

        //inserting custom exercise for testUser
        const queryString = `INSERT INTO
        public.exercises (exercise, muscle_group_id, user_id)
        VALUES
        ('Farmers walk', 5, $1)`;

        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      afterEach(async () => {
        const params = [user_id];

        //inserting custom exercises for testUser
        const queryString = `DELETE FROM exercises WHERE user_id=$1`;

        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      it('should retrieve custom exercises from a user', async () => {
        const res = await request(app).get(
          `/exercise/custom/list?user_id=${user_id}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body[0]).toHaveProperty('exercise');
        expect(res.body.length).toEqual(1);
      });
    });
  });

  describe('when a user navigates to the exercise page', () => {
    describe('a get request is made to retrieve all the exercises in the user workout for that day', () => {
      beforeEach(async () => {
        const params = [log_date, user_id];

        const queryString = `INSERT INTO public.workout_exercises(
            log_date, exercise_id, user_id)
            VALUES ($1,
                (SELECT id FROM exercises WHERE exercise='DB Alternating Curls'),
                $2)`;

        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      afterEach(async () => {
        const params = [user_id];

        const queryString = `DELETE FROM workout_exercises WHERE user_id=$1`;

        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      it('should retrieve workout execises', async () => {
        const res = await request(app).get(
          `/exercise/workout/list?user_id=${user_id}&log_date=${log_date}`
        );

        expect(res.statusCode).toBe(200);
        expect(res.body).not.toBeUndefined();
        expect(res.body.result[0]).toHaveProperty('id');
        expect(res.body.result[0]).toHaveProperty('photo_url');
        expect(res.body.result[0]).toHaveProperty('sets');
        expect(res.body.result[0]).toHaveProperty('muscle_group');
        expect(res.body.result[0]).toHaveProperty('exercise');
        expect(res.body.result[0]).toHaveProperty('est_cals_burned');
      });
    });
  });

  describe('POST ', () => {
    describe('when a user creates a new custom exercise', () => {
      describe('a post request is made to create a new custom exercise for that user', () => {
        afterEach(async () => {
          const params = [user_id];

          const queryString = `DELETE FROM exercises WHERE user_id=$1`;

          try {
            await query(queryString, params);
          } catch (err) {
            throw err;
          }
        });

        it('should create a new custom exercise for a user', async () => {
          const custom_exercise = 'Log Presses';
          const muscle_group_id = 4; //note: this is a default value stored in the muscle_groups table 'Shoulders'
          const res = await request(app).post(
            `/exercise/custom/create?user_id=${user_id}&custom_exercise=${custom_exercise}&muscle_group_id=${muscle_group_id}`
          );

          const queryString = `SELECT exercise, muscle_group_id, user_id
          FROM public.exercises
          JOIN users ON users.id=exercises.user_id
          WHERE users.id=$1`;
          const params = [user_id];

          let retriveFromdb;
          try {
            retriveFromdb = await query(queryString, params);
          } catch (err) {
            throw err;
          }

          expect(res.statusCode).toBe(201);
          expect(retriveFromdb.rows[0].exercise).toEqual(custom_exercise);
          expect(retriveFromdb.rows[0].muscle_group_id).toEqual(
            muscle_group_id
          );
        });
      });
    });

    describe('when a user adds an exercise to a workout', () => {
      afterEach(async () => {
        const params = [user_id, log_date];

        const queryString = `DELETE FROM workout_exercises WHERE user_id=$1 AND log_date=$2`;

        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });
      ``;
      describe('a post request is made to add a new exercise', () => {
        it('should add exercise to a workout', async () => {
          const exercise_id = 1;
          const res = await request(app).post(
            `/exercise/create?user_id=${user_id}&exercise_id=${exercise_id}&log_date=${log_date}`
          );

          const queryString = `SELECT exercises.id AS exercise_id
          FROM public.workout_exercises
          JOIN exercises ON exercises.id=workout_exercises.exercise_id
          WHERE exercises.id=$1
          AND workout_exercises.user_id=$2
          AND log_Date=$3`;

          const params = [exercise_id, user_id, log_date];

          let retriveFromdb;
          try {
            retriveFromdb = await query(queryString, params);
          } catch (err) {
            throw err;
          }
          expect(res.statusCode).toBe(201);
          expect(retriveFromdb.rows[0].exercise_id).toEqual(1);
        });
      });
    });
  });

  describe('DELETE', () => {
    describe('when a user deletes a custom exercise', () => {
      const custom_exercise = 'Car Deadlift';
      let exercise_id;
      beforeAll(async () => {
        //insert custom exercise into workout before all

        const params = [custom_exercise, user_id];

        const query1 = `INSERT INTO public.exercises(
          exercise, user_id)
          VALUES ($1,$2)`;

        try {
          await query(query1, params);
        } catch (err) {
          throw err;
        }

        const query2 = `SELECT exercises.id AS exercise_id FROM exercises
        WHERE exercise=$1
        AND user_id=$2`;

        try {
          const res = await query(query2, params);
          exercise_id = res.rows[0].exercise_id;
        } catch (err) {
          throw err;
        }
      });

      describe('a delete request is made to delete the custom exercise', () => {
        it('should delete custom exercise', async () => {
          //note: custom exercises were inserted in very first beforeAll

          const res = await request(app).delete(
            `/exercise/custom/delete?user_id=${user_id}&exercise_id=${exercise_id}`
          );

          const params = [user_id, exercise_id];

          //check exercise table for custom exercise
          const query1 = `SELECT exercise
          FROM exercises
          WHERE user_id=$1
          AND exercises.id=$2`;

          let retriveFromdb;
          try {
            retriveFromdb = await query(query1, params);
          } catch (err) {
            throw err;
          }

          expect(res.statusCode).toBe(200);
          expect(retriveFromdb.rows).toEqual([]);
        });
      });
    });

    describe('when a user deletes an exercise from a workout', () => {
      describe('a delete request is made to delete the exercise from the workout for a particular date', () => {
        const exercise_id = 5;
        const params = [exercise_id, user_id, log_date];
        let id;

        beforeAll(async () => {
          //insert an exercise in a workout

          const queryString = `INSERT INTO public.workout_exercises(
            exercise_id, user_id, log_date)
            VALUES ($1, $2, $3)
            RETURNING id`;

          try {
            const result = await query(queryString, params);
            id = result.rows[0].id;

          } catch (err) {
            throw err;
          }
        });

        afterAll(async () => {
          const queryString = `DELETE FROM public.workout_exercises
          WHERE exercise_id=$1
          AND user_id=$2
          AND log_date=$3`;

          try {
            await query(queryString, params);
          } catch (err) {
            throw err;
          }
        });

        it('should delete the exercise from the workout', async () => {
          const res = await request(app).delete(
            `/exercise/workout?id=${id}`
          );

          const queryString = `SELECT id
          FROM public.workout_exercises
          WHERE exercise_id=$1
          AND user_id=$2
          AND log_date=$3`;
          let retriveFromdb;
          try {
            retriveFromdb = await query(queryString, params);
          } catch (err) {
            throw err;
          }

          expect(res.statusCode).toBe(200);
          expect(retriveFromdb.rows).toEqual([]);
        });
      });
    });
  });
});