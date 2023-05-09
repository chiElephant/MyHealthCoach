import { useState, useRef } from 'react';
import { MdClose } from "react-icons/md";

export default function LoginConfirmModal({ setLoginConfirm }: any) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => { setLoginConfirm(false) }}></div>

      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-300 dark:bg-gray-500 z-50
      flex flex-col items-center lg:w-[30%] sm:w-[95%] h-[30%] rounded-3xl pl-10 pr-10">

         <div className="w-[100%] header flex flex-row justify-between pt-4 pb-1 items-center">
          <div className="title text-[2rem] font-bold"> Whoops! </div>
         </div>

         <div className="bg-slate-50 dark:bg-slate-400 flex rounded-2xl h-[50%] w-full justify-around items-center overflow-y-scroll no-scrollbar shadow-well">
          <p className="text-xl text-center"> Must be logged in to add exercises. </p>
         </div>

        <button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full w-full px-10 py-4 font-bold mt-2 lg:mb-0 sm:mb-2 shadow-md"
                onClick={() => { setLoginConfirm(false) }}> OK </button>

      </div>
    </div>
  )
};