import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';
import SideBar from './SideBar';

export default function Header({ role }: { role: string }) {
  const { dark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen(!isOpen);

  return (
    <header role={role}>
      <div
        className={`${
          dark ? 'text-white bg-gray-700' : 'bg-gray-400 text-black'
        } flex justify-between p-4 h-[4rem]`}
      >
        <h1 className={`text-2xl font-bold tracking-widest`}>VAULT33</h1>
        <button
          role='expand-button'
          className='absolute right-3 md:hidden'
          onClick={() => toggleSideBar()}
        >
          {
            <img
              className='w-8'
              src={dark ? svg.lightBtn : svg.darkBtn}
              alt='Open side bar button'
            />
          }
        </button>
      </div>
      <SideBar toggleSideBar={toggleSideBar} isOpen={isOpen} />
    </header>
  );
}
