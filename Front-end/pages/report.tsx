import { useEffect } from "react";
import { ChildProps } from "../components/Layout";
import { MdOutlineAssignment } from "react-icons/md";
import Charts from "../components/report/charts";

export default function Report({
  currentDate,
  setTitle,
  setIcon,
  setShowCalendar,
  setShowReportButtons,
  timespan,
  setTimespan,
  userId
}: ChildProps) {

  useEffect(() => {
    setTitle("Report");
    setIcon(() => MdOutlineAssignment);
    setShowCalendar(true);
    setShowReportButtons(true)
  }, [setTitle, setIcon, setShowCalendar, setShowReportButtons]);

  return (
    <div className="h-[100%] w-[100%] flex items-center justify-center">
      <Charts timespan={timespan} userId={userId}
      date={currentDate.toISOString().split('T')[0]}/>
    </div>
  );
}
