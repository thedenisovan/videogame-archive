import type { GameValue } from '../../apiHooks/GameData';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../../App';
import { useContext /*useState*/ } from 'react';
import svg from '../../../utils/svg';
import Carousel from 'react-bootstrap/Carousel';

export default function GameCard({
  title,
  rating,
  releaseDate,
  genres,
  id,
  screenshots,
}: GameValue) {
  const { dark } = useContext(ThemeContext);
  const randomKey = (prefix: string, key: string | number) =>
    `${prefix}-${key}-${Math.floor(Math.random() * Number(key))}-${uuidv4()}`;
  // const [hovered, setHovered] = useState<boolean>(false);

  return (
    <div
      // onMouseOver={() => setHovered(true)}
      // onMouseLeave={() => setHovered(false)}
      className={`flex flex-col rounded-[5px] max-w-[360px] h-[400px] p-2   ${
        dark ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      <ScreenshotCarousel urls={screenshots} />
      <h2 className='!text-[1.2rem] !leading-5 mt-2 font-sans mb-1`'>
        {title}
      </h2>
      <ul className='flex gap-1 p-0 flex-wrap'>
        {genres.map((gen) => (
          <li
            className={`${
              dark ? 'bg-gray-700' : 'bg-gray-300'
            } rounded-2xl p-1`}
            key={randomKey(title, id)}
          >
            {gen}
          </li>
        ))}
      </ul>
      <div className='flex justify-between'>
        <div
          className={`mb-1 mt-1 h-11 rounded-2xl p-1 w-[7rem] flex ${
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
          className={`mb-1 mt-1 h-10 rounded-2xl p-1 flex items-center ${
            dark ? 'bg-gray-700' : 'bg-gray-300'
          }`}
        >
          <p className='mb-0'>Release: {releaseDate}</p>
        </div>
      </div>
      <button className='border-1 !rounded-[.3rem] mt-2 border-none !text-black !text-xl bg-green-400 h-8'>
        Save
      </button>
    </div>
  );
}

function ScreenshotCarousel({ urls }: { urls: string[] }) {
  return (
    <Carousel interval={null}>
      {urls.map((url) => (
        <Carousel.Item key={url}>
          <img
            className='!rounded-[5px] !h-[220px] !object-cover'
            src={url}
            alt='game screenshot'
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
