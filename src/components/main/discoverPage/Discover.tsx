import FilterBar from './FilterBar';
import DiscoverHeader from './DiscoverHeader';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import GameCard from './GameCard';
import useGameData from '../../apiHooks/GameData';
import { useOutletContext } from 'react-router';
import type { GameValue } from '../../apiHooks/GameData';

export default function Discover() {
  const { loading, error } = useGameData({});
  const { dark } = useContext(ThemeContext);
  const { data } = useOutletContext<{
    data: GameValue[];
  }>();

  if (error) console.log(error);

  return (
    <main
      aria-labelledby='main-section-title'
      className={`flex-1 flex items-center flex-col ${
        dark ? 'bg-gray-700' : 'bg-white'
      }`}
    >
      <DiscoverHeader />
      <FilterBar />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul className='p-2 flex flex-col gap-4'>
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
