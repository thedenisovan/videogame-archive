import { useState, createContext } from 'react';
// import useGameData from '../components/apiHooks/GameData';
import Header from './header/Header';
import FooterComp from './footer/FooterComp';
import { Outlet } from 'react-router';

const ThemeContext = createContext({
  dark: true,
  toggleDark: () => {},
  themeBg: () => {},
  themeText: () => {},
});

const AuthorizationContext = createContext({
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoggedIn: (_bool: boolean) => {},
});

export default function App() {
  // const { data } = useGameData({ title: 'elder scrolls skyrim' });
  const [dark, setDark] = useState<boolean>(true);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const themeBg = () => (dark ? 'bg-gray-700' : 'bg-white');
  const themeText = () => (dark ? '!text-white' : '!text-black');
  const toggleDark = () => setDark(!dark);

  return (
    <div className={`${themeText()} ${themeBg()} flex flex-col h-[100%]`}>
      <AuthorizationContext value={{ isLoggedIn, setLoggedIn }}>
        <ThemeContext value={{ dark, toggleDark, themeBg, themeText }}>
          <Header role='header' />
          <Outlet />
          <FooterComp />
        </ThemeContext>
      </AuthorizationContext>
    </div>
  );
}

export { ThemeContext, AuthorizationContext };
