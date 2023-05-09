import styles from "../../styles/Exercise.module.css"
import { useState } from "react"
import axios from 'axios'

import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { GiMuscleUp } from "react-icons/gi";

export default function ExerciseItem ({ exercise, toggleEditModal, deleteExercise, toggleCompletedModal, toggleAddSetModal, completeExercise } : any) {

  return (
    <div className="lg:h-[310px] sm:h-[48%] rounded-lg shadow-xl bg-gray-200 dark:bg-slate-600 x-5 lg:mt-8 sm:mt-4 flex flex-col">

      <header className="flex w-full dark:bg-slate-500 bg-gray-400 text-white justify-between items-center font-bold rounded-t-lg">

        <div className="flex items-center py-3 justify-around lg:w-[45%] sm:w-[80%] truncate">
          <h1 className="text-2xl text-left pl-5 w-full">{exercise.exercise}
            <span className="text-lg border-l-2 ml-2 pl-2"> {exercise.muscle_group} </span>
          </h1>
        </div>

        <div className="flex mr-3">
          <AiOutlineEdit size={25} className="cursor-pointer" onClick={ () => { toggleEditModal(exercise.id) }}/>
          <AiOutlineDelete size={25} className="ml-2 cursor-pointer" onClick={ () => { deleteExercise(exercise.id) }}/>
        </div>
      </header>

      <section className="grid h-[250px] w-full lg:grid-cols-[25%_40%_35%] sm:grid-cols-[65%_35%]">
        <img
          className="aspect-square w-[225px] place-self-center rounded-lg bg-gray-300 shadow-md sm:hidden lg:block"
          alt="exercise-image"
          src={exercise.photo_url}
        ></img>

        <div className="pb-2 pt-3 lg:pl-0 sm:pl-2 lg:h-[245px] sm:h-[98%]">

            <div className="bg-gray-500 dark:bg-gray-700 flex flex-col items-center rounded-2xl h-full overflow-y-scroll no-scrollbar shadow-[inset_0_2px_8px_0_#404040]">

            {exercise.sets?.map( (exercise: any) => {
              return <button className={`bg-slate-50 hover:bg-slate-300 w-[95%] rounded-2xl py-3 text-center shadow-md mx-2 my-2 text-black font-bold ${exercise.reps_actual && 'bg-green-500 hover:bg-green-500 text-slate-50'}`}
              onClick={ () => { toggleCompletedModal(exercise.set_id) }}
              key={exercise.set_id}
              disabled={ exercise.reps_actual ? true : false }
              > {exercise.reps} Reps | {exercise.weight_lbs} lbs | Actual: {exercise.reps_actual} </button>
            })}

            </div>

        </div>

        <div className="flex flex-col items-center justify-around lg:h-[250px] px-2 relative">

          <p className="font-bold justify-self-center sm:text-[0.85rem] lg:text-[1rem] text-center"> Estimated Calories Burned: {exercise.est_cals_burned}</p>

          <div className="flex flex-col w-full h-[45%] justify-evenly">

          { !exercise.is_complete &&
            <button className="bg-slate-50 hover:bg-slate-300 px-5 py-2 w-full rounded-full shadow-lg self-center font-bold text-black" onClick={ () => {toggleAddSetModal(exercise.id)}}> Add Set </button>
          }

          { exercise.is_complete ?
            <p className='bg-green-500 shadow-lg rounded-full w-full h-[40%] font-bold text-slate-50 flex justify-center items-center cursor-default'> Completed </p> :
            <button className="bg-blue-500 hover:bg-blue-600 shadow-lg rounded-full w-full h-[40%] font-bold text-slate-50"
                  onClick={ () => { completeExercise(exercise.id) }}> Complete
            </button>}

          </div>
        </div>
      </section>
    </div>
  );
}
