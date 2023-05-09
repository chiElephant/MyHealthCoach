const { query } = require('../db');
const request = require('supertest');
const axios = require('axios');
const app = require('../app');
const db = require('../db');

const newUserInfo = {
  auth_id: '78y2q6efgyucbu3rfb',
  firstname: 'John',
  lastname: 'Doe',
  email: 'test@test.com',
  user_password: 'password',
  weight_lbs: 200,
  height_inches: 70,
  sex: 'test',
};

const {
  auth_id,
  firstname,
  lastname,
  email,
  user_password,
  weight_lbs,
  height_inches,
  sex,
} = newUserInfo;

describe('Users API', () => {
  afterAll(async () => {
    await db.end();
  });

  describe('GET ', () => {
    describe('get user info based on some auth id', () => {
      beforeAll(async () => {
        const queryString = `INSERT INTO public.users(
          auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const params = [
          auth_id,
          firstname,
          lastname,
          email,
          user_password,
          weight_lbs,
          height_inches,
          sex,
        ];
        try {
          await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      let user_id;
      beforeAll(async () => {
        const queryString = `SELECT id FROM public.users
        WHERE auth_id=$1`;

        const params = [auth_id];

        let retriveFromdb;
        try {
          retriveFromdb = await query(queryString, params);
          user_id = retriveFromdb.rows[0].id;
        } catch (err) {
          throw err;
        }
      });

      it('should get user id', async () => {
        const res = await request(app).get(`/user/auth/${auth_id}/`);

        expect(res.statusCode).toBe(200);
        // expect(res.body).toMatchObject(newUserInfo);
        // expect(res.body.user_id).toEqual(user_id);
        // expect(res.body.auth_id).toEqual(auth_id);
      });
    });
  });

  describe('POST ', () => {
    describe('make a new user', () => {
      afterAll(async () => {
        const queryString = `DELETE FROM public.users
        WHERE auth_id=$1`;

        const params = [auth_id];

        let retriveFromdb;
        try {
          retriveFromdb = await query(queryString, params);
        } catch (err) {
          throw err;
        }
      });

      it('should create a new user', async () => {
        const res = await request(app).post('/user/create').send(newUserInfo);

        const params = [auth_id];

        const queryString = `
        SELECT  id AS user_id, auth_id, firstname, lastname, email, user_password, weight_lbs, height_inches, sex
        FROM public.users
        WHERE auth_id=$1`;

        let retriveFromdb;
        try {
          retriveFromdb = await query(queryString, params);
        } catch (err) {
          throw err;
        }

        // expect(res.statusCode).toBe(201);
        // expect(retriveFromdb.rows[0]).toMatchObject(newUserInfo);
        // expect(retriveFromdb.rows[0].auth_id).toBe(auth_id);
        // expect(retriveFromdb.rows[0].user_id).toBeDefined();
      });
    });
  });

  // describe('DELETE', () => {});
});
