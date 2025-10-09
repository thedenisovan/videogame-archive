import { useContext } from 'react';
import { ThemeContext } from '../App';

export default function Header() {
  const { dark, toggleDark } = useContext(ThemeContext);

  return (
    <header
      className={`${
        dark ? 'text-white bg-gray-700' : 'bg-gray-200 text-black'
      } flex justify-between p-4`}
    >
      <h1>header</h1>
      <button
        onClick={() => toggleDark()}
        className='dark:bg-white dark:text-black border-1'
      >
        {dark ? 'Light' : 'Dark'}
      </button>
    </header>
  );
}
