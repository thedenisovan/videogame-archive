import { useEffect, useState } from 'react';
import useGameData from '../components/apiHooks/GameData';
import Header from './header/Header';
import FooterComp from './footer/FooterComp';
import { Outlet } from 'react-router';
import AuthorizationContext from './context/Authorization';
import ThemeContext from './context/ThemeContext';

interface Games {
  screenshots: string[];
  gameId: string | number;
  title: string;
  releaseDate: string;
  rating: string | number;
  genres: string[];
}

export default function App() {
  // order games by order by value
  const [orderBy, setOrderBy] = useState<string>('-ratings');
  const [genres, setGenres] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const [dark, setDark] = useState<boolean>(false);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [savedGames, setSavedGames] = useState<Map<number, Games>>(new Map());

  // renders saved games when user signs in
  useEffect(() => {
    const data = localStorage.getItem('current-user');
    if (!data) return;
    const parsed = JSON.parse(data);
    const mappedData = new Map<number, Games>(parsed.savedGames);
    setSavedGames(mappedData);
  }, [isLoggedIn]);

  // main data of api fetch return
  const { data, count } = useGameData({
    orderBy,
    genres,
    page,
    title,
  });

  const themeBg = () => (dark ? 'bg-gray-700' : 'bg-white');
  const themeText = () => (dark ? '!text-white' : '!text-black');
  const toggleDark = () => setDark(!dark);
  const setOrderByVal = (e: string) => setOrderBy(e);

  // is used to update state after game is added/removed to/from favorites
  const updateSavedGames = (games: Map<number, Games>) => {
    setSavedGames(games);
  };

  return (
    <div
      className={`${themeText()} ${themeBg()} flex flex-col h-[100%] !w-[100%]`}
    >
      <AuthorizationContext value={{ isLoggedIn, setLoggedIn }}>
        <ThemeContext value={{ dark, toggleDark, themeBg, themeText }}>
          <Header role='header' />
          <Outlet
            context={{
              data,
              setOrderByVal,
              orderBy,
              setGenres,
              genres,
              setPage,
              count,
              page,
              setTitle,
              isLoggedIn,
              savedGames,
              updateSavedGames,
            }}
          />
          <FooterComp />
        </ThemeContext>
      </AuthorizationContext>
    </div>
  );
}

export { ThemeContext, AuthorizationContext };
export type { Games };
