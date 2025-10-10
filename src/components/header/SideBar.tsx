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
    <nav
      aria-hidden={!isOpen ? 'true' : 'false'}
      className={`absolute top-0 h-[100vh] w-[100%] transition-transform duration-200 ease-in md:hidden flex ${
        !isOpen && '-translate-x-120'
      }`}
    >
      <div
        className={`w-[80%] h-[100vh] text-white bg-gray-800 flex flex-col p-3${
          !dark && '!text-black !bg-gray-400'
        }`}
      >
        <h2 className={`text-2xl font-bold tracking-widest`}>VAULT33</h2>
        <button>Discover</button>
        <button>My Library</button>
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
        className={`w-[20%] h-[100vh] bg-gray-200 ${dark && 'bg-gray-700'}`}
      >
        <button>
          <img
            className='w-8 absolute'
            src={dark ? svg.lightCross : svg.darkCross}
            alt='Close side bar button'
          />
        </button>
      </div>
    </nav>
  );
}
