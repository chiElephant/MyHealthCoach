// @ts-nocheck

import Image from 'next/image'
import { useState } from 'react'
import { MdClose } from "react-icons/md";

interface FoodCardModalProps {
  info: Object
}


const FoodCardModal = ({ listId, info, removeSelection }) => {

  // info.unit = "Gram";
  // info.grams = 1;
  let selectedIndex = 0;
  info.measures.forEach((measure, index) => {
    if (measure.label === "Gram") {
      selectedIndex = index;
    }
  })

  const [amount, setAmount] = useState(0)
  const [unit, setUnit] = useState({
    label: "Gram",
    grams: 1
  })

  const handleAmountChange = (e) => {
    // console.log(e.target.value)
    setAmount(Number(e.target.value));
    info.amount = Number(e.target.value);
    if(!info.unit) {
      info.totalGrams = amount * 10;
      info.totalCalories = Math.round(info.totalGrams*info.food.nutrients.ENERC_KCAL/100)
    } else if (info.unit) {
      info.totalGrams = info.amount * info.grams;
      info.totalCalories = Math.round(info.totalGrams*info.food.nutrients.ENERC_KCAL/100)
    }
  }

  const handleUnitChange = (e) => {
    // console.log(e.target.value)
    let split = e.target.value.split(",")
    let label = split[0];
    let split2 = split[1].split(" ")
    // console.log(split2);
    let grams = split2[1]
    setUnit({
      label: label,
      grams: grams
    });
    info.unit = label;
    info.grams = Number(grams);
    // info.totalCalories = Math.round(amount*unit.grams*info.food.nutrients.ENERC_KCAL/100)
    // info.totalGrams = Math.round(amount*unit.grams);
    // console.log(info.amount);
    // info.totalGrams = info.grams*info.amount;
    // info.totalCalories = Math.round(info.totalGrams*info.food.nutrients.ENERC_KCAL/100);
  }

  return (
    <div className="flex flex-row justify-between items-center border space-x-8 my-3 bg-white rounded-lg px-4 py-4 w-full">
      {
        info.food.image ? (
          <Image src={info.food.image} alt='' width={90} height={90} className="rounded-full"/>
        ) : (
          <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt='' width={90} height={90} className="rounded-full"/>
        )
      }
      <div className="flex flex-col">
        <div>{info.food.label}</div>
        <div>{Math.round(info.food.nutrients.ENERC_KCAL)} Kcal/100g</div>
      </div>
      {
        typeof(amount) === 'number' && amount > 0 ? (
          <div>Calculated calories: {Math.round(amount*unit.grams*info.food.nutrients.ENERC_KCAL/100)} Kcal</div>
        ) : (
          <div>Please enter amount</div>
        )
      }
      <div className="flex flex-col">
        <form>
          <label>Amount</label>
          <input placeholder="enter number in grams" className="shadow-lg w-6/10 h-6 rounded-lg mb-3 ml-3 bg-white dark:bg-white" onChange={(e) => {
            handleAmountChange(e)
          }}></input>
        </form>
        <form>
          <label>Unit</label>
          <select defaultValue="Gram, 1 grams" className="shadow-lg w-6/10 h-6 rounded-lg ml-10 bg-white dark:bg-white" onChange={(e) => {
            handleUnitChange(e)
          }}>
            {
              info.measures.map((unit: any, index: number) => {
                if (index === selectedIndex) {
                  return (
                    <option key={index} selected>{unit.label}, {Math.round(unit.weight)} grams</option>
                  )
                } else {
                  return(
                    <option key={index}>{unit.label}, {Math.round(unit.weight)} grams</option>
                  )

                }
              })
            }
          </select>
        </form>
      </div>
      <MdClose
        className="text-[1.25rem] cursor-pointer rounded-full hover:bg-gray-300"
        onClick={() => {
          // console.log(key);
          removeSelection(listId);
        }}
      />
    </div>
  )
}

export default FoodCardModal;