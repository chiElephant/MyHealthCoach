import React from "react";
import { useRouter } from "next/router";
import strava from "/public/strava/strava_orange.svg";
import Image from "next/image";

export interface StravaProps {
  setUserId: Function,
  setCurrentUser: Function
}

export default function StravaBtn({ setUserId, setCurrentUser }: StravaProps) {
  const router = useRouter();

  const id = process.env.STRAVA_ID;
  const redirectUrl = "http://localhost:3000/api/users/strava";
  const scope = "read";

  const handleLogin = () => {

    router.push(
      `http://www.strava.com/oauth/authorize?client_id=${id}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`
    );
  };

  return (
    <div
      className="item-center h-9 w-full rounded-2xl bg-[#FC4C02] p-1 text-black "
      onClick={() => handleLogin()}
    >
      <Image
        className="h-12 pl-10 pb-4"
        src={strava}
        alt="Login with Strava"
        onClick={() => handleLogin()}
      />
    </div>
  );
}
