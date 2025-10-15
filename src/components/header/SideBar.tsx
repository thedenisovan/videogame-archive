import { useContext } from 'react';
import { ThemeContext, AuthorizationContext } from '../App';
import { Link } from 'react-router';
import svg from '../../utils/svg';

export default function SideBar({
  isOpen,
  toggleSideBar,
}: {
  isOpen: boolean;
  toggleSideBar: () => void;
}) {
  const { dark, toggleDark } = useContext(ThemeContext);
  const { isLoggedIn, setLoggedIn } = useContext(AuthorizationContext);

  // removes focus from button and closes side bar after btn is being clicked
  const removeFocus = (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toggleSideBar();
    e.currentTarget.blur();
  };

  return (
    <aside
      aria-hidden={!isOpen} // if sidebar is open remove aria hidden else leave it
      className={`absolute top-0 h-[100vh] w-[100vw] transition-transform duration-200 ease-in md:hidden flex z-2 ${
        !isOpen && '-translate-x-[100%]' // if sidebar is open slide it in view
      }`}
    >
      <div
        className={`w-4/5 h-[100vh] text-white bg-gray-800 flex flex-col gap-2 items-start p-4 ${
          !dark && '!text-black !bg-gray-200'
        }`}
      >
        <h2 className={`text-3xl font-bold tracking-widest`}>VAULT33</h2>
        <Link to='/' className='!no-underline'>
          <NavButton
            removeFocus={removeFocus}
            dark={dark}
            lightSvg={svg.lightMag}
            darkSvg={svg.darkMag}
            children='Discover'
          />
        </Link>
        <Link to='fav' className='!no-underline'>
          <NavButton
            removeFocus={removeFocus}
            dark={dark}
            lightSvg={svg.lightLib}
            darkSvg={svg.darkLib}
            children='My Library'
          />
        </Link>

        <hr className='border-b-1 w-[100%]' />

        {/*button to toggle dark theme*/}
        <button onClick={() => toggleDark()}>
          {dark ? (
            <div className='flex'>
              <img width={30} src={svg.moon} alt='current dark mode' />
              <p className='!ml-2 mt-3'>Dark theme</p>
            </div>
          ) : (
            <div className='flex'>
              <img width={30} src={svg.sun} alt='current light mode' />
              <p className='!ml-2 mt-3'>Light theme</p>
            </div>
          )}
        </button>
        <Link to='auth' className='!no-underline'>
          <button
            onClick={(e) => {
              removeFocus(e);
              // if user is signed in, set global isLoggedIn flag to false
              // e.g. sign user out
              if (isLoggedIn) {
                setLoggedIn(false);
                localStorage.removeItem('current-user');
              }
            }}
            className='flex'
          >
            {dark ? (
              <img width={30} src={svg.lightSignIn} alt='current dark mode' />
            ) : (
              <img width={30} src={svg.darkSignIn} alt='current light mode' />
            )}
            <p className={`!ml-2 mt-3 ${dark ? 'text-white' : 'text-black'}`}>
              {!isLoggedIn ? `Sign in` : 'Sign out'}
            </p>
          </button>
        </Link>
      </div>
      <div
        onClick={(e) => removeFocus(e)}
        className={`w-1/5 h-[100vh] bg-gray-400 ${dark && 'bg-gray-700'}`}
      >
        <button onClick={(e) => removeFocus(e)}>
          <img
            className='w-9 !ml-3 mt-4'
            src={dark ? svg.lightCross : svg.darkCross}
            alt='Close side bar button'
          />
        </button>
      </div>
    </aside>
  );
}

// Component for discover and library nav buttons
function NavButton({
  removeFocus,
  dark,
  lightSvg,
  darkSvg,
  children,
}: {
  removeFocus: (
    e:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  dark: boolean;
  lightSvg: string;
  darkSvg: string;
  children: string;
}) {
  return (
    <button className='flex' onClick={(e) => removeFocus(e)}>
      {dark ? (
        <img width={30} src={lightSvg} />
      ) : (
        <img width={30} src={darkSvg} />
      )}
      <p className={`!ml-2 mt-3  ${dark ? 'text-white' : 'text-black'}`}>
        {children}
      </p>
    </button>
  );
}
