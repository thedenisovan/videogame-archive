import type { GameValue } from '../../apiHooks/GameData';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../../App';
import { useContext /*useState*/, useState } from 'react';
import svg from '../../../utils/svg';
import defaultImg from '../../../assets/no-img.jpg';

export default function GameCard({
  title,
  rating,
  releaseDate,
  genres,
  screenshots,
}: GameValue) {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      // onMouseOver={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      className={`flex flex-col rounded-[5px] max-w-[360px] h-[460px] p-2   ${
        dark ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      <CarouselComp screenshots={screenshots} />
      <h2 className='!text-[1.2rem] !leading-5 font-sans`'>{title}</h2>
      <ul className='flex gap-1 mb-1 p-0 flex-wrap'>
        {genres.map((gen) => (
          <li
            className={`${
              dark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded-2xl p-1`}
            key={uuidv4()}
          >
            {gen}
          </li>
        ))}
      </ul>
      <div className='flex justify-between !mb-10'>
        <div
          className={`mb-1 h-11 rounded-2xl p-1 w-[7rem] flex ${
            dark ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <img alt='theater svg of mask img' src={svg.theater} width={35} />
          <div className='flex flex-col items-end'>
            <p className='font-bold font-mono !text-right'>Rating</p>{' '}
            <p className='-translate-y-5 text-center'>{rating}%</p>
          </div>
        </div>
        <div
          className={` h-10 rounded-2xl p-1 flex items-center ${
            dark ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <p className='mb-0'>Release: {releaseDate}</p>
        </div>
      </div>
    </div>
  );
}

function CarouselComp({ screenshots }: { screenshots: string[] }) {
  const [idx, setIdx] = useState<number>(0);
  const maxIdx = screenshots.length - 1;

  const goForward = () => {
    if (idx !== maxIdx) setIdx(idx + 1);
    else if (idx === maxIdx) setIdx(0);
    else return `Error maxIdx: ${maxIdx} currIdx: ${idx}`;
  };
  const goBack = () => {
    if (idx !== 0) setIdx(idx - 1);
    else if (idx === 0) setIdx(maxIdx);
    else return `Error maxIdx: ${maxIdx} currIdx: ${idx}`;
  };
  const jumpToPage = (i: number) => setIdx(i);

  return (
    <div className='m-auto'>
      <img
        className='!rounded-[5px] !h-[220px] !object-cover !w-100'
        src={screenshots[idx] ? screenshots[idx] : defaultImg}
        alt='game screenshot'
      />
      <PageIndicator
        jumpToPage={jumpToPage}
        screenshot={screenshots}
        idx={idx}
      />
      <div className='relative'>
        <button
          className='!font-bold text-red-500 cursor-pointer'
          onClick={() => goBack()}
        >
          <img
            className='w-14 absolute bottom-25 left-0 hover:scale-[1.1] transition'
            src={svg.previous}
            alt='previous slide'
          />
        </button>
        <button
          className='!font-bold text-red-500 cursor-pointer'
          onClick={() => goForward()}
        >
          <img
            className='w-14 absolute bottom-25 right-0 z-0 hover:scale-[1.1] transition'
            src={svg.next}
            alt='next slide'
          />
        </button>
      </div>
    </div>
  );
}

function PageIndicator({
  screenshot,
  idx,
  jumpToPage,
}: {
  screenshot: string[];
  idx: number;
  jumpToPage: (i: number) => void;
}) {
  return (
    <ul className=' flex justify-between pt-2 px-6'>
      {screenshot.map((url: string, index: number) => (
        <li
          onClick={() => jumpToPage(index)}
          className={`cursor-pointer rounded-3xl w-4 h-4 border-1 ${
            idx === index ? 'bg-gray-500' : ''
          }`}
          key={url + index}
        ></li>
      ))}
    </ul>
  );
}
