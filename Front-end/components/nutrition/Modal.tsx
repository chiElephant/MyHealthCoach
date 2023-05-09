// @ts-nocheck
import FoodCardModal from "./FoodCardModal";
import axios from 'axios';
import Image from 'next/image';
import { MdClose } from "react-icons/md";

import { useState, useEffect } from "react";

const appId = process.env.EDAMAM_APPLICATION_ID;
const appKey = process.env.EDAMAM_APPLICATION_KEYS;

const Modal = ({ showModal, date, user }) => {

  const [foodList, setFoodList] = useState([])
  const [search, setSearch] = useState('');
  const [preview, setPreview] = useState([]);
  const [parameters, setParameters] = useState([]);

  const handleParameterChange = () => {

  }

  const handleSearch = (e) => {
    // console.log(e.target.value)
    setSearch(e.target.value);
  }

  const handleSelect = (food) => {
    // axios.get('http://localhost:3000/nutrition/list/foods',{
    //   params: food
    //   })
    //   .then((response) => {
    //     console.log('response: ', response);
    //   })

    setFoodList(foodList.concat([food]));
    setPreview([]);
    document.getElementById('search-form').value = ""
  }

  const handleAdd = () => {
    let foodLog: any = {};
    foodLog.date = date;
    foodLog.consumed = false;
    foodLog.items = foodList;
    foodLog.userId = Number(user);
    console.log(foodLog)
  }

  const handleAddConsumed = () => {
    let foodLog: any = {};
    foodLog.date = date;
    foodLog.consumed = true;
    foodLog.items = foodList;
    console.log(foodLog)
  }

  const removeSelection = (key: any) => {
    if (foodList.length > 1) {
      setFoodList(foodList.splice(key, 1));
    } else if (foodList.length === 1) {
      setFoodList([]);
    }
    // console.log(key)
  }

  useEffect(() => {
    if (search !== '') {
      axios({
        method: 'get',
        url:'/api/search',
        params: {
          ingr: search
        }
      }).then((data) => {
        setPreview(data.data)
      })

    }
  }, [search])


  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => {
        showModal();
      }}></div>
      <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black bg-gray-300 z-50
      flex flex-col items-center w-[70%] h-[80%] rounded-3xl pl-10 pr-10">
        <div className="w-[100%] header flex flex-row justify-between pt-4 pb-4 items-center">
          <div className="title text-[2rem] font-bold"> Food Search </div>
          <MdClose
            className="text-[2rem] cursor-pointer"
            onClick={() => {
              showModal();
            }}
          />
        </div>
        {/* <div id="search-form" className="search w-[100%] flex flex-row pb-6">
          <input className="bg-white shadow rounded w-full h-[4rem] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-xl" id="search" type="text" placeholder="Seach by name or restaurant" onChange={(e) => {
            handleSearch(e)
          }}></input>
        </div> */}
        <form className="w-full">
          <input id="search-form" placeholder="search by name" className="bg-white shadow rounded w-full h-[4rem] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-xl" onChange={(e) => {
            handleSearch(e)
          }}></input>
        </form>

        <div className="z-10 bg-white overflow-y-auto w-full max-h-44 rounded-xl mb-5">
          {
            preview.length > 0 ? (
              preview.map((food: any, index) => {
                return (
                  <div key={index} className=" hover:bg-slate-400 flex flex-row w-full space-x-8 justify-between p-2 items-center border" onClick={(e) => {
                    handleSelect(food);
                  }}>
                    {
                      food.food.image ? (
                        <Image src={food.food.image} alt="" width={50} height={50} className="rounded-full ml-4"/>
                      ) : <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="" width={50} height={50} className="rounded-full ml-4"/>
                    }
                    <div>{food.food.label}</div>
                    <div className="pr-4">{Math.round(food.food.nutrients.ENERC_KCAL)} calories</div>
                  </div>
                )
              })
            ) : (
              null
            )
          }

        </div>
        <div className="overflow-y-auto w-full">
          {
            foodList.map((food, index) => {
              return (
                <FoodCardModal listId={index} key={index} info={food} removeSelection={removeSelection}/>
              )
            })
          }
        </div>
        <div className="space-x-12 mt-5 mb-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            handleAdd();
            showModal();
          }}>Add</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            handleAddConsumed();
            showModal();
          }}>Add as completed</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;