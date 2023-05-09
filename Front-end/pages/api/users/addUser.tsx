import axios from 'axios'
import { GiConsoleController } from 'react-icons/gi';

export default async function AddUser (req: any, res: any) {
  const newUser = req.body

  axios
    .post(`${process.env.BACKEND_URL}/user/create`, newUser)
    .then((response: any) => {
      res.status(200).send(response.data)
    })
    .catch((err) => console.log('Error fetching Google Auth from DB'));
}