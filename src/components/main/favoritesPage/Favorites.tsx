import { useContext } from 'react';
import { AuthorizationContext } from '../../App';
import { Link, useOutletContext } from 'react-router';

export default function Favorites() {
  const { isLoggedIn } = useContext(AuthorizationContext);
  const { savedGames } = useOutletContext<{ savedGames: string[] }>();

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      {isLoggedIn ? (
        <ul>
          {savedGames.map((game) => (
            <li key={game}>{game}</li>
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
