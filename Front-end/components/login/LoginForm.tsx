import {
  MdOutlinePassword,
  MdOutlineLogin,
  MdPassword,
  MdSentimentSatisfiedAlt,
} from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import bcrypt from "bcryptjs";
import axios from "axios";

export interface LoginFormProps {
  setUserId: Function
}

export default function LoginForm({ setUserId }: LoginFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState("email");
  const [pswd, setPswd] = useState("password");
  const [pswdType, setPswdType] = useState("password");
  const [pswdErr, setPswdErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [pswdVisible, setPswdVisible] = useState(false);

  function handleChange(e: any, target: string) {
    let value = e.target.value;

    if (target === "email") {
      setEmail(value);
    } else {
      setPswd(value);
    }
  }

  function authenticate() {
    // if(pswd === 'tony') {
    //   setPswdErr(true)
    // } else {
    //   setPswdErr(false)
    // }

    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync('test', salt);
    // console.log(hash)

    //Validate email
    const emailValid = EmailValidator.validate(email);

    if (!emailValid) {
      setEmailErr(true);
    }

    if (emailValid) {
      axios
        .get(`${process.env.BACKEND_URL}/user/email/${email}`)
        // .get(`${process.env.DB_ENDPOINT}/email/${email}`)

        .then((res) => {
          if (Object.keys(res.data).length === 0) {
            router.push("/Signup");
          } else {

            const hash = res.data.user_password;
            const userID =  res.data.id
            console.log(userID, hash)

            if (hash) {
              if (bcrypt.compareSync(pswd, hash)) {
                setUserId(userID)
                router.push("/overview");
                setPswdErr(false);
              } else {
                setPswdErr(true);
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const emailInputLg =
    "bg-white shadow rounded w-full h-[2rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-med text-black font-extralight";
  const pswdInputLg =
    "bg-white shadow rounded-l w-[90%] h-[2rem] px-3 leading-tight focus:outline-none focus:shadow-outline text-med; text-black font-extralight";

  return (
    <form className="w-full flex flex-col items-center">
      <h2 className="text-3xl text-black dark:text-white font-bold">Login</h2>
      <br></br>
      <div className="search flex w-full flex-col">
        <input
          className={emailInputLg}
          type="email"
          placeholder="email"
          onChange={(e) => handleChange(e, "email")}
        ></input>
        <div>
          {!emailErr ? (
            <div key="" className="h-6"></div>
          ) : (
            <p className="h-6 text-xs text-black dark:text-white">
              <span className="font-medium">Um...Hello?</span> That's not an
              email.
            </p>
          )}
        </div>
      </div>
      <div className="search flex w-[100%] flex-row">
        <input
          className={pswdInputLg}
          type={pswdType}
          placeholder="password"
          onChange={(e) => handleChange(e, "pswd")}
        ></input>

        {pswdVisible ? (
          <AiFillEyeInvisible
            key="hidePswd"
            className="rounded-r bg-white text-gray-500 sm:h-[2rem] sm:w-7 sm:pr-1 sm:pl-1"
            onClick={() => {
              setPswdVisible(false);
              setPswdType("password");
            }}
          />
        ) : (
          <AiFillEye
            key="showPswd"
            className="rounded-r bg-white text-gray-500 sm:h-[2rem] sm:w-7 sm:pr-1 sm:pl-1"
            onClick={() => {
              setPswdVisible(true);
              setPswdType("text");
            }}
          />
        )}
        {/* {pswdIcon} */}
      </div>
      <div>
        {!pswdErr ? (
          <div key="" className="h-6"></div>
        ) : (
          <p
            id="outlined_error_help"
            className="h-6 text-xs text-slate-700 dark:text-LoginGray p-1"
          >
            <span className="font-medium">Oh, snapp!</span> Wrong password.
          </p>
        )}
        {/* {pswdErr} */}
      </div>
      <div className="flex w-[100%] flex-row">
        <button
          type="button"
          className="items-start  font-extralight underline hover:text-purple-700"
          onClick={() => authenticate()}
        >
          {/* enter */}
        </button>
        <button
          type="button"
          className="w-full bg-LoginGreen dark:hover:bg-slate-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => authenticate()}
        >
          enter
        </button>
      </div>
    </form>
  );
}
