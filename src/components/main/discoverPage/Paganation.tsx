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
  };
  const pages = Math.floor(count / 30);

  return (
    <Stack spacing={2}>
      <Pagination
        page={page}
        color='primary'
        count={pages}
        onChange={handleChange}
      />
    </Stack>
  );
}
