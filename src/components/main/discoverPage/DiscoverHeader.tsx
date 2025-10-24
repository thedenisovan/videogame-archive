import svg from '../../../utils/svg';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

export default function DiscoverHeader() {
  const { dark } = useContext(ThemeContext);

  return (
    <header
      tabIndex={0}
      aria-labelledby='main-section-title'
      className={`
        flex gap-2 rounded-[7px]
        md:bg-transparent md:!gap-0 md:w-[100%] md:justify-center
        ${dark ? 'bg-gray-800' : 'bg-gray-300'}`}
    >
      <img
        src={svg.gamepad}
        alt='controller icon'
        width={70}
        className='pl-3 md:!hidden'
      />
      <div>
        <h2
          id='main-section-title'
          className='mb-0 md:!text-3xl md:text-center'
        >
          Browse & Search
        </h2>
        <p className='text-left md:text-xl md:!text-center md:!mb-0'>
          Discover your next gaming obsession from thousands of titles
        </p>
      </div>
    </header>
  );
}
