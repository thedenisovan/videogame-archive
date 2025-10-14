import { useState } from 'react';
import DiscoverHeader from './DiscoverHeader';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import svg from '../../../utils/svg';

export default function Discover() {
  return (
    <main
      aria-labelledby='main-section-title'
      className={`flex-1 flex items-center flex-col `}
    >
      <DiscoverHeader />
      <SearchBar />
    </main>
  );
}

function SearchBar() {
  const [input, setInput] = useState<string>('');
  const { dark } = useContext(ThemeContext);

  const changeInput = (e: string) => setInput(e);
  const themeSvg = () =>
    dark ? (
      <img
        className='bg-gray-800 rounded-r-xl p-1'
        width={40}
        src={svg.lightMag}
      />
    ) : (
      <img
        className='bg-gray-300 rounded-r-xl p-1'
        width={40}
        src={svg.darkMag}
      />
    );

  return (
    <div className='w-100 flex justify-center mt-2'>
      <input
        className={`rounded-l-[.3rem] w-85 border-0 !border-r-1 ${
          dark ? 'bg-gray-800' : 'bg-gray-300'
        }`}
        value={input}
        onChange={(e) => changeInput(e.target.value)}
        type='text'
        placeholder='Search for game by title'
      />
      <button>{themeSvg()}</button>
    </div>
  );
}
