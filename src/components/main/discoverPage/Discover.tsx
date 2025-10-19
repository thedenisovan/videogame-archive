import FilterBar from './FilterBar';
import DiscoverHeader from './DiscoverHeader';
import { createContext, useContext, useState } from 'react';
import { ThemeContext } from '../../App';
import GameCard from './GameCard';
import useGameData from '../../apiHooks/GameData';
import { useOutletContext } from 'react-router';
import type { GameValue } from '../../apiHooks/GameData';
import CircularProgress from '@mui/material/CircularProgress';
import DesktopSidebar from './DesktopSidebar';
import PaginationComp from './Paganation';

const CollapseContext = createContext({
  isCollapsed: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsCollapsed: (_val: boolean) => {},
});

export default function Discover() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const { loading, error } = useGameData({});
  const { dark } = useContext(ThemeContext);
  const { data, setPage } = useOutletContext<{
    data: GameValue[];
    setPage: (num: number) => void;
  }>();

  if (error) console.log(error);

  return (
    <main className='flex'>
      <DesktopSidebar dark={dark} />
      <section
        onClick={() => (!isCollapsed ? setIsCollapsed(true) : '')}
        aria-labelledby='main-section-title'
        className={`
          flex-1 flex !items-center flex-col px-2 py-2
          ${dark ? 'bg-gray-700' : 'bg-white'} lg:!flex-7`}
      >
        <DiscoverHeader />
        <CollapseContext value={{ isCollapsed, setIsCollapsed }}>
          <FilterBar />
        </CollapseContext>
        {loading ? (
          <CircularProgress disableShrink className='!mt-[15vw]' />
        ) : (
          <div>
            <ul
              className={`flex flex-col gap-4 !pl-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:!grid-cols-4`}
            >
              {data.map((d: GameValue) => (
                <li key={d.id}>
                  {
                    <GameCard
                      title={d.title}
                      rating={d.rating}
                      releaseDate={d.releaseDate}
                      genres={d.genres}
                      id={d.id}
                      screenshots={d.screenshots}
                    />
                  }
                </li>
              ))}
            </ul>
            <PaginationComp setPage={setPage} />
          </div>
        )}
      </section>
    </main>
  );
}

export { CollapseContext };
