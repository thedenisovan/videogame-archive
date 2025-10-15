import { useState } from 'react';
import Header from './header/Header';
import FooterComp from './footer/FooterComp';
import { Outlet } from 'react-router';
import AuthorizationContext from './context/Authorization';
import ThemeContext from './context/ThemeContext';

export default function App() {
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
