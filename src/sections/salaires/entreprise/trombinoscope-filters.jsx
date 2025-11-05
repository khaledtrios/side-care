import React, { useCallback } from 'react';

import {
  Stack,
  TextField,
} from '@mui/material';

export default function TrombinoscopeFilters({ filters }) {
  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ name: event.target.value });
    },
    [filters]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <TextField
        label="Collaborateur"
        value={filters.state.name}
        onChange={handleFilterName}
        sx={{ width: { xs: 1, md: 240 } }}
      />
    </Stack>
  );
}
