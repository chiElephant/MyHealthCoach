import { AsyncResource } from 'async_hooks';
import axios from 'axios'

export default async function GetStrava ( req: any, res: any) {

  function test () {
    return 'Here'
  }

  const code = req.query.code

  const OPTIONS = {
    client_id: process.env.STRAVA_ID,
    client_secret: process.env.STRAVA_SECRET,
    code: code,
    grant_type: 'authorization_code'
  }

  if (code) {
    axios
    .post('https://www.strava.com/oauth/token', OPTIONS)
    .then(response => {
      const user: any= response.data.athlete
      // check if that user id exists in the database
      axios
        .get(`${process.env.BACKEND_URL}/user/auth/${user.id}`)
        .then(userData => {

          // If the user exists
          if (typeof userData.data === 'object') {
            const { id, firstname, lastname, height, weight, sex, profile } = userData.data

            res.status(200).redirect(`/overview`)
          }

          // If the user does not exist
          if (typeof userData.data === 'string') {

            const options = {
              method: 'POST',
              url: `${process.env.BACKEND_URL}/user/create`,
              headers: {
                'content-type': 'application/json'
              },
              data:
              {
                  'auth_id':  user.id,
                  'firstname':  user.firstname,
                  'lastname':  user.lastname,
                  'email':  null,
                  'user_password':  null,
                  'weight_lbs':  user.weight,
                  'height_inches':  null,
                  'sex':  user.sex,
                  'profile_pic':  user.profile
              }
            }

            axios
              .request(options)
              .then((newUserData: any) => {
                // setCurrentUser(newUserData.data)
                res.status(200).redirect(`/settings`)
              })
          }
        })

    })
    .catch((err: object) => console.log(err))
  }

}