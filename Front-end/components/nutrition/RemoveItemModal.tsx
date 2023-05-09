// @ts-nocheck
import { setMaxListeners } from "events";

interface pendingItemType {
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

interface RemoveItemProps {
  pendingItem: pendingItemType,
  setAllFoods: any,
  setCalories: any,
  setIsRemoveShowing: Function,
  allFoods: pendingItemType[],
  calories: number
}

const RemoveItemModal = ({pendingItem, setAllFoods, setCalories, setIsRemoveShowing, allFoods, calories} : RemoveItemProps) => {
  // const modalStyling = {
  //   position: "fixed",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   backgroundColor: "#FFF",
  //   padding: "50px",
  //   zIndex: "1000"
  // }

  return (
    <>
      <div style={{position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFF",
        padding: "50px",
        zIndex: "1000"}} className="shadow-2xl">
        {/* <GrClose className="absolute top-2 right-2"/> */}
        <p>{`Are you sure you want to remove ${pendingItem.ITEM}?`}</p>
        <div className="p-10 flex flex-row justify-center">
          <button className="mr-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={() => setIsRemoveShowing(false)}>
            Cancel
          </button>
          <button className="ml-2 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          onClick={() => {
            let newFoodsList = [];

            for(let item in allFoods){
              if(allFoods[item].ITEM !== pendingItem.ITEM){
                newFoodsList.push(allFoods[item]);
              }
            }

            setIsRemoveShowing(false);
            setAllFoods(newFoodsList);
            setCalories(prevCalories => calories - pendingItem.CAL);

          }}>
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default RemoveItemModal;