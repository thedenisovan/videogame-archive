import { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';
import SideBar from './SideBar';

export default function Header() {
  const { dark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSideBar = () => setIsOpen(!isOpen);

  return (
    <header>
      <div
        className={`${
          dark ? 'text-white bg-gray-700' : 'bg-gray-200 text-black'
        } flex justify-between p-4 h-[4rem]`}
      >
        <h1 className={`text-2xl font-bold tracking-widest`}>VAULT33</h1>
        <button
          className='absolute right-3 md:hidden'
          onClick={() => toggleSideBar()}
        >
          {!isOpen ? (
            <img
              className='w-8'
              src={dark ? svg.lightBtn : svg.darkBtn}
              alt=''
            />
          ) : (
            <img
              className='w-8'
              src={dark ? svg.lightCross : svg.darkCross}
              alt=''
            />
          )}
        </button>
      </div>
      <SideBar isOpen={isOpen} />
    </header>
  );
}
