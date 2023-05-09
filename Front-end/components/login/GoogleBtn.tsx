import React, { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import axios from "axios";
import styles from "../../styles/Login.module.css";
import { BsFullscreen } from "react-icons/bs";

interface GoogleProps {
  init: boolean;
  setUserId: Function;
  setCurrentUser: Function
}

export default function GoogleBtn({ init, setUserId, setCurrentUser }: GoogleProps) {
  const router = useRouter();

  async function handleResponse(googleResponse: any) {
    const token: any = await googleResponse.credential;
    const payload: any = jwt_decode(token);

    axios
      .get(`${process.env.LOCAL}/api/users/googleAuth?auth_id=${payload.sub}`)

      .then(response => {
        console.log('Line24', response.data.id)
        if (response.data === '') {

            const newUser: any = {
              'auth_id': payload.sub,
              'firstname': payload.given_name,
              'lastname': payload.family_name,
              'email': payload.email,
              'user_password': null,
              'weight_lbs': null,
              'height_inches': null,
              'sex': null,
              'profile_pic': payload.picture
            }

          axios.post(`${process.env.LOCAL}/api/users/addUser`, newUser)
          .then(response => {
            if (response.data.id !== 0) {
                setUserId(response.data.id)
                setCurrentUser(response.data)
                router.push('/overview')
            }
          })
        }
        if (response.data.id) {
          setCurrentUser(response.data)
          setUserId(response.data.id)
          router.push('/overview')
        }
      })
      .catch((err) => console.log(err));
  }

    if(init) {
      const google = (window as any).google;

      google.accounts.id.initialize({
        client_id: process.env.CLIENT_ID,
        context: "signin",
        ux_mode: "popup",
        callback: handleResponse,
      });

      google.accounts.id.renderButton(document.getElementById("google_btn"), {
        shape: "pill"
      });
    }

  return (
    <div className="flex w-full p-0 justify-center" id="google_btn"/>
  )
}
