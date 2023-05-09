const axios = require('axios');
const { reports } = require('../__mocks__/report');
const request = require('supertest');
const app = require('../app');
const db = require('../db');
const {query} = require('../db');

const user1 = {
  auth_id: '78y2q6efgyucbu3rfb',
  firstname: 'John',
  lastname: 'Doe',
  email: 'test@test.com',
  user_password: 'password',
  weight_lbs: 200,
  height_inches: 70,
  sex: 'test',
};
const user2 = {
  auth_id: '89h4jkk495jmj6i6kj',
  firstname: 'Jane',
  lastname: 'Doe',
  email: 'test@email.com',
  user_password: 'password',
  weight_lbs: 150,
  height_inches: 60,
  sex: 'test'
};

describe('Report API', () => {
  afterAll( async () => {
    await db.end();
  });

  describe('Route, Controller, Model, and Database are connected', () => {
    it('Should send get request through route to the controller', async () => {
      let res = await request(app).get('/report/test');
      expect(res.body.string).toEqual('report test');
    });

    it('Model Should be returning to controller', async () => {
      let res = await request(app).get('/report/data/test/"2022-12-28"');
      expect(res.body.calGained).toEqual(true);
      expect(res.body.calBurned).toEqual(true);
      expect(res.body.exerciseReports).toEqual(true);
    });

    it('Database should be accessed through model', async () => {
      let res = await request(app).get('/report/dbTest');
      expect(typeof res.body).toEqual('string');
    });
  });
});