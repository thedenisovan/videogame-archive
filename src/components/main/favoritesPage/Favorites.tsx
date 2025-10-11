import { useContext } from 'react';
import { AuthorizationContext } from '../../App';
import { Link } from 'react-router';

export default function Favorites() {
  const { isLoggedIn } = useContext(AuthorizationContext);

  return (
    <main className={`flex-1 flex justify-center items-center`}>
      {isLoggedIn ? <h1>Favorites page</h1> : <NoUser />}
    </main>
  );
}

function NoUser() {
  return (
    <div>
      <h2 className='text-center'>No user is signed in</h2>
      You can go back to{' '}
      <Link className=' !text-blue-200' to='/'>
        {' '}
        main page
      </Link>{' '}
      or
      <Link className=' !text-blue-200' to='/auth'>
        {' '}
        register
      </Link>
    </div>
  );
}
