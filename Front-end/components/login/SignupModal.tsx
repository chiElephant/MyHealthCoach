import { prependListener } from "process";
import { useState, useCallback, useEffect, MouseEventHandler } from "react";
import { EnumDeclaration, setConstantValue, updateExpressionWithTypeArguments } from "typescript";
import bcrypt from "bcryptjs";
import axios from 'axios';
import { useRouter } from "next/router";

export interface SignUpProps{
  setUserId: Function
}

export default function SignupModal({
  setUserId,
}: SignUpProps) {
  const router = useRouter();
  // STATE VALUES
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fnWarn, setFnWarn] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lnWarn, setLnWarn] = useState(false);
  const [email, setEmail] = useState("");
  const [emWarn, setEmWarn] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [password0, setPassword0] = useState("");
  const [password1, setPassword1] = useState("");
  const [pwWarn, setPwWarn] = useState(false);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [healthWarn, setHealthWarn] = useState(false);
  const [sex, setSex] = useState("");
  const [sexWarn, setSexWarn] = useState(false);
  const [windowH, setWindowH] = useState(0);

  // Working Tailwind Styles
  const twModalStyle = `flex flex-col align-top items-start pt-[27px] pb-[27px] pr-[25px] pl-[25px] gap-[7px] bottom-60 relative w-[404px] h-auto bg-LoginGray rounded-3xl shadow-md dark:bg-slate-500`;
  const twSignUpStyle = "w-53 h-auto font-sans not-italic font-bold text-base leading-5 decoration-black flex-auto grow-0";
  const twInputStyle = "w-full h-10 boxShadow-wellShadow flex-none grow-0 rounded-xl indent-3 dark:bg-white text-black";
  const twSubmitStyle = "w-53 h-auto font-sans not-italic font-bold text-base leading-5 decoration-black flex-auto grow-0 underline underline-offset-4 cursor-pointer";

  // Check if first name is valid.
  const firstNameCheck = () => {
    console.log('FIRST NAME: ', firstName);
    return (firstName.length > 1);
  }

  // Check if last name is valid.
  const lastNameCheck = () => {
    console.log('LAST NAME: ', lastName);
    return (lastName.length > 1);
  }

  const emailCheck = () => {
      // return axios.get(`${String(process.env.BACKEND_URL)}/user/email/${email}`).then((response) => {
      //   console.log('RESULT: ', response.data.email);
      //   // setEmailExist(response.data.email.length > 0)
      //   console.log('EMAIL EXIST BEFORE: ', emailExist);

      //   console.log('EMAIL EXIST AFTER: ', emailExist);
      // }).catch((err) => {
      //   console.log('ERROR: ', err);
      // });
      return (email.indexOf('@') !== -1);
  };

  const warnLabel = (str : String) => {
    const twWarnStyle = 'text-xs text-rose-500 font-semibold dark:text-pink-300 font-semibold'
    return (<h4 className={twWarnStyle}>{str}</h4>)
  }

  // Check if email is both valid and nonexistent in db.
  // const emailCheck = () => {
  //   const { data } = await axios.get(
  //     `${String(
  //       process.env.BACKEND_URL
  //     )}/exercise/custom/list?user_id=${user_id}`
  //   );
  //   return (email.indexOf('@') !== -1)
  // }

  // Check if passwords match.
  const passwordCheck = () => {
    return (password0.length > 0 && (password0 === password1));
  }

  // Check if both height and weight are numbers.
  const healthCheck = () => {
    return (height > 0 && typeof height === 'number' && weight > 0 && typeof weight === 'number');
  }

  // Check if sex is valid.
  const sexCheck = () => {
    return (sex !== 'gender' && sex !== undefined && sex.length !== 0);
  }

  // Validity checks. POSTS to db. Redirects when successful.
  const handleSubmit = () => {
    if (firstNameCheck() && lastNameCheck() && passwordCheck() && healthCheck() && sexCheck()) {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password0, salt);

      const sent = {
        auth_id: null,
        firstname: firstName,
        lastname: lastName,
        email: email,
        user_password: hash,
        weight_lbs: weight,
        height_inches: height,
        sex: sex,
      };

      axios({
      method: 'post',
      url: `${String(process.env.BACKEND_URL)}/user/create`,
      headers: {},
      data: sent
      }).then(async (response) => {
        await setUserId(response.data[0].id);
        router.push('/overview');
      });
    }

    if(!firstNameCheck()) {
      setFnWarn(true);
    } else {
      setFnWarn(false);
    }

    if(!lastNameCheck()) {
      setLnWarn(true);
    } else {
      setLnWarn(false);
    }

    if(!emailCheck()) {
      setEmWarn(true);
    } else {
      setEmWarn(false)
    }

    if(!passwordCheck()) {
      setPwWarn(true);
    } else {
      setPwWarn(false);
    }

    if(!healthCheck()) {
      setHealthWarn(true);
    } else {
      setHealthWarn(false);
    }

    if(!sexCheck()) {
      setSexWarn(true);
    } else {
      setSexWarn(false);
    }

    router.push('/Signup')
  }

  return (
    <div className={twModalStyle}>
      <div className={twSignUpStyle}>signup</div>
      <label>personal information</label>
      <input className={twInputStyle} onChange={(e) => { setFirstName(e.target.value); }} placeholder="first name" ></input>
      {fnWarn ? warnLabel('first name not valid') : null}
      <input className={twInputStyle} onChange={(e) => { setLastName(e.target.value); }} placeholder="last name" ></input>
      {lnWarn ? warnLabel('last name not valid') : null}

      <label>account information</label>
      <input className={twInputStyle} onChange={(e) => { setEmail(e.target.value); }} placeholder="email" ></input>
      {emWarn ? warnLabel('email is not valid') : null}
      <input className={twInputStyle} onChange={(e) => { setPassword0(e.target.value); }} placeholder="password" ></input>
      <input className={twInputStyle} onChange={(e) => { setPassword1(e.target.value); }} placeholder="confirm password" ></input>
      {pwWarn ? warnLabel('passwords do not match') : null}

      <label>health metrics</label>
      <input className={twInputStyle} onChange={(e) => { setHeight(Number(e.target.value)); }} placeholder="height (in.)" ></input>
      <input className={twInputStyle} onChange={(e) => { setWeight(Number(e.target.value)); }} placeholder="weight (lbs.)" ></input>
      {healthWarn ? warnLabel('height and weight must be numbers') : null}
      <select className={twInputStyle} onChange={(e) => { console.log(e.target.value); setSex(e.target.value); }}>
        <option value="">gender</option>
        <option value="M">male</option>
        <option value="F">female</option>
        <option value="O">other</option>
        <option value="N">prefer not to say</option>
      </select>
      {sexWarn ? warnLabel('please select gender') : null}

      <a className={twSubmitStyle} onClick={() => {
        handleSubmit();
      }}> submit </a>
    </div>
  );
}