import {
  MdAccountCircle,
  MdOutlineSort,
  MdOutlineFitnessCenter,
  MdRestaurant,
  MdOutlineAssignment,
  MdOutlinePeopleAlt,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

export interface SidebarProps {
  currentUser: any
}

export default function Sidebar({ currentUser }: SidebarProps) {
  return (
    <div className="flex grow bg-gray-500 dark:bg-slate-800 h-full">
      <div className="flex flex-col grow max-h-[100vh] w-48 top-0 left-0 overflow-x-hidden items-center text-xl justify-between pt-2 text-white">
        <div className="flex flex-col items-center">

        {currentUser ? <Image src={currentUser.profile_pic} width={120} height={120} className='rounded-3xl'alt='User Photo'></Image> :
            <div>
              <MdAccountCircle className="h-32 w-32" />
            </div>
        }

          <div className="username pb-1 text-xl"> {currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : ''} </div>
          {/* <div className="names text-sm italic">FirstName LastName </div> */}
        </div>

        <ul className="flex max-h-[35rem] w-32 grow flex-col justify-between pt-10 pb-[12rem] font-bold">
          <li>
            <Link
              className="flex flex-row items-center hover:text-yellow-400"
              href="/overview"
            >
              <MdOutlineSort className="mr-2 h-5 w-5" />
              Overview
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row items-center hover:text-yellow-400"
              href="/exercise"
            >
              <MdOutlineFitnessCenter className="mr-2 h-5 w-5" />
              Exercise
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row items-center hover:text-yellow-400"
              href="/nutrition"
            >
              <MdRestaurant className="mr-2 h-5 w-5" />
              Nutrition
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row items-center hover:text-yellow-400"
              href="/report"
            >
              <MdOutlineAssignment className="mr-2 h-5 w-5" />
              Report
            </Link>
          </li>

          <li>
            <Link
              className="flex flex-row items-center hover:text-yellow-400"
              href="/friends"
            >
              <MdOutlinePeopleAlt className="mr-2 h-5 w-5" />
              Friends
            </Link>
          </li>

          <li>
            <Link
              className="items-center flex flex-row hover:text-yellow-400"
              href="/settings"
            >
              <MdOutlineSettings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          </li>
        </ul>

        <div className="flex w-32 pb-10 font-bold hover:text-yellow-400">
          <Link className="flex flex-row items-center" href="/login">
            <MdLogout className="mr-2 h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
