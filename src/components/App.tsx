import { useState, createContext } from 'react';
// import useGameData from './GameData';
import Header from './header/Header';

const ThemeContext = createContext({
  dark: false,
  toggleDark: () => {},
});

export default function App() {
  // const { data } = useGameData({ title: 'elder scrolls skyrim' });
  const [dark, setDark] = useState<boolean>(false);

  const toggleDark = () => setDark(!dark);

  return (
    <>
      <ThemeContext value={{ dark, toggleDark }}>
        <Header />
      </ThemeContext>
    </>
  );
}

export { ThemeContext };
