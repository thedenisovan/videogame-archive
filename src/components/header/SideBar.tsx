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

  const value: boolean = true;

  return (
    <nav
      aria-hidden={!isOpen ? 'true' : 'false'}
      className={`absolute top-0 h-[100vh] w-[100%] transition-transform duration-200 ease-in md:hidden flex ${
        isOpen && '-translate-x-120'
      }`}
    >
      <div
        className={`w-[80%] h-[100vh] text-white bg-gray-800 flex flex-col items-start p-4 ${
          !dark && '!text-black !bg-gray-200'
        }`}
      >
        <h2 className={`text-3xl font-bold tracking-widest`}>VAULT33</h2>
        <button className='flex'>
          {dark ? (
            <img width={30} src={svg.lightMag} />
          ) : (
            <img width={30} src={svg.darkMag} />
          )}
          <p>Discover</p>
        </button>
        <button className='flex'>
          {dark ? (
            <img width={30} src={svg.lightLib} />
          ) : (
            <img width={30} src={svg.darkLib} />
          )}
          <p>My Library</p>
        </button>
        <hr className='border-b-1 w-100 my-2' />
        <button onClick={() => toggleDark()}>
          {dark ? (
            <div className='flex'>
              <img width={30} src={svg.moon} alt='current dark mode' />
              <p>Dark theme</p>
            </div>
          ) : (
            <div className='flex'>
              <img width={30} src={svg.sun} alt='current light mode' />
              <p>Light theme</p>
            </div>
          )}
        </button>
        <button>
          <div className='flex'>
            {dark ? (
              <img width={30} src={svg.lightSignIn} alt='current dark mode' />
            ) : (
              <img width={30} src={svg.darkSignIn} alt='current light mode' />
            )}
            <p>{value ? 'Sign In' : 'Sign out'}</p>
          </div>
        </button>
      </div>
      <div
        onClick={() => toggleSideBar()}
        className={`w-[20%] h-[100vh] bg-gray-400 ${dark && 'bg-gray-700'}`}
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
