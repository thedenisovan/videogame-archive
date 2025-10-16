import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import { useOutletContext } from 'react-router';
import svg from '../../../utils/svg';

export default function FilterBar() {
  const { dark } = useContext(ThemeContext);

  return (
    <section>
      <SearchBar dark={dark} />
      <BasicSelect dark={dark} />
    </section>
  );
}

function SearchBar({ dark }: { dark: boolean }) {
  const [input, setInput] = useState<string>('');

  const changeInput = (e: string) => setInput(e);
  // selects correct svg color based on current color theme
  const themeSvg = () =>
    dark ? (
      <img
        className='bg-gray-800 rounded-r-xl p-2'
        width={51}
        src={svg.lightMag}
        alt='magnify glass svg'
      />
    ) : (
      <img
        className='bg-gray-300 rounded-r-xl p-2'
        width={51}
        src={svg.darkMag}
        alt='magnify glass svg'
      />
    );

  return (
    <div className='w-100 flex justify-center mt-2'>
      <input
        className={`rounded-l-[.3rem] h-13 w-85 border-0 !border-r-1 ${
          dark ? 'bg-gray-800' : 'bg-gray-300'
        }`}
        value={input}
        onChange={(e) => changeInput(e.target.value)}
        type='text'
        placeholder='Search for game by title'
      />
      <button aria-label='search game by title'>{themeSvg()}</button>
    </div>
  );
}

// select component from mui
function BasicSelect({ dark }: { dark: boolean }) {
  const { setOrderByVal, orderBy } = useOutletContext<{
    setOrderByVal: (e: string) => void;
    orderBy: string;
  }>();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          className={`mt-2 !text-xl z-1 ${dark ? 'text-white' : 'text-black'}`}
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
          } mt-2`}
        >
          <MenuItem
            aria-label='sort games by rating from highest to lowest'
            value='-metacritic'
            selected
          >
            Rating ↓
          </MenuItem>
          <MenuItem
            aria-label='sort games by rating from lowest to highest'
            value='metacritic'
          >
            Rating ↑
          </MenuItem>

          <MenuItem aria-label='sort games by user rating' value='-ratings'>
            User Picks
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
