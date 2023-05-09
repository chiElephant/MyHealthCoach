import { useRef } from "react";

import { MdClose } from "react-icons/md";

export default function CompletedModal({ toggleCompletedModal, completeSet, setID }: any) {
  const actualRef: any = useRef();

  return (
    <div>
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={toggleCompletedModal}
      ></div>

      <div
        className="fixed top-[50%] left-[50%] z-50 flex h-[35%] lg:w-[40%] sm:w-[90%] translate-x-[-50%]
      translate-y-[-50%] flex-col items-center rounded-3xl dark:bg-slate-500 bg-gray-300 pl-10 pr-10"
      >
        <div className="header flex w-[100%] flex-row items-center justify-between pt-4 pb-4">
          <h1 className="title text-[2rem] font-bold"> Complete Set? </h1>
        </div>

         <div className="bg-gray-500 dark:bg-gray-700 flex flex-col rounded-2xl h-[45%] lg:w-full sm:w-[300px] justify-around items-center overflow-y-scroll no-scrollbar shadow-[inset_0_2px_5px_0_#404040]">
          <div className="flex bg-slate-200 lg:py-5 sm:py-3 px-5 lg:w-10/12 sm:w-[280px] rounded-2xl justify-center">
            <h2 className="font-bold mr-3 lg:text-[1rem] sm:text-[0.85rem] text-center text-black"> Actual Reps Completed: </h2>
            <input className="rounded-md shadow-md bg-slate-50 text-black" type="number" ref={actualRef}></input>
          </div>
         </div>

         <div className="flex lg:w-full sm:w-[310px] justify-between items-center lg:mb-0 sm:mb-4 mt-4 bg-gray-500 dark:bg-gray-700 rounded-full shadow-[inset_0_2px_5px_0_#404040]">
          <button className="bg-blue-500 hover:bg-blue-400 text-slate-50 w-5/12 rounded-full px-10 py-4 font-bold my-3 ml-3 shadow-md" onClick={() => { completeSet( actualRef.current.value, setID ) }}> Confirm </button>
          <button className="bg-blue-500 hover:bg-blue-400 text-slate-50 w-5/12 rounded-full px-10 py-4 font-bold my-3 mr-3 shadow-md" onClick={toggleCompletedModal}> Cancel </button>
         </div>

      </div>
    </div>
  );
}
