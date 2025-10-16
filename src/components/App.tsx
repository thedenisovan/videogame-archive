import { useState } from 'react';
import useGameData from '../components/apiHooks/GameData';
import Header from './header/Header';
import FooterComp from './footer/FooterComp';
import { Outlet } from 'react-router';
import AuthorizationContext from './context/Authorization';
import ThemeContext from './context/ThemeContext';

export default function App() {
  // order games by order by value
  const [orderBy, setOrderBy] = useState<string>('-ratings');
  // main data of api fetch return
  const { data } = useGameData({ genre: 'indie', orderBy: orderBy });

  const [dark, setDark] = useState<boolean>(true);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const themeBg = () => (dark ? 'bg-gray-700' : 'bg-white');
  const themeText = () => (dark ? '!text-white' : '!text-black');
  const toggleDark = () => setDark(!dark);
  const setOrderByVal = (e: string) => setOrderBy(e);

  return (
    <div className={`${themeText()} ${themeBg()} flex flex-col h-[100%] `}>
      <AuthorizationContext value={{ isLoggedIn, setLoggedIn }}>
        <ThemeContext value={{ dark, toggleDark, themeBg, themeText }}>
          <Header role='header' />
          <Outlet context={{ data, setOrderByVal, orderBy }} />
          <FooterComp />
        </ThemeContext>
      </AuthorizationContext>
    </div>
  );
}

export { ThemeContext, AuthorizationContext };
