import { Link } from 'react-router';
import svg from '../../utils/svg';
import { useContext } from 'react';
import { ThemeContext, AuthorizationContext } from '../App';
import { Dropdown, DropdownItem } from 'flowbite-react';

function DesktopHeader({ className }: { className: string }) {
  const { dark, toggleDark } = useContext(ThemeContext);
  const { isLoggedIn, setLoggedIn } = useContext(AuthorizationContext);

  // return correct theme comp based on value of theme boolean
  const returnTheme = () => (dark ? svg.moon : svg.sun);

  return (
    <ul className={className}>
      <li>
        <NavButton
          testid='browse-button'
          dark={dark}
          children='Browse'
          path='/'
        />
      </li>
      <li>
        <NavButton
          testid='favorites-button'
          dark={dark}
          children='Favorites'
          path='fav'
        />
      </li>
      <li>
        <button data-testid='theme-button' onClick={() => toggleDark()}>
          <img
            className='w-9 -translate-y-[7px] hover:scale-[1.03]'
            src={returnTheme()}
            alt='theme icon'
          />
        </button>
      </li>
      <li>
        {!isLoggedIn ? (
          <NavButton
            testid='auth-button'
            dark={dark}
            children='Sign in'
            path='auth'
          />
        ) : (
          <DropDownComponent dark={!dark} setLoggedIn={setLoggedIn} />
        )}
      </li>
    </ul>
  );
}

function DropDownComponent({
  dark,
  setLoggedIn,
}: {
  dark: boolean;
  setLoggedIn: (isSignedIn: boolean) => void;
}) {
  const currUser: string | null = localStorage.getItem('current-user');
  if (currUser === null)
    throw new Error('Could not get user from local storage');

  const parsedUser = JSON.parse(currUser);

  return (
    <Dropdown
      className={`${
        dark ? 'text-black' : 'text-white -translate-y-2'
      } !text-xl !p-0 active:border-0`}
      label='User'
      dismissOnClick={true}
    >
      <div className='p-2 !pr-4 !pl-0'>
        <DropdownItem className='!text-gray-500 p-0 hover:!bg-white'>
          {parsedUser.id}
        </DropdownItem>
        <hr className='m-1 text-black -translate-x-10 w-[130%] ' />
        <DropdownItem
          onClick={() => {
            setLoggedIn(false);
            localStorage.removeItem('current-user');
          }}
          className='text-black p-0 hover:!bg-white'
        >
          Sign out
        </DropdownItem>
      </div>
    </Dropdown>
  );
}

function NavButton({
  children,
  path,
  dark,
  testid,
}: {
  children: string;
  path: string;
  dark: boolean;
  testid: string;
}) {
  return (
    <Link
      className={`text-xl ${
        dark ? 'text-white' : 'text-black'
      } !no-underline hover:!underline`}
      to={path}
      data-testid={testid}
    >
      {children}
    </Link>
  );
}

export default DesktopHeader;
