import { useOutletContext } from 'react-router';
import type { ChangeEvent } from 'react';

export default function GenreDropdown() {
  const { setGenres, genres } = useOutletContext<{
    setGenres: (genres: string[] | ((prev: string[]) => string[])) => void;
    genres: string[];
  }>();

  // displays games based on they genre
  const setGenresValues = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      // not allow to un check last genre checkbox
      if (genres.length === 1) return;
      // if genre unchecked remove it from genre list
      setGenres((prev: string[]) =>
        prev.filter((p: string) => p !== e.target.value)
      );
    } else if (e.target.checked) {
      setGenres((prev: string[]) => [...prev, e.target.value]);
    }
  };

  return (
    <div>
      {availableGenres.map((gen) => (
        <div key={gen.value}>
          <label htmlFor={gen.value}>{gen.label}</label>
          <input
            checked={genres.includes(gen.value)}
            type='checkbox'
            id={gen.value}
            value={gen.value}
            onChange={(e) => setGenresValues(e)}
          />
        </div>
      ))}
    </div>
  );
}

const availableGenres = [
  { label: 'Action', value: 'action' },
  { label: 'Indie', value: 'indie' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'RPG', value: 'role-playing-games-rpg' },
  { label: 'Strategy', value: 'strategy' },
  { label: 'Shooter', value: 'shooter' },
  { label: 'Casual', value: 'casual' },
  { label: 'Simulation', value: 'simulation' },
  { label: 'Puzzle', value: 'puzzle' },
  { label: 'Arcade', value: 'arcade' },
  { label: 'Platformer', value: 'platformer' },
  { label: 'Massively Multiplayer', value: 'massively-multiplayer' },
  { label: 'Racing', value: 'racing' },
  { label: 'Sports', value: 'sports' },
  { label: 'Fighting', value: 'fighting' },
  { label: 'Family', value: 'family' },
  { label: 'Board Games', value: 'board-games' },
  { label: 'Card', value: 'card' },
  { label: 'Education', value: 'educational' },
];
