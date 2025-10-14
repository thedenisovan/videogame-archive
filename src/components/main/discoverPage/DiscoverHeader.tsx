import svg from '../../../utils/svg';

export default function DiscoverHeader() {
  return (
    <header
      tabIndex={0}
      aria-labelledby='main-section-title'
      className='flex gap-2 bg-gray-500 m-2 rounded-xl'
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
