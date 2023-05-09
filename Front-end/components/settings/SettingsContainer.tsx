interface SettingsContainerProps {
  title: String,
  card: any
}

export default function SettingsContainer ( {title, card}: SettingsContainerProps ) {
  return (
    <div className="text-white flex flex-col justify-center items-center w-full min-w-[20rem] lg:max-w-[75rem] min-h-[15rem] lg:h-[25rem] p-3">

      <div className="bg-gray-500 dark:bg-slate-500 flex rounded-t-xl lg:rounded-t-3xl w-full h-[3rem] lg:h-[4rem] items-center p-3 text-base sm:text-[2rem]">
        {title}
      </div>

      <div className="bg-gray-300 dark:bg-slate-300 flex rounded-b-xl lg:rounded-b-3xl w-full h-[9rem] lg:h-[16rem] p-3 justify-center items-center">
        <div className="flex rounded-xl lg:rounded-3xl w-[50rem] max-w-[50rem] h-[7rem] lg:h-[12rem] max-h-[12rem]">
          <div className="w-full flex items-center  font-bold justify">
            {card}
          </div>
        </div>
      </div>
    </div>
  )
}