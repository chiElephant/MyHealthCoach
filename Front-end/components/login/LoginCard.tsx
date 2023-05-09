import Script from 'next/script';
import GoogleBtn from './GoogleBtn';
import LoginForm from './LoginForm';
import StravaBtn from './StravaBtn';
import FitbitBtn from './FitbitBtn';
import { useRouter } from 'next/router';

export interface LoginProps {
  setUserId: Function;
  setGoogle: Function;
  google: boolean,
  setCurrentUser: Function
}

export default function LoginCard({ setUserId, setGoogle, google, setCurrentUser }: LoginProps) {
  const router = useRouter();

  const loginCardLg =
    "text-black dark:text-white bg-LoginGray dark:bg-slate-600 flex flex-col items-center h-full p-2";
  const signUpBtnLg =
    "h-9 w-full bg-white rounded-2xl text-black p-1 text-center font-light";

  return (
    <div>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => {
          setGoogle(true);
        }}
      />

      <div className={`${loginCardLg} flex flex-col justify-center items-center space-y-5`}>
        <div className='flex flex-col justify-center'>
          <LoginForm setUserId={setUserId}/>
        </div>

        {/* <a className={signUpBtnLg} href="/Signup">
          Sign up with email
        </a> */}
        <hr className='w-full dark:bg-black'></hr>

        <div className='flex lg:w-full flex-col justify-center items-center space-y-2'>
          <button className={signUpBtnLg} onClick={() => router.push('/Signup')}> Sign up with email </button>
          <StravaBtn setUserId={setUserId} setCurrentUser={setCurrentUser}/>
          <FitbitBtn setUserId={setUserId} setCurrentUser={setCurrentUser}/>
          <GoogleBtn init={google} setUserId={setUserId} setCurrentUser={setCurrentUser}/>
        </div>
      </div>
    </div>
  );
}
