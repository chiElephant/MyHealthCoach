import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Router from  'next/router'
import Head from "next/head";
import LoginCard from "../components/login/LoginCard";
import { ChildProps } from "../components/Layout";
import LoginImage from "public/38501.png";
import Image from "next/image";

const Login = ({ setTitle, setIcon, setShowCalendar, setShowReportButtons, userId, setUserId, currentUser, setCurrentUser  }: ChildProps) => {

  const [google, setGoogle] = useState(false)

  const titleLg =
    "fixed top-[45%] left-[20%] text-black flex flex-col items-center text-6xl";
  const IconLg = "text-black";

  useEffect(() => {
    setTitle("My Health Coach");
    setIcon("");
    setShowCalendar(false);
    setShowReportButtons(false);
  }, [setTitle, setShowCalendar, userId]);

  useEffect(() => {
    setUserId(0)
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full p-3">
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          setGoogle(true);
        }}
      />
      <Head>
        <title>My Health Coach</title>
        <meta
          name="login"
          content="My Health Coach Login, Fitness, Nutrition, Exercise"
        />
        <meta name="google-site-verification" content="d5H1-fc6By3nJIn1pM9axiSz4tO8Z1PORf4L7DSel8s" />
        <link rel="icon" href="/flavion.ico" />
      </Head>
      <main className="bg-LoginGreen flex w-[60rem] h-[30rem] justify-center items-center rounded-2xl shadow-xl">
        <div className="flex grow basis-[60%] h-full justify-center items-center">
          <Image src={LoginImage} alt="Picture" className="object-contain" priority/>
        </div>
        <div className="bg-LoginGray dark:bg-slate-600 flex grow basis-[40%] h-full justify-center items-center rounded-tr-2xl rounded-br-2xl">
          <LoginCard
            setUserId={setUserId}
            setGoogle={setGoogle}
            google={google}
            setCurrentUser={setCurrentUser}/>
        </div>
      </main>
    </div>
  );
};

export default Login;
