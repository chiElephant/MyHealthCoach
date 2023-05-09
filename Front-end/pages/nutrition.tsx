// @ts-nocheck

import React, { useState, useRef, useEffect } from "react";
import CaloriesWidget from "../components/nutrition/CaloriesWidget";
import FoodList from "../components/nutrition/FoodList";
import EditItemModal from "../components/nutrition/EditItemModal";
import RemoveItemModal from "../components/nutrition/RemoveItemModal";
import foodData from "../mocks/foodData.json";
import Modal from "../components/nutrition/Modal";
import { ChildProps } from "../components/Layout";
import { MdRestaurant } from "react-icons/md";


interface FoodDataType {
  CAL: string,
  FAT: string,
  SFAT: string,
  TFAT: string,
  CHOL: string,
  SALT: string,
  CARB: string,
  FBR: string,
  SGR: string,
  PRO: string,
  ITEM: string,
  CATEGORY: string
}

const Nutrition = ({
  userId,
  currentDate,
  setTitle,
  setIcon,
  setShowCalendar,
  setShowReportButtons
}: ChildProps) => {
  const [pendingItem, setPendingItem] = useState<FoodDataType>({} as FoodDataType);
  const [isEditShowing, setIsEditShowing] = useState<boolean>(false);
  const [isRemoveShowing, setIsRemoveShowing] = useState<boolean>(false);
  const [allFoods, setAllFoods] = useState<any>(foodData);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  }

  const updateCalories = (foods : []) => {
    let calculatedCalories : number = 0;
    foods.map((food : FoodDataType) => {
      calculatedCalories += Number(food.CAL);
    })
    return calculatedCalories;
  }

  useEffect(() => {
    setTitle("Nutrition");
    setIcon((prevState: any) => MdRestaurant);
    setShowCalendar(true);
    setShowReportButtons(false);
  }, [setTitle, setIcon, setShowCalendar]);

  const [calories, setCalories] = useState<any>(updateCalories(allFoods));

  return (
    <>
      {/* <Header currentDate={currentDate} setCurrentDate={setCurrentDate} title='Nutrition' Icon={GiForkKnifeSpoon}/> */}
      {/* <div className="flex justify-between flex-row mb-10 w-auto">
        <div className="flex flex-row">
          <GiForkKnifeSpoon className="text-3xl mr-2"/>
          <div className="text-3xl">Nutrition</div>
        </div>
        <div className="inline-flex">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            Prev
          </button>
          <p className="flex items-center ml-5 mr-5">Today</p>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
            Next
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between p-2 w-auto"> */}
      <div className="grid grid-cols-[25%_75%]">
        <CaloriesWidget handleShowModal={handleShowModal} calories={calories}/>
          {isRemoveShowing ?
          <RemoveItemModal
          pendingItem={pendingItem}
          setIsRemoveShowing={setIsRemoveShowing}
          setCalories={setCalories}
          setAllFoods={setAllFoods}
          allFoods={allFoods}
          calories={calories}/>
          : null}
          {isEditShowing ?
          <EditItemModal
          pendingItem={pendingItem}
          setIsEditShowing={setIsEditShowing}
          setCalories={setCalories}
          setAllFoods={setAllFoods}
          allFoods={allFoods}
          calories={calories}/>
        : null}
        <FoodList foodData={allFoods} setPendingItem={setPendingItem} setIsRemoveShowing={setIsRemoveShowing} setIsEditShowing={setIsEditShowing}/>
        {
        showModal ? ( <Modal showModal={handleShowModal} date={currentDate} user={userId}/>) : ( null )
      }
      </div>
    </>
  )
}

export default Nutrition;
