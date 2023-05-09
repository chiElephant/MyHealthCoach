import React, { useContext } from 'react'
import axios from 'axios'
import base64url from 'base64url'

export default function FitbitRoute (req: any, res: any) {

    const code = req.query.code

    const params = {
        client_id: process.env.FITBIT_ID,
        grant_type: 'authorization_code',
        code
    }

    const authorization = base64url(`${process.env.FITBIT_ID}:${process.env.FITBIT_SECRET}`)

    const authHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authorization}`
    }

    axios
    .post('https://api.fitbit.com/oauth2/token', params, {
        headers: authHeaders
    })
    .then((user: any) => {
        const params = {
            'auth_id': user.data.user_id,
        }

        const headers = {
            'Authorization': `Bearer ${user.data.access_token}`
        }

        axios
            .get(`${process.env.BACKEND_URL}/user/auth/${params.auth_id}`)
            .then(response => {
                if (response.data.id) {
                    return
                }
            })

    //     axios
    //         .post('https://api.fitbit.com/1/user/-/profile.json', params, {
    //             headers
    //         })
    //         .then((userData: any) => {

    //             const {encodedId, firstName, lastName, gender, height, weight, avatar640} = userData.data.user

    //             const USER_DATA = {
    //                 auth_id: encodedId,
    //                 firstname: firstName,
    //                 lastname: lastName,
    //                 email: null,
    //                 user_password: null,
    //                 height_inches: Math.round(height * 0.39701),
    //                 weight_lbs: Math.round(weight * 2.20462),
    //                 sex: gender,
    //                 profile_pic: avatar640
    //             }
    //             axios
    //                 .post(`${process.env.BACKEND_URL}/user/create`, USER_DATA)

    //                 .then(response => {
    //                     console.log('Here is the create fitbit res', response.data)
    //                 })

    //         })
    //         .catch(err => {
    //             throw new Error('Error fetching user profile', err)
    //         })
    // })
    // .catch(err => {
    //     throw new Error('Error fetching user id', err)
    })
    res.status(200).redirect('/overview')

}