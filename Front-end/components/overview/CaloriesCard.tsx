interface CaloriesCardProps {
  calorie: number;
  text: string;
  textColor?: string;
}

export default function Card({
  calorie,
  text,
  textColor = "text-black",
}: CaloriesCardProps) {
  return (
    <div className="bg-white flex flex-col text-black min-w-[28vw] min-h-[16vh] lg:min-h-[11rem] lg:min-w-[18rem]
      justify-center items-center rounded-3xl shadow-xl hover:shadow-2xl cursor-pointer m-1"
    >
      <div className={`text-auto lg:text-[3rem] ${textColor} font-bold`}>
        {calorie}
      </div>

      <div className="text-auto lg:text-[1.5rem]">{text}</div>
    </div>
  );
}
