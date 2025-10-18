import svg from '../../../utils/svg';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

export default function DiscoverHeader() {
  const { dark } = useContext(ThemeContext);

  return (
    <header
      tabIndex={0}
      aria-labelledby='main-section-title'
      className={`flex gap-2 rounded-[7px]  ${
        dark ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      <img
        src={svg.gamepad}
        alt='controller icon'
        width={70}
        className='pl-3'
      />
      <div>
        <h2 id='main-section-title' className='mb-0'>
          Browse & Search
        </h2>
        <p className='text-left '>
          Discover your next gaming obsession from thousands of titles
        </p>
      </div>
    </header>
  );
}
