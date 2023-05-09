import { prependListener } from "process";
import { useState, MouseEventHandler } from "react";
import { MdClose } from "react-icons/md";
import ModalCard from "./ModalCard";

interface ModalProps {
  open: Boolean;
  setIsOpen: any;
  cards?: any;
  setExercises?: any;
  setNutrition?: any;
}

export default function Modal({
  open,
  setIsOpen,
  cards,
  setExercises,
}: ModalProps) {
  const [newExerciseInfo, setNewExerciseInfo] = useState({
    name: "",
    calorie: "",
    weight: "",
    sets: "",
    reps: "",
    completed: false,
  });

  if (!open) return null;

  const handleSubmit = () => {
    console.log(newExerciseInfo);
  };

  const handleClose = () => {
    setNewExerciseInfo((prevState: any) => ({
      name: "",
      calorie: "",
      weight: "",
      sets: "",
      reps: "",
      completed: false,
    }));
  };

  const handleAddExercise = () => {
    let exerciseObj = {
      text: newExerciseInfo.name,
      calorie: parseInt(newExerciseInfo.calorie),
      weight: parseInt(newExerciseInfo.weight),
      sets: newExerciseInfo.sets,
      reps: newExerciseInfo.reps,
      completed: newExerciseInfo.completed,
    };

    setExercises((prevState: any) => {
      let currentState = [exerciseObj, ...prevState];
      return currentState;
    });

    setIsOpen(false);
    handleSubmit();
    handleClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50"></div>

      <div
        className="fixed top-[50%] left-[50%] z-50 flex h-[80%] w-[70%] translate-x-[-50%]
      translate-y-[-50%] flex-col items-center rounded-3xl bg-gray-300 pl-10 pr-10 text-black"
      >
        <div className="header flex w-[100%] flex-row items-center justify-between pt-4 pb-4">
          <div className="title text-[2rem] font-bold"> Exercise Search </div>
          <MdClose
            className="cursor-pointer text-[2rem]"
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className="search flex w-[100%] flex-row pb-6">
          <input
            className="focus:shadow-outline h-[4rem] w-full rounded bg-white py-2 px-3 text-xl leading-tight shadow focus:outline-none"
            id="search"
            type="text"
            placeholder="Seach by name or body part"
          ></input>
        </div>

        <div className="modalCardContainer flex w-[100%] flex-col overflow-hidden overflow-y-scroll border bg-gray-500 p-5 scrollbar-hide">
          <ModalCard
            newExerciseInfo={newExerciseInfo}
            setNewExerciseInfo={setNewExerciseInfo}
            handleSubmit={handleSubmit}
          />
        </div>

        <div className="buttonContainer flex w-[50%] justify-between p-5">
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={handleAddExercise}
          >
            {" "}
            Add Exercise{" "}
          </button>
          <button
            className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
            onClick={() => setIsOpen(false)}
          >
            {" "}
            Add and Mark As Completed{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
