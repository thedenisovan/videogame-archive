import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
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
      />
    ) : (
      <img
        className='bg-gray-300 rounded-r-xl p-2'
        width={51}
        src={svg.darkMag}
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
      <button>{themeSvg()}</button>
    </div>
  );
}

// select component from mui
function BasicSelect({ dark }: { dark: boolean }) {
  const [orderBy, setOrderBy] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as string);
  };

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
          onChange={handleChange}
          className={`${dark ? 'bg-gray-800' : 'bg-gray-300'} mt-2`}
        >
          <MenuItem value='rating' selected>
            Popularity
          </MenuItem>
          <MenuItem value='release-date'>Release date</MenuItem>
          <MenuItem value='name'>Alphabetical order</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
