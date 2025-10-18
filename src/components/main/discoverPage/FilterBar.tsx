import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, type ReactElement } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { useOutletContext } from 'react-router';
import svg from '../../../utils/svg';
import GenreDropdown from './GenreDropdown';
import { CollapseContext } from './Discover';

// component for search bar select element and genre dropdown
export default function FilterBar() {
  const { dark } = useContext(ThemeContext);
  const themeSvg = (src1: string, src2: string) =>
    dark ? (
      <img
        className='bg-gray-800 rounded-r-xl p-2 w-13'
        src={src1}
        alt='svg icon'
      />
    ) : (
      <img
        className='bg-gray-300 rounded-r-xl p-2 !w-13'
        src={src2}
        alt='svg icon'
      />
    );

  return (
    <section>
      <SearchBar themeSvg={themeSvg} dark={dark} />
      <BasicSelect themeSvg={themeSvg} dark={dark} />
    </section>
  );
}

// component for game search bar
function SearchBar({
  dark,
  themeSvg,
}: {
  dark: boolean;
  themeSvg: (src1: string, src2: string) => ReactElement;
}) {
  const [input, setInput] = useState<string>('');

  const changeInput = (e: string) => setInput(e);
  // selects correct svg color based on current color theme

  return (
    <div className='w-[100%] m-auto flex justify-center mt-2'>
      <input
        className={`rounded-l-[.3rem] h-13 w-85 border-0 !border-r-1 ${
          dark ? 'bg-gray-800' : 'bg-gray-300'
        }`}
        value={input}
        onChange={(e) => changeInput(e.target.value)}
        type='text'
        placeholder='Search for game by title'
      />
      <button aria-label='search game by title'>
        {themeSvg(svg.lightMag, svg.darkMag)}
      </button>
    </div>
  );
}

// select component from mui
function BasicSelect({
  dark,
  themeSvg,
}: {
  dark: boolean;
  themeSvg: (src1: string, src2: string) => ReactElement;
}) {
  const { isCollapsed, setIsCollapsed } = useContext(CollapseContext);
  const { setOrderByVal, orderBy } = useOutletContext<{
    setOrderByVal: (e: string) => void;
    orderBy: string;
  }>();

  const collapseDropdown = () => setIsCollapsed(!isCollapsed);

  return (
    <div className='relative flex'>
      <Box sx={{ minWidth: 120 }}>
        <FormControl
          fullWidth
          className='my-2 flex flex-row justify-between relative'
        >
          <InputLabel
            className={`mt-2 !text-xl z-1 ${
              dark ? 'text-white' : 'text-black'
            }`}
            id='demo-simple-select-label'
          >
            Order by
          </InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={orderBy}
            label='order-by'
            onChange={(e) => {
              setOrderByVal(e.target.value);
            }}
            className={`${
              dark ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'
            } mt-2 w-85 h-13 !rounded-r-0 border-r-1`}
          >
            <MenuItem
              aria-label='sort games by rating from highest to lowest'
              value='-metacritic'
              selected
            >
              Critic Rating
            </MenuItem>
            <MenuItem aria-label='sort games by user rating' value='-ratings'>
              User Rating
            </MenuItem>
            <MenuItem aria-label='sort games newest first' value='-released'>
              Newest first
            </MenuItem>
            <MenuItem aria-label='sort games oldest first' value='released'>
              Oldest first
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <button
        onClick={() => collapseDropdown()}
        className='translate-y-1'
        aria-label='drop down collapse for game genre select'
      >
        {themeSvg(svg.filterLight, svg.filterDark)}
      </button>
      {/* genre drop down component */}
      <GenreDropdown isCollapsed={isCollapsed} />{' '}
    </div>
  );
}
