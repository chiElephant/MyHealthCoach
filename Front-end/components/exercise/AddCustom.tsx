/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const AddCustom = ({
  handleFetchCustom,
  user_id,
  muscle_groups,
}: any): JSX.Element => {
  const [customExercise, setCustomExercise] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const hanleMakeNewCustomExercise = async () => {
    try {
      const res = await axios.post(
        `${String(
          process.env.BACKEND_URL
        )}/exercise/custom/create?user_id=${user_id}&custom_exercise=${customExercise}&muscle_group_id=${
          selectedOption.value
        }`
      );
      handleFetchCustom();
      setCustomExercise("");
    } catch (error) {
      console.log(error);
    }
  };

  const options = muscle_groups.map((item) => {
    const { muscle_group, muscle_group_id } = item;

    return { label: muscle_group, value: muscle_group_id };
  });

  console.log(selectedOption);

  return (
    <div className="flex flex-col">
      <p1 className="py-3 text-2xl dark:text-white">
        Don't see an exercise? Make your own!
      </p1>

      <div>
        <Select
          className="w-[200px] text-xl"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <input
        className="focus:shadow-outline my-2 h-[4rem] rounded bg-white px-2 text-xl leading-tight shadow focus:outline-none sm:w-auto "
        id="search"
        type="text"
        placeholder="Enter custom exercise"
        value={customExercise}
        onChange={(e) => {
          setCustomExercise(e.target.value);
        }}
      ></input>
      <button
        className="rounded border border-gray-400 bg-white  p-2 text-center text-lg font-semibold text-gray-800 shadow  hover:bg-blue-200 sm:w-auto sm:overflow-auto md:w-[300px]"
        onClick={() => hanleMakeNewCustomExercise()}
      >
        Add Custom Exercise
      </button>
    </div>
  );
};

export default AddCustom;
