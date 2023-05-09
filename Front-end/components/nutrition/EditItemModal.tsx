// @ts-nocheck
import React, { useState } from "react";

type prevServing = number;

interface FoodDataType {
  CAL: string;
  FAT: string;
  SFAT: string;
  TFAT: string;
  CHOL: string;
  SALT: string;
  CARB: string;
  FBR: string;
  SGR: string;
  PRO: string;
  ITEM: string;
  CATEGORY: string;
}

interface EditItemType {
  pendingItem: FoodDataType;
  setAllFoods: any;
  setCalories: Function;
  setIsEditShowing: Function;
  allFoods: FoodDataType[];
  calories: number;
}

const EditItemModal = ({
  pendingItem,
  setAllFoods,
  setCalories,
  setIsEditShowing,
  allFoods,
  calories,
}: EditItemType) => {
  const [serving, setServing] = useState(1);

  const modalStyling = {
    // position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "50px",
    zIndex: "1000",
  };

  return (
    <>
      <div style={modalStyling} className="shadow-2xl">
        {/* <GrClose className="absolute top-2 right-2"/> */}
        <p>{`How many servings of ${pendingItem.ITEM} will you be consuming?`}</p>
        <input
          type="text"
          className="black outline"
          value={serving}
          onChange={(e) => {
            setServing(Number(e.target.value));
          }}
        />
        <div className="flex flex-row justify-center p-10">
          <button
            className="mr-2 rounded border border-red-500 bg-transparent py-2 px-4 font-semibold text-red-700 hover:border-transparent hover:bg-red-500 hover:text-white"
            onClick={() => setIsEditShowing(false)}
          >
            Cancel
          </button>
          <button
            className="ml-2 rounded border border-green-500 bg-transparent py-2 px-4 font-semibold text-green-700 hover:border-transparent hover:bg-green-500 hover:text-white"
            onClick={() => {
              setIsEditShowing(false);
              setServing(serving);
              setCalories(
                (prevCalories: any) =>
                  calories -
                  (Number(pendingItem.CAL) - Number(pendingItem.CAL) * serving)
              );
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default EditItemModal;

