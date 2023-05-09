// @ts-nocheck
import React, { useState } from "react";
import FoodCard from "./FoodCard";

interface foodDataType {
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

interface FoodListProps {
  foodData: foodDataType[],
  setPendingItem: Function,
  setIsRemoveShowing: Function,
  setIsEditShowing: Function
}

const FoodList = ({foodData, setPendingItem, setIsRemoveShowing, setIsEditShowing}: FoodListProps) => {
  return (
  <div className="w-3/4">
    {
    foodData.map((food) => {
        return <FoodCard key={food.ITEM} food={food} setPendingItem={setPendingItem} setIsRemoveShowing={setIsRemoveShowing} setIsEditShowing={setIsEditShowing}/>
      })
    }
  </div>
  )
}

export default FoodList;
