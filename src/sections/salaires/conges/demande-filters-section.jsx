import React from 'react';

import { Stack, Button, Select, Divider, MenuItem, InputLabel, FormControl } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function DemandeFiltersSection({ filters }) {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } }}>
        <InputLabel htmlFor="periode-filter">Période</InputLabel>
        <Select
          placeholder="Période"
          label="Période"
          inputProps={{ id: 'periode-filter' }}
          value={filters.period}
          onChange={(e) => filters.setState({ ...filters, period: e.target.value })}
        >
          <MenuItem value="all">Toutes les périodes</MenuItem>
          <Divider />
          <MenuItem value="07/2026">Juil. 2026</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 250 } }}>
        <InputLabel htmlFor="status-filter">Statut</InputLabel>
        <Select
          placeholder="Statut"
          label="Statut"
          inputProps={{ id: 'statut-filter' }}
          value={filters.statut}
          onChange={(e) => filters.setState({ ...filters, statut: e.target.value })}
        >
          <MenuItem value="coming">Congés & absences à venir</MenuItem>
          <MenuItem value="past">Congés & absences passés</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained">
        <Iconify icon="material-symbols:search-rounded" />
      </Button>
    </Stack>
  );
}
