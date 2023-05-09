import axios from "axios";

interface ExerciseAndNutritionCardProps {
  idx: number;
  type: string;
  name: string;
  calorie: number;
  sets?: number;
  reps?: number;
  weight?: number;
  portion?: number;
  completed: boolean;
  setExercises?: any;
  setNutrition?: any;
  userId: any
}

export default function Card({
  idx,
  type,
  name,
  calorie,
  sets,
  reps,
  weight,
  portion,
  completed,
  setExercises,
  setNutrition,
  userId
}: ExerciseAndNutritionCardProps) {
  let bgColor;
  if (completed) {
    bgColor = "bg-yellow-300";
  } else {
    bgColor = "bg-white";
  }

  const completeSet = (actual_reps: number, set_id: number) => {
    axios.put('api/exercise/set', null, { params: { set_id, actual_reps, user_id: userId }})
      /* .then(() => {
        toggleCompletedModal(set_id);
      }) */
      .catch( error => {
        console.log(error.stack);
      })
  }

  const handleClick = (e: any) => {
    if (type === "exercise") {
      setExercises((prevState: any) => {
        let items = [...prevState];
        let item = { ...items[idx] };
        item.completed = !item.completed;
        items[idx] = item;
        return items;
      })
    } else {
      setNutrition((prevState: any) => {
        let items = [...prevState];
        let item = { ...items[idx] };
        item.completed = !item.completed;
        items[idx] = item;
        return items;
      });
    }
  };

  return (
    <div onClick={handleClick} className={`${bgColor} flex flex-col text-black mr-[2rem] rounded-3xl min-w-[30vw] min-h-[16vh] lg:min-h-[11rem] lg:min-w-[18rem]
      justify-center items-center last:mr-[0rem] shadow-xl hover:shadow-2xl cursor-pointer text-center`}
    >
      <div className="text-base font-bold lg:pb-6 lg:text-[2rem]">{name}</div>

      <div className="text-right text-base lg:text-[1.5rem]">
        {calorie} calories
      </div>

      <div className="pt-1">
        {portion && <div className="text-[1rem]">{portion} g</div>}

        {/* {sets && reps && weight && (
          <div className="text-[1rem]">
            {weight} lbs | {sets} x {reps}
          </div>
        )} */}

        {sets !== 0 && (
          <div className="text-[1rem">
            {sets} {sets === 1 ? 'set' : 'sets'}
          </div>
        )}
      </div>
    </div>
  );
}
