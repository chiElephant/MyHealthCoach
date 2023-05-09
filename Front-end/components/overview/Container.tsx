import { useState } from "react";
import { MdAdd } from "react-icons/md";
import CaloriesCard from "./CaloriesCard";
import ExerciseAndNutritionCard from "./ExerciseAndNutritionCard";
import Modal from "./Modal";

interface CaloriesCardProps {
  text: string;
  calorie: number;
}

interface ContainerProps {
  type: "calories" | "exercise" | "nutrition";
  title: string;
  //cards: Array<CaloriesCardProps> | Array<ExerciseObjProps> | Array<NutritionObjProps>,
  cards: any;
  setExercises?: any;
  setNutrition?: any;
  bmr: number | 0;
  userId: any
}

export default function Container({
  type,
  title,
  cards,
  setExercises,
  setNutrition,
  bmr,
  userId
}: ContainerProps) {
  /* const scrollRef = useRef<any>();
  const slideScroll = () => {
    console.log('Hello');
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', slideScroll)
    }
  }) */

  const [isOpen, setIsOpen] = useState(false);
  let numberOfCompleted = 0;
  cards.map((card: any) => {
    if (card.completed === true) {
      numberOfCompleted++;
    }
  });

  return (
    <div className="flex flex-col items-center mb-[2rem] last:mb-[1rem] lg:last:mb-[2rem] overflow-hidden rounded-xl lg:rounded-3xl lg:h-[20rem] w-full h-full lg:w-[80vw] max-w-[75rem]">
      <div className="bg-gray-500 dark:bg-slate-500 flex flex-row h-[3rem] lg:h-[4rem] items-center text-white justify-between w-full">
        <div className="ml-5 text-base sm:text-[2rem]"> {title} </div>
        {type === "calories" && (
          <div className="mr-5 text-xs italic lg:text-base">
            {" "}
            Recommended daily consumption: {Math.round(bmr)}{" "}
          </div>
        )}
        {type !== "calories" && (
          <div className="flex grow flex-row items-center justify-between">
            <div className="ml-5 text-xs italic lg:text-base">
              {" "}
              {numberOfCompleted} of {cards.length} items completed{" "}
            </div>

            {type === "exercise" && (
              <a href='/exercise'>
                <MdAdd className="mr-5 cursor-pointer text-2xl" />
              </a>
            )}

            {type === "nutrition" && (
              <a href='/nutrition'>
                <MdAdd className="mr-5 cursor-pointer text-2xl" />
              </a>
            )}
          </div>
        )}
      </div>

      <Modal
        open={isOpen}
        setIsOpen={setIsOpen}
        cards={cards}
        setExercises={setExercises}
        setNutrition={setNutrition}
      ></Modal>

      <div className="relative w-full h-full">
        <div className={`z-0 bg-gray-300 dark:bg-slate-300 flex flex-row min-h-full lg:h-[16rem] ${type === 'calories'? 'justify-between' : 'justify-right'} items-center bg-fixed overflow-x-scroll pl-2 pr-2 lg:pl-[4rem] lg:pr-[4rem] scrollbar-hide border-r border-l w-full`}
        >
          {cards.length === 0 && type === "exercise" && (
            <div className="flex w-full justify-center">
              <div className="flex justify-center text-2xl text-white">
                No workout has been added
              </div>
            </div>
          )}

          {cards.length === 0 && type === "nutrition" && (
            <div className="flex w-full justify-center">
              <div className="flex justify-center text-2xl text-white">
                No meal has been added
              </div>
            </div>
          )}

          {cards.length !== 0 &&
            cards.map((card: any, index: any) => {
              if (type === "calories") {
                let textColor = "text-black";
                if (index === 2) {
                  if (card.calorie >= 0) {
                    textColor = "text-green-500";
                  } else {
                    textColor = "text-red-500";
                  }
                } else {
                  textColor = "text-black";
                }
                return (
                  <CaloriesCard
                    textColor={textColor}
                    key={index}
                    calorie={card.calorie}
                    text={card.text}
                  />
                );
              } else if (type === "exercise") {
                return (
                  <ExerciseAndNutritionCard
                    key={index}
                    idx={index}
                    type={type}
                    name={card.text}
                    calorie={card.calorie}
                    sets={card.sets}
                    reps={card.reps}
                    weight={card.weight}
                    completed={card.completed}
                    setExercises={setExercises}
                    userId={userId}
                  />
                );
              } else {
                return (
                  <ExerciseAndNutritionCard
                    key={index}
                    idx={index}
                    type={type}
                    name={card.text}
                    calorie={card.calorie}
                    portion={card.portion}
                    completed={card.completed}
                    setNutrition={setNutrition}
                    userId={userId}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
