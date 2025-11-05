import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { TrombinoscopeItem } from './trombinoscope-item';

// import { TourItem } from './tour-item';

// ----------------------------------------------------------------------

export function TrombinoscopeListe({ data }) {
  const router = useRouter();

//   const handleView = useCallback(
//     (id) => {
//       router.push(paths.dashboard.tour.details(id));
//     },
//     [router]
//   );

//   const handleEdit = useCallback(
//     (id) => {
//       router.push(paths.dashboard.tour.edit(id));
//     },
//     [router]
//   );

//   const handleDelete = useCallback((id) => {
//     console.info('DELETE', id);
//   }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      >
        {data.map((employe) => (
          <TrombinoscopeItem
            key={employe.id}
            employe={employe}
          />
        ))}
      </Box>

      {data.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: 'center' },
          }}
        />
      )}
    </>
  );
}
