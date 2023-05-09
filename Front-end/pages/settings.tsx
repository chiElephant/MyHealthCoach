import { ChildProps } from "../components/Layout"
import { useEffect} from 'react'
import { MdOutlineSettings } from 'react-icons/md'

import UserExperience from '../components/settings/UserExperience'
import UserMetrics from '../components/settings/UserMetrics'
import SettingsContainer from "../components/settings/SettingsContainer"


export default function Settings({ setTitle, setIcon, setShowCalendar, setShowReportButtons }: ChildProps) {

  useEffect(() => {
    setTitle('Settings');
    setIcon(() => (MdOutlineSettings));
    setShowCalendar(false);
    setShowReportButtons(false);
  }, [setTitle, setIcon, setShowCalendar]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <SettingsContainer title="User Metrics" card={<UserMetrics />}/>
      <SettingsContainer title="User Experience" card={<UserExperience />}/>
    </div>
  );
}