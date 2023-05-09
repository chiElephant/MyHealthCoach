import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext, MdMenu } from "react-icons/md";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export interface HeaderProps {
  currentDate: Date;
  setCurrentDate: Function;
  title: string;
  Icon: any;
  showCalendar: boolean;
  setToggleSidebar: Function;
  showReportButtons: boolean;
  timespan: String;
  setTimespan: Function
}

export default function Header({
  currentDate,
  setCurrentDate,
  title,
  Icon,
  showCalendar,
  setToggleSidebar,
  showReportButtons,
  timespan,
  setTimespan,
}: HeaderProps) {

  const [formattedDate, setFormattedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormattedDate(dateFormatter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  useEffect(() => {
    document.addEventListener("click", (event: any) => {
      if (event.target.id !== "calendar") {
        setIsOpen(false);
      }
    });
  });

  const dateFormatter = function () {
    const weekdays: { [key: number]: string } = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };
    const months: { [key: number]: string } = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
    return `${weekdays[currentDate?.getDay()]}, ${
      months[currentDate?.getMonth()]
    } ${currentDate?.getDate()}, ${currentDate?.getFullYear()}`;
  };

  const dateChanger = function (numberOfDays: number) {
    const msToChange = 86_400_000 * numberOfDays;
    const newDate = new Date(currentDate.getTime() + msToChange);
    setCurrentDate(newDate);
  };

  const onChange = (date: any) => {
    setCurrentDate(date);
    setIsOpen((prevState) => !prevState);
  };

  const handleCalendarClick = function () {
    setIsOpen((prevState) => !prevState);
  };

  const handleMenuClick = function () {
    setToggleSidebar((prevState: number) => {
      if (prevState === 1) {
        return 0;
      } else {
        return 1;
      }
    });
  };

  const handleReportButtonsClick = function (e: any) {
    e.preventDefault();
    setTimespan(e.target.name);
  }

  return (
    <>
      <div className="z-40 bg-white dark:bg-slate-600 flex flex-row justify-between items-center h-16 lg:h-32 lg:max-h-24 text-black dark:text-white font-bold sticky shadow-lg min-w-[10rem] w-full pl-3 pr-3 lg:pl-12 lg:pr-12">

        <div className="flex items-center w-full h-full">
          {Icon && <Icon className="text-3xl lg:text-6xl mr-5"/>}
          <h1 className="text-3xl lg:text-5xl"> {title} </h1>
        </div>

        {showCalendar && (
          <div className="hidden text-xl lg:flex flex-row items-center">
            <div>
              <MdNavigateBefore onClick={() => {dateChanger(-1)}} className="h-14 w-14 hover:text-yellow-400 cursor-pointer"/>
            </div>

            <div className="flex flex-col justify-center">
              <div className="sm:w-52 lg:w-96 flex justify-center" id="calendar" onClick={handleCalendarClick}>
                {formattedDate}
              </div>

              {isOpen && (
                <div className="pt-56 lg:flex justify-center dark:text-black" id="calendar">
                  <Calendar onChange={onChange} />
                </div>
              )}
            </div>

            <div>
              <MdNavigateNext onClick={() => {dateChanger(1)}} className="h-14 w-14 hover:text-yellow-400 cursor-pointer"/>
            </div>
          </div>
        )}

        {showReportButtons && (
          <div className="hidden min-w-[20rem] lg:flex flex-row justify-between">
            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="week"
            >
              Week
            </button>

            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="month"
            >
              Month
            </button>

            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="year"
            >
              Year
            </button>
          </div>
        )}

        <div className="flex items-center text-3xl lg:hidden hover:text-yellow-400 cursor-pointer">
          <MdMenu onClick={handleMenuClick}/>
        </div>

      </div>

      <div className="flex flex-col justify-center w-full lg:hidden">
        {showCalendar && (
          <div className="font-bold text-xl flex flex-row items-center justify-between w-full p-3">
            <div>
              <MdNavigateBefore onClick={() => {dateChanger(-1)}} className="h-14 w-14 hover:text-yellow-400 cursor-pointer"/>
            </div>

            <div className="relative flex flex-col justify-center basis-80">
              <div className="w-full flex justify-center" id="calendar" onClick={handleCalendarClick}>
                {formattedDate}
              </div>

              {isOpen && (
                <div className="z-40 absolute pt-60 dark:text-black" id="calendar">
                  <Calendar onChange={onChange} />
                </div>
              )}
            </div>

            <div>
              <MdNavigateNext onClick={() => {dateChanger(1)}} className="h-14 w-14 hover:text-yellow-400 cursor-pointer"/>
            </div>
          </div>
        )}

        {showReportButtons && (
          <div className="flex lg:hidden w-full flex-row p-3 justify-center space-x-5">
            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="week"
            >
              Week
            </button>

            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="month"
            >
              Month
            </button>

            <button
              onClick={handleReportButtonsClick}
              className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
              name="year"
            >
              Year
            </button>
          </div>
        )}
      </div>
    </>
  )
}
