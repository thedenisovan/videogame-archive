import { useState, createContext, useEffect } from 'react';
// import useGameData from '../components/apiHooks/GameData';
import Header from './header/Header';
import FooterComp from './footer/FooterComp';
import { Outlet } from 'react-router';

const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

const AuthorizationContext = createContext({
  isLoggedIn: false,
});

export default function App() {
  // const { data } = useGameData({ title: 'elder scrolls skyrim' });
  const [dark, setDark] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(false);
  }, []); //!TODO : change to appropriate logic

  const toggleDark = () => setDark(!dark);

  return (
    <>
      <AuthorizationContext value={{ isLoggedIn }}>
        <ThemeContext value={{ dark, toggleDark }}>
          <Header role='header' />
          <Outlet />
          <FooterComp />
        </ThemeContext>
      </AuthorizationContext>
    </>
  );
}

export { ThemeContext, AuthorizationContext };
