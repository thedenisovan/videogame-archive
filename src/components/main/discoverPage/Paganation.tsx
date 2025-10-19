import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { type ChangeEvent } from 'react';
import { useOutletContext } from 'react-router';

export default function PaginationComp({
  setPage,
}: {
  setPage: (num: number) => void;
}) {
  const { count } = useOutletContext<{ count: number }>();
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        color='primary'
        count={count < 30 ? count : 30}
        onChange={handleChange}
      />
    </Stack>
  );
}
