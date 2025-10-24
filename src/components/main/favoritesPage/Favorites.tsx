import { useContext } from 'react';
import { AuthorizationContext } from '../../App';
import { Link, useOutletContext } from 'react-router';
import type { Games } from '../../App';
import GameCard from '../discoverPage/GameCard';

export default function Favorites() {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const { savedGames } = useOutletContext<{
    savedGames: Map<number, Games>;
  }>();

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      {isLoggedIn ? (
        <ul>
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
      ) : (
        <NoUser />
      )}
    </main>
  );
}

function NoUser() {
  return (
    <div>
      <h2 className='text-center'>No user is signed in</h2>
      You can go back to{' '}
      <Link className=' !text-blue-500' to='/'>
        {' '}
        main page
      </Link>{' '}
      or
      <Link className=' !text-blue-600' to='/auth'>
        {' '}
        sign in
      </Link>
    </div>
  );
}
