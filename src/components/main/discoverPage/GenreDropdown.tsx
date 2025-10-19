import { useOutletContext } from 'react-router';
import type { ChangeEvent } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import availableGenres from '../../../utils/genreObj';

export default function GenreDropdown({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const { dark } = useContext(ThemeContext);
  const { setGenres, genres } = useOutletContext<{
    setGenres: (genres: string[] | ((prev: string[]) => string[])) => void;
    genres: string[];
  }>();

  // displays games based on they genre
  const setGenresValues = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      // if genre unchecked remove it from genre list
      setGenres((prev: string[]) =>
        prev.filter((p: string) => p !== e.target.value)
      );
    } else if (e.target.checked) {
      setGenres((prev: string[]) => [...prev, e.target.value]);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
         text-black absolute top-17 right-0 z-1 animate-drop transition-transform origin-top p-2
        w-45 border-1
        lg:!border-0 lg:!w-[100%] lg:animate-none lg:top-0 lg:!sticky lg:!pl-5
        ${dark ? 'bg-gray-600 text-white' : 'bg-gray-300'}
        ${isCollapsed ? `scale-y-0` : `scale-y-100`}`}
    >
      <h3 className='text-center !font-normal lg:!text-left lg:!font-bold'>
        Browse genres
      </h3>
      {availableGenres.map((gen) => (
        <div
          key={gen.value}
          className={`flex justify-between items-center lg:!mt-2 lg:py-1 lg:px-2 lg:rounded-[5px] ${
            dark
              ? ' lg:bg-gray-500 lg:hover:bg-gray-700'
              : 'lg:bg-gray-200 lg:hover:bg-gray-100'
          }`}
        >
          <label className='cursor-pointer lg:text-xl' htmlFor={gen.value}>
            {gen.label}
          </label>
          <input
            className='border-0 cursor-pointer'
            checked={genres.includes(gen.value)}
            tabIndex={!isCollapsed ? 0 : -1}
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
