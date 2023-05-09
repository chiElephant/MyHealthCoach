import { useState } from "react"

export default function UserMetrics() {
  const [userMetrics, setUserMetrics] = useState <any> ({
    height: 0,
    weight: 0,
    age: 0,
    gender: ""
  })

  const twSettingsInputClass = "w-[30vw] min-h-[1.5rem] lg:w-[20rem] lg:h-12 shadow rounded-xl indent-3 bg-slate-100 focus:outline-none text-black";

  const handleOnChange = function(e: any) {
    e.preventDefault();
    setUserMetrics({
      ...userMetrics,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = function() {

  };

  return (
    <form className="flex w-full h-full items-center">
      <div className="flex flex-col w-full h-full items-center justify-between space-y-3 lg:space-y-5">
        <div className="flex flex-row space-x-5">
          <input
            type="text"
            name="height"
            placeholder="height"
            className={twSettingsInputClass}
            onChange={handleOnChange}
          >
          </input>

          <input
            type="text"
            name="weight"
            placeholder="weight"
            className={twSettingsInputClass}
            onChange={handleOnChange}
          >
          </input>
        </div>

        <div className="flex flex-row space-x-5">
          <input
            type="text"
            name="age"
            placeholder="age"
            className={twSettingsInputClass}
            onChange={handleOnChange}
          >
          </input>

          <input
            type="text"
            name="gender"
            placeholder="gender"
            className={twSettingsInputClass}
            onChange={handleOnChange}
          >
          </input>
        </div>

        <button className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-[10rem]">
          Submit
        </button>
      </div>
    </form>
  )
}

 UserMetrics