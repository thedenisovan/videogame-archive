import GameCard from '../discoverPage/GameCard';
import { useOutletContext } from 'react-router';
import type { Games } from '../../App';

export default function SavedGames() {
  const { savedGames } = useOutletContext<{
    savedGames: Map<number, Games>;
  }>();

  return (
    <ul className='flex flex-col lg:max-w-[1300px] mt-2 gap-3 !pl-0 md:grid md:grid-cols-2 xl:!grid-cols-3 '>
      {[...savedGames].map(([key, value]) => (
        <li key={key}>
          {
            <GameCard
              releaseDate={value.releaseDate}
              screenshots={value.screenshots}
              rating={value.rating}
              title={value.title}
              id={key}
              genres={value.genres}
            />
          }
        </li>
      ))}
    </ul>
  );
}
