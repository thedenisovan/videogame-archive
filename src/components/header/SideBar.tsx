import { useContext } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';

export default function SideBar({
  isOpen,
  toggleSideBar,
}: {
  isOpen: boolean;
  toggleSideBar: () => void;
}) {
  const { dark, toggleDark } = useContext(ThemeContext);

  return (
    <div
      className={`top-0 absolute h-[100vh] w-[100%] transition-transform duration-200 ease-in md:hidden ${
        !isOpen && '-translate-x-100'
      }`}
    >
      <div
        className={`w-[80%] h-[100vh] text-white bg-gray-800 absolute top-0 p-3 ${
          !dark && '!text-black !bg-gray-400'
        }`}
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
        onClick={() => toggleSideBar()}
        className={`w-[20%] h-[100vh] bg-gray-200 absolute right-0 ${
          dark && 'bg-gray-700'
        }`}
      >
        <button>
          <img
            className='w-8 m-auto'
            src={dark ? svg.lightCross : svg.darkCross}
            alt=''
          />
        </button>
      </div>
    </div>
  );
}
