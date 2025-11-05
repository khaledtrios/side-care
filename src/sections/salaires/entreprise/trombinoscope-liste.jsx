import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { TrombinoscopeItem } from './trombinoscope-item';

// ----------------------------------------------------------------------

export function TrombinoscopeListe({ data }) {
  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
      >
        {data.map((employe) => (
          <TrombinoscopeItem key={employe.id} employe={employe} />
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
