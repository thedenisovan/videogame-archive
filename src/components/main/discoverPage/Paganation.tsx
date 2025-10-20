import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';

export default function PaginationComp({
  setPage,
}: {
  setPage: (num: number) => void;
}) {
  const { count, page } = useOutletContext<{
    count: number;
    page: number;
  }>();
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scrolls to top smoothly
  };
  const pages = Math.floor(count / 500);

  return (
    <div className={`${pages < 2 ? 'hidden' : ''}`}>
      <Stack spacing={2}>
        <Pagination
          className='m-auto'
          page={page}
          color='primary'
          count={pages}
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
