import { Link } from 'react-router';

export default function ErrorElement() {
  return (
    <div className='h-[100%] flex flex-col justify-center m-auto text-center'>
      <h2>Whops you have came to unknown waters</h2>
      <p>
        You can go back to <Link to='/'>main page</Link>
      </p>
    </div>
  );
}
