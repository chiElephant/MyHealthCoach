require('dotenv').config()

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default function handler(req: any, res: any) {
  let { set_id } = req.query;

  return axios.delete(`${process.env.BACKEND_URL}/exercise/sets?set_id=${set_id}`)
          .then(({ data }) => {
            res.status(200).json(data);
          })
          .catch( error => {
            res.status(400).send(error.stack);
          })
}