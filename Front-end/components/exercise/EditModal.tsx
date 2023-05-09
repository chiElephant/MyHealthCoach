import { useState, useEffect, useRef } from "react";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

import axios from "axios";
import { resolveProjectReferencePath } from "typescript";

export default function EditModal({
  toggleEditModal,
  workoutID,
  deleteSet,
  sets,
}: any) {
  let setIDs: number[] = [];
  const repRefs: any = useRef([]);
  const weightRefs: any = useRef([]);

  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={() => {
          toggleEditModal(workoutID);
        }}
      ></div>

      <div
        className="fixed top-[50%] left-[50%] z-50 flex h-[60%] translate-x-[-50%] translate-y-[-50%]
      flex-col items-center rounded-3xl bg-gray-300 pl-10 pr-10 dark:bg-slate-500 sm:w-[95%] lg:w-[40%]"
      >
        <div className="header flex w-[100%] flex-row items-center justify-between pt-4 pb-4">
          <div className="title text-[2rem] font-bold"> Edit Exercise </div>
          <MdClose
            className="cursor-pointer text-[2rem]"
            onClick={() => {
              toggleEditModal(workoutID);
            }}
          />
        </div>

        <div className="flex h-[70%] w-full flex-col items-center overflow-y-scroll rounded-2xl bg-gray-500 shadow-well dark:bg-gray-700">
          {sets.map((set: any, i: number) => {
            setIDs.push(set.set_id);

            return (
              <div
                className="my-4 flex w-10/12 flex-col items-center"
                key={set.set_id}
              >
                <h3 className="pb-2 font-bold text-white">Set {i + 1}</h3>
                <div className="flex w-full items-center justify-evenly rounded-full bg-slate-200 py-3 shadow-lg">
                  <label className="text-black"> Reps: </label>
                  <input
                    type="number"
                    className="w-1/6 rounded-lg bg-slate-50 text-black shadow-md"
                    defaultValue={set.reps}
                    ref={(el) => {
                      repRefs.current[i] = el;
                    }}
                  ></input>

                  <label className="text-black"> Weight: </label>
                  <input
                    type="number"
                    className="w-1/6 rounded-lg bg-slate-50 text-black shadow-md"
                    defaultValue={set.weight_lbs}
                    ref={(el) => {
                      weightRefs.current[i] = el;
                    }}
                  ></input>

                  <button
                    className="rounded-full bg-red-500 py-2 px-2 text-white shadow-lg hover:bg-red-400"
                    onClick={() => {
                      deleteSet(set.set_id);
                    }}
                  >
                    {" "}
                    <MdDeleteOutline />{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="mt-4 w-4/6 rounded-full bg-blue-500 px-10 py-4 font-bold text-slate-50 shadow-lg hover:bg-blue-400 sm:mb-4 lg:mb-0"
          onClick={() => {
            toggleEditModal(
              workoutID,
              repRefs.current,
              weightRefs.current,
              setIDs
            );
          }}
        >
          {" "}
          Confirm Changes{" "}
        </button>
      </div>
    </div>
  );
}
