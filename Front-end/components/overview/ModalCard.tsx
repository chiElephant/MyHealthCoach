import { useState } from "react";
import { MdOutlineFitnessCenter } from "react-icons/md";

interface ModalCardProps {
  newExerciseInfo: any;
  setNewExerciseInfo: any;
  handleSubmit: any;
}

export default function ModalCard({
  newExerciseInfo,
  setNewExerciseInfo,
  handleSubmit,
}: ModalCardProps) {
  const [numberOfSets, setNumberOfSets] = useState(1);
  const [multipleGoals, setMultipleGoals] = useState(false);

  const handleChange = (e: any) => {
    setNewExerciseInfo((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    e.preventDefault();
  };

  const handleSetsSelectClick = (e: any) => {
    setNumberOfSets(parseInt(e.target.value));
  };

  const handleRadioClick = (e: any) => {
    if (e.target.value === "same") {
      setMultipleGoals(false);
      setNumberOfSets(1);
    } else {
      setMultipleGoals(true);
    }
  };

  return (
    <form className="container mb-5 flex h-[30rem] w-[100%] flex-row items-center justify-between bg-gray-300 p-5 last:mb-0">
      <div className="flex basis-[10%] justify-center">
        <MdOutlineFitnessCenter className="text-[4rem]" />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col pb-3">
          <label className="flex pr-2 pb-1 text-sm font-bold">Exercise</label>

          <input
            className="focus:shadow-outline w-[10rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
            name="name"
            type="text"
            placeholder="Exercise"
            value={newExerciseInfo.name}
            onChange={handleChange}
          ></input>
        </div>

        <div className="flex flex-col">
          <label className="block pr-2 pb-1 text-sm font-bold">
            Estimated Calorie Burn
          </label>

          <input
            className="focus:shadow-outline w-[10rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
            name="calorie"
            type="text"
            placeholder="Calorie"
            value={newExerciseInfo.calorie}
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <fieldset className="flex flex-row">
        <legend> </legend>
        <div className="pr-2">
          <label className="block text-sm font-bold"> Same Weight</label>
          <input
            onClick={handleRadioClick}
            type="radio"
            name="goals"
            value="same"
            className="focus:shadow-outline h-10 w-[5rem] appearance-none rounded border bg-gray-400 py-2 px-3 leading-tight shadow checked:bg-yellow-400 focus:outline-none"
          ></input>
        </div>

        <div>
          <label className="block text-sm font-bold"> Different Weights </label>
          <input
            onClick={handleRadioClick}
            type="radio"
            name="goals"
            value="different"
            className="focus:shadow-outline h-10 w-[5rem] appearance-none rounded border bg-gray-400 py-2 px-3 leading-tight shadow checked:bg-yellow-400 focus:outline-none"
          ></input>
        </div>
      </fieldset>

      {!multipleGoals && (
        <div>
          <div className="flex h-[100%] flex-col justify-between">
            <div className="flex flex-row items-center justify-between pb-2">
              <label className="block pr-2 text-sm font-bold">Weight</label>

              <input
                className="focus:shadow-outline w-[5rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
                name="weight"
                type="text"
                placeholder="Weight"
                value={newExerciseInfo.weight}
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row items-center justify-between pb-2">
              <label className="block text-sm font-bold">Sets</label>
              <input
                className="focus:shadow-outline w-[5rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
                name="sets"
                type="text"
                placeholder="Sets"
                value={newExerciseInfo.sets}
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-row items-center justify-between">
              <label className="block text-sm font-bold">Reps</label>
              <input
                className="focus:shadow-outline w-[5rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
                name="reps"
                type="text"
                placeholder="Reps"
                value={newExerciseInfo.reps}
                onChange={handleChange}
              ></input>
            </div>
          </div>
        </div>
      )}

      {multipleGoals && (
        <div className="flex flex-col items-center">
          <div>
            <label className="block text-sm font-bold">Sets</label>
            <select
              onChange={handleSetsSelectClick}
              className="w-[5rem] rounded border bg-white py-2 px-3 leading-tight shadow"
            >
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="5"> 5 </option>
            </select>
          </div>

          {[...Array(numberOfSets)].map((set, index) => {
            return (
              <div
                key={index}
                className="flex h-[100%] flex-row justify-between"
              >
                <div className="flex flex-row items-center justify-between pb-2">
                  <div className="mt-5 flex items-center pr-1">
                    Set {index + 1}
                  </div>

                  <div className="flex flex-col">
                    <label className="block pr-2 text-sm font-bold">
                      {" "}
                      Weight{" "}
                    </label>
                    <input
                      className="focus:shadow-outline w-[5rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
                      name="weight"
                      type="text"
                      placeholder="Weight"
                      value={newExerciseInfo.weight}
                      onChange={handleChange}
                    ></input>
                  </div>

                  <div className="flex flex-col">
                    <label className="block text-sm font-bold"> Reps </label>
                    <input
                      className="focus:shadow-outline w-[5rem] appearance-none rounded border bg-white py-2 px-3 leading-tight shadow focus:outline-none"
                      name="reps"
                      type="text"
                      placeholder="Reps"
                      value={newExerciseInfo.reps}
                      onChange={handleChange}
                    ></input>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
}
