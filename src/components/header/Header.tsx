import { useContext } from 'react';
import { ThemeContext } from '../App';
import svg from '../../utils/svg';

export default function Header() {
  const { dark, toggleDark } = useContext(ThemeContext);

  return (
    <header
      className={`${
        dark ? 'text-white bg-gray-700' : 'bg-gray-200 text-black'
      } flex justify-between p-4`}
    >
      <h1>header</h1>
      <button
        onClick={() => toggleDark()}
        className={`bg-white border-1 w-[4rem] h-[2rem] rounded-2xl flex align-middle`}
      >
        {dark ? (
          <img
            width='30px'
            className='rotate-180 translate-x-[31px] duration-200'
            src={svg.sun}
          />
        ) : (
          <img
            className='-translate-x-[0px] duration-200'
            width='30px'
            src={svg.moon}
          />
        )}
      </button>
    </header>
  );
}
