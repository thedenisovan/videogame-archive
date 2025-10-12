import { Link } from 'react-router';
import svg from '../../utils/svg';
import { useContext } from 'react';
import { ThemeContext, AuthorizationContext } from '../App';

function DesktopHeader({ className }: { className: string }) {
  const { dark, toggleDark } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthorizationContext);

  // return correct theme comp based on value of theme boolean
  const returnTheme = () => (dark ? svg.moon : svg.sun);
  // return correct sign in text based if user logged in or not
  const authStatus = () => (isLoggedIn ? 'Sign out' : 'Sign in');

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
        <NavButton
          testid='auth-button'
          dark={dark}
          children={authStatus()}
          path='auth'
        />
      </li>
    </ul>
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
