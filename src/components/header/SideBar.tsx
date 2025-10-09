import { useContext } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';

export default function SideBar({ isOpen }: { isOpen: boolean }) {
  const { dark, toggleDark } = useContext(ThemeContext);

  return (
    <div>
      <div
        className={`w-[80%] h-[100vh] text-white bg-gray-800 absolute top-0 p-3 transition-transform duration-200 ease-in md:hidden ${
          !isOpen && '-translate-x-100'
        } ${!dark && '!text-black !bg-gray-400'}`}
      >
        <h1 className={`text-2xl font-bold tracking-widest`}>VAULT33</h1>
        <div>Discover</div>
        <div>My Library</div>
        <button onClick={() => toggleDark()}>
          {dark ? (
            <img width={30} src={svg.moon} />
          ) : (
            <img width={30} src={svg.sun} />
          )}
        </button>
      </div>
      <div
        className={`w-[20%] h-[100vh] -translate-x-22 bg-gray-200 absolute top-0 transition-transform duration-200 ease-in md:hidden ${
          isOpen && '!translate-x-78 -z-1'
        } ${dark && 'bg-gray-700'}`}
      ></div>
    </div>
  );
}
