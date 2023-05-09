// @ts-nocheck

import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import SelectExercises from "./SelectExercises";
import MuscleGroups from "./MuscleGroups";
import AddCustom from "./AddCustom";
import axios from "axios";
// import getDefaultExercises from './libs/getDefaultExercises';

export default function SearchModal({
  toggleAddModal,
  default_exercises,
  muscle_groups,
  user_id,
  query_date,
  handleFetchExercises,
}: any): JSX.Element {
  const [customExercises, setCustomExercises] = useState([]);
  const [showDefault, setShowDefault] = useState(true);
  const [showCustom, setShowCustom] = useState(false);
  const [query, setQuery] = useState("");
  const [toggleState, setToggleState] = useState(1);
  const [fetchCustom, setFetchCustom] = useState(false);

  useEffect(() => {
    const getCustomExercises = async (): Promise<any> => {
      try {
        const { data } = await axios.get(
          `${String(
            process.env.BACKEND_URL
          )}/exercise/custom/list?user_id=${user_id}`
        );

        setCustomExercises(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    void getCustomExercises();
  }, [user_id, fetchCustom]);

  const handleAddExerciseToWorkout = async (exercise_id) => {
    try {
      const res = await axios.post(
        `${String(
          process.env.BACKEND_URL
        )}/exercise/create?user_id=${user_id}&exercise_id=${exercise_id}&log_date=${query_date}`
      );
      toggleAddModal();
      handleFetchExercises();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchCustom = () => {
    setFetchCustom((prevState) => !prevState);
  };

  const all_exercises = [...default_exercises, ...customExercises];

  const filtered_exercises = all_exercises.filter((exercise) =>
    exercise.exercise.toLowerCase().includes(query)
  );

  const filtered_custom_exercises = customExercises.filter((exercise) =>
    exercise.exercise.toLowerCase().includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="lg:shrink-0">
        <div className="flex h-screen max-h-screen  w-screen flex-col rounded-3xl bg-gray-400 pl-10 pr-10  text-black dark:bg-slate-600 lg:h-[900px] lg:w-[1000px]">
          <div className="flex flex-row items-center justify-between pt-4 pb-4">
            <ul className="flex flex-wrap border-b border-gray-200">
              <li className="mr-2">
                <a
                  href="#"
                  aria-current="page"
                  className={
                    toggleState === 1
                      ? "active inline-block rounded-t-lg bg-gray-100 py-4 px-4 text-center text-lg font-bold text-blue-600"
                      : "inline-block rounded-t-lg bg-gray-300 py-4 px-4 text-center text-lg  font-bold text-black  hover:bg-gray-50  dark:bg-slate-500 dark:text-white"
                  }
                  onClick={() => setToggleState(1)}
                >
                  Exercise Search
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  aria-current="false"
                  className={
                    toggleState === 2
                      ? "active inline-block rounded-t-lg bg-gray-100 py-4 px-4 text-center text-lg font-bold text-blue-600"
                      : "inline-block rounded-t-lg bg-gray-300 py-4 px-4 text-center text-lg  font-bold text-black  hover:bg-gray-50  dark:bg-slate-500 dark:text-white"
                  }
                  onClick={() => setToggleState(2)}
                >
                  Custom Exercise
                </a>
              </li>
            </ul>
            <MdClose
              className="cursor-pointer text-[2rem]"
              onClick={toggleAddModal}
            />
          </div>
          {toggleState === 1 && (
            <div className="overflow-auto">
              <div className="search flex w-[100%] flex-row pb-6">
                <input
                  className="focus:shadow-outline h-[4rem] w-full rounded bg-white px-2 text-xl leading-tight shadow focus:outline-none"
                  id="search"
                  type="text"
                  placeholder="Seach by name or body part"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-row justify-center space-x-4 text-center">
                <button
                  className={
                    showDefault
                      ? "w-[200px] rounded border  border-gray-400 bg-purple-200  p-2 text-center text-lg font-semibold text-gray-800 shadow"
                      : "w-[200px] rounded border  border-gray-400 bg-white  p-2  text-center text-lg font-semibold text-gray-800 shadow hover:bg-blue-200"
                  }
                  onClick={() => {
                    setShowDefault(true);
                    setShowCustom(false);
                  }}
                >
                  All Exercises
                </button>
                <button
                  className={
                    showCustom
                      ? "w-[200px] rounded border  border-gray-400 bg-purple-200  p-2 text-center text-lg font-semibold text-gray-800 shadow"
                      : "w-[200px] rounded border  border-gray-400 bg-white  p-2  text-center text-lg font-semibold text-gray-800 shadow hover:bg-blue-200"
                  }
                  onClick={() => {
                    setShowDefault(false);
                    setShowCustom(true);
                  }}
                >
                  Custom Exercises
                </button>
              </div>
              <MuscleGroups
                muscle_groups={muscle_groups}
                clearSearchOnClick={() => setQuery("")}
              />

              {showDefault && (
                <SelectExercises
                  exercises={filtered_exercises}
                  handleAddExerciseToWorkout={handleAddExerciseToWorkout}
                />
              )}
              {showCustom && (
                <SelectExercises
                  exercises={filtered_custom_exercises}
                  handleAddExerciseToWorkout={handleAddExerciseToWorkout}
                />
              )}
            </div>
          )}
          {toggleState === 2 && (
            <AddCustom
              handleFetchCustom={handleFetchCustom}
              user_id={user_id}
              muscle_groups={muscle_groups}
            />
          )}
        </div>
      </div>
    </div>
  );
}
