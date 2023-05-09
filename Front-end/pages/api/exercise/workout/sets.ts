require('dotenv').config()

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default function handler(req: any, res: any) {
  let { reps, weights, setIDs } = req.body;

  return axios.put(`${process.env.BACKEND_URL}/exercise/workout/sets`, {
            reps,
            weights,
            setIDs
          })
          .then(({ data }) => {
            res.status(200).json(data);
          })
          .catch( error => {
            res.status(400).send(error.stack);
          })
}