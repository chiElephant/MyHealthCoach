import { useTheme } from 'next-themes'

export default function UserExperience() {
  const {theme, setTheme} = useTheme()

  return (
    <div className='w-full flex flex-row text-black justify-between items-center'>
      <p className='lg:text-2xl'> Dark Mode </p>
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-gray-500 dark:bg-slate-800 hover:bg-purple-600 dark:hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-[10rem]">
        {/* {theme === 'dark' ? 'On' : 'Off'} */}
        Toggle
      </button>
    </div>
  )
}
