import type { GameValue } from '../../apiHooks/GameData';
import { v4 as uuidv4 } from 'uuid';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

export default function GameCard({
  bgImg,
  platforms,
  title,
  rating,
  releaseDate,
  genres,
  id,
}: GameValue) {
  const { dark } = useContext(ThemeContext);
  const randomKey = (prefix: string, key: string | number) =>
    `${prefix}-${key}-${Math.floor(Math.random() * Number(key))}-${uuidv4()}`;

  return (
    <div
      className={`flex flex-col border-2 border-black max-w-[360px] ${
        dark ? 'bg-gray-800' : 'bg-gray-200'
      }`}
    >
      <img src={bgImg} alt='game thumbnail image' />
      <ul className='flex'>
        {platforms.map((plat) => (
          <li key={randomKey(title, id)}>{plat} </li>
        ))}
      </ul>
      <h2>{title}</h2>
      <p>MetaCritics: {rating}</p>
      <p>Release Date: {releaseDate}</p>
      <ul>
        {genres.map((gen) => (
          <li key={randomKey(title, id)}>{gen} </li>
        ))}
      </ul>
    </div>
  );
}
