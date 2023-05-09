require('dotenv').config()

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default function handler(req: any, res: any) {
  let { workout_exercise_id, user_id, log_date } = req.query;

  if (req.method === 'DELETE') {
    return axios.delete(`${process.env.BACKEND_URL}/exercise/workout?id=${workout_exercise_id}`)
            .then(({ data }) => {
              res.status(200).json(data);
            })
            .catch( error => {
              res.status(400).send(error.stack);
            })
  } else if (req.method === 'PUT') {
    return axios.put(`${process.env.BACKEND_URL}/exercise/workout?workout_exercise_id=${workout_exercise_id}&user_id=${user_id}&log_date=${log_date}`)
             .then(({ data }) => {
              res.status(200).json(data);
             })
             .catch( error => {
              res.status(400).send(error.stack);
             })
  }

}