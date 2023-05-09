import React, { useContext } from 'react';
import Image from 'next/image'
import fitbit from '/public/fitbit/Fitbit_Logo_White_RGB.png'
import { useRouter } from 'next/router';

export interface FitbitProps {
  setUserId: Function,
  setCurrentUser: Function,
}

export default function FitbitBtn({ setUserId, setCurrentUser }:  FitbitProps) {
  const router = useRouter()

  const handleLogin = () => {
    const client_id = process.env.FITBIT_ID
    const scope = process.env.FITBIT_SCOPE
    const response_type = process.env.FITBIT_RESPONSE_TYPE

    router.push(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${client_id}&scope=${scope}`)
  }

  return (
    <div className="h-9 w-full bg-[rgb(74_170_184)] rounded-2xl text-white text-center" onClick={() => handleLogin()}>
       <Image
        className=" h-7 w-36 ml-[42px] mt-[4px] rounded-l-2xl"
        src={fitbit}
        alt="Login with Fitbit"
        />
    </div>
  )
}