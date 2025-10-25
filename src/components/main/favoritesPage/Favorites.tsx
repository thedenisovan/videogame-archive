import { useContext } from 'react';
import { AuthorizationContext } from '../../App';
import { Link, useOutletContext } from 'react-router';
import type { Games } from '../../App';
import SavedGames from './SavedGames';
import DiscoverHeader from '../discoverPage/DiscoverHeader';
import { ThemeContext } from '../../App';

export default function Favorites() {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const { dark } = useContext(ThemeContext);
  const { savedGames } = useOutletContext<{
    savedGames: Map<number, Games>;
  }>();

  return (
    <main
      className={`${
        dark ? 'bg-gray-700' : 'bg-gray-300'
      } flex-1 flex justify-center items-center`}
    >
      {isLoggedIn ? (
        ![...savedGames].length ? (
          <NoGamesInLibrary />
        ) : (
          <section
            className={`${dark ? 'bg-gray-600' : 'bg-white'} h-100 px-4`}
          >
            <DiscoverHeader
              headerText='Your game library'
              pText='Browse your saved games'
            />
            <SavedGames />
          </section>
        )
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

function NoGamesInLibrary() {
  return (
    <div className='text-center'>
      <h2 className='text-center'>No games in your library</h2>
      Go{' '}
      <Link className=' !text-blue-500' to='/'>
        {' '}
        browse games
      </Link>{' '}
    </div>
  );
}
