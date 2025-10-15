import type { GameValue } from '../../apiHooks/GameData';
import { v4 as uuidv4 } from 'uuid';

export default function GameCard({
  bgImg,
  platforms,
  title,
  rating,
  releaseDate,
  genres,
  id,
}: GameValue) {
  const randomKey = (prefix: string, key: string | number) =>
    `${prefix}-${key}-${Math.floor(Math.random() * Number(key))}-${uuidv4()}`;

  return (
    <div className='flex flex-col border-2 border-black'>
      <img src={bgImg} alt='game thumbnail image' />
      <ul>
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
