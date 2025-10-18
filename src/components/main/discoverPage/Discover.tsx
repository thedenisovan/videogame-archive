import FilterBar from './FilterBar';
import DiscoverHeader from './DiscoverHeader';
import { createContext, useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import GameCard from './GameCard';
import useGameData from '../../apiHooks/GameData';
import { useOutletContext } from 'react-router';
import type { GameValue } from '../../apiHooks/GameData';
import CircularProgress from '@mui/material/CircularProgress';

const CollapseContext = createContext({
  isCollapsed: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsCollapsed: (_val: boolean) => {},
});

export default function Discover() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const { loading, error } = useGameData({});
  const { dark } = useContext(ThemeContext);
  const { data } = useOutletContext<{
    data: GameValue[];
  }>();

  if (error) console.log(error);

  return (
    <main
      onClick={() => (!isCollapsed ? setIsCollapsed(true) : '')}
      aria-labelledby='main-section-title'
      className={`flex-1 flex !items-center flex-col px-2 py-2 ${
        dark ? 'bg-gray-700' : 'bg-white'
      } `}
    >
      <DiscoverHeader />
      <CollapseContext value={{ isCollapsed, setIsCollapsed }}>
        <FilterBar />
      </CollapseContext>
      {loading ? (
        <CircularProgress disableShrink className='!mt-[35vw]' />
      ) : (
        <ul className={`flex flex-col gap-4 !pl-0`}>
          {data.map((d: GameValue) => (
            <li key={d.id}>
              {
                <GameCard
                  bgImg={d.bgImg}
                  title={d.title}
                  rating={d.rating}
                  releaseDate={d.releaseDate}
                  genres={d.genres}
                  id={d.id}
                />
              }
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export { CollapseContext };
