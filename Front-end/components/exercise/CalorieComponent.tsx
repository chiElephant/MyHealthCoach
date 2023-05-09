import CaloriesBurned from "./CaloriesBurned";

export default function CalorieComponent({
  caloriesBurned,
  toggleAddModal,
}: any) {
  return (
    <div className="flex lg:h-[250px] lg:min-w-min lg:max-w-xxs sm:w-[60%] sm:h-[150px] flex-col lg:self-start sm:self-center lg:justify-self-center overflow-hidden rounded-lg bg-gray-300 dark:bg-slate-500 shadow-lg lg:mt-8">
      <CaloriesBurned caloriesBurned={caloriesBurned} />
      <button
        className="static self-center mx-2 sm:mb-3 w-11/12 rounded-3xl bg-white py-2 px-4 font-bold text-black hover:bg-gray-200"
        onClick={toggleAddModal}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
}
