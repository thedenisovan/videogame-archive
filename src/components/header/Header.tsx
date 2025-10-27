import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';
import SideBar from './SideBar';
import DesktopHeader from './DesktopHeader';
import { Link } from 'react-router';

export default function Header({ role }: { role: string }) {
  const { dark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen(!isOpen);

  return (
    <header
      role={role}
      className={` ${dark ? ' bg-gray-800' : 'bg-gray-200 '}`}
    >
      <div
        className={`m-auto max-w-[1600px] lg:max-w-[2300px] flex justify-between p-3 h-[4rem] md:h-[5rem]`}
      >
        <Link
          to='/'
          className={`!no-underline ${dark ? ' !text-white' : '!text-black '}`}
        >
          <h1 className={`text-2xl font-bold tracking-widest`}>VAULT33</h1>
        </Link>
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
        <DesktopHeader className='hidden md:flex md:gap-4 md:pt-2 lg:gap-12 lg:pr-[3rem] lg:pt-3' />
      </div>
      <SideBar toggleSideBar={toggleSideBar} isOpen={isOpen} />
    </header>
  );
}
