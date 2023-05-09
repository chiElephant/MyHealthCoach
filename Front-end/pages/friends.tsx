import { ChildProps } from "../components/Layout";
import { useEffect } from "react";
import { MdOutlinePeopleAlt } from "react-icons/md";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti'

export default function Friends({ setTitle, setIcon, setShowCalendar, setShowReportButtons }: ChildProps) {
  useEffect(() => {
    setTitle("Friends");
    setIcon(() => (MdOutlinePeopleAlt));
    setShowCalendar(false);
    setShowReportButtons(false);
  }, [setTitle, setShowCalendar]);

  const { width, height } = useWindowSize();

  return (
    <>
      <Confetti width={width} height={height}/>
      <p className="text-[4rem] dark:text-white"> You have no friends :( </p>
    </>
  )
}