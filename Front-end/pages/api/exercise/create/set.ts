import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: any, res: any) {
  let { weights, reps, workout_exercise_id  } = req.body;

  return axios.post(`${process.env.BACKEND_URL}/exercise/create/set`, {
            weights,
            reps,
            workout_exercise_id
          })
          .then(({ data }) => {
            res.status(200).send(`Successfuly Added Set to workout ${workout_exercise_id}`);
          })
          .catch( error => {
            res.status(400).send(error.stack);
          })
}
