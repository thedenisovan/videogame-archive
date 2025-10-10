import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';
import SideBar from './SideBar';
// import DesktopHeader from './DesktopHeader';

export default function Header({ role }: { role: string }) {
  const { dark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen(!isOpen);

  return (
    <header role={role}>
      <div
        className={`${
          dark ? 'text-white bg-gray-800' : 'bg-gray-500 text-gray-900'
        } flex justify-between p-3 h-[4rem]`}
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
      {/* <DesktopHeader className='md:flex' /> */}
    </header>
  );
}
