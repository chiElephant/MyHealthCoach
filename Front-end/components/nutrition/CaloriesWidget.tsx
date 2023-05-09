// @ts-nocheck
import React, { useState } from "react";

interface CaloriesProp {
calories: number,
handleShowModal: Function
}

const CaloriesWidget = ({handleShowModal, calories} : CaloriesProp) => {

  return (
    // <>
    // <div className="caloriesWidget">
    //   <div className="flex items-center justify-center p-2 max-w-sm mx-auto bg-gray-300 rounded-xl shadow-lg space-x-5 w-48">
    //     <div>
    //       <div className="flex flex-col items-center justify-center bg-white rounded-xl">
    //         <div className="p-8">
    //         <div className="text-sm font-medium text-black flex justify-center truncate">calories gained</div>
    //         <div className="italic text-sm font-medium text-black flex justify-center">(estimated)</div>
    //       </div>
    //       <p className="p-4 text-3xl text-black flex justify-center">{calories}</p>
    //     <button
    //     className="bg-white hover:bg-green-700 text-black text-3xl py-2 px-4 rounded-full border border-black w-32 h-7 flex justify-center items-center mb-4 shadow"
    //     onClick={prompter}
    //     >
    //       +
    //     </button>
    //     </div>
    //     </div>
    //   </div>
    // </div>
    // </>
    <div className="max-w-xxs min-w-min max-h-calories overflow-hidden rounded-lg shadow-lg bg-gray-300 flex flex-col justify-self-center text-black">
      <div className="h-4.5/6 rounded-lg bg-white shadow-inner m-3 flex flex-col justify-center items-center text-center overflow-hidden">
        <p className='text-sm p-6'>Calories Gained (Estimate)</p>
        <b className='text-4xl p-6'>{calories}</b>
      </div>
    <button className="w-11/12 mx-2 bg-white text-black hover:bg-gray-200 font-bold py-2 px-4 rounded-3xl static"
          onClick={() => {
            handleShowModal();
          }}> + </button>
  </div>
  )
};

export default CaloriesWidget;
