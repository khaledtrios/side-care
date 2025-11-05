import React from 'react';

import {
  Stack,
  Select,
  Divider,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

export default function PrimesTableToolbar({ filters, options }) {
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      {/* Entreprise Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
        <InputLabel htmlFor="filter-entreprise">Entreprise</InputLabel>
        <Select
          value={filters.state.entreprise}
          // onChange={handleFilterEntreprise}
          input={<OutlinedInput label="Entreprise" />}
          inputProps={{ id: 'filter-entreprise' }}
          renderValue={(selected) => selected}
          sx={{ textTransform: 'capitalize' }}
        >
          <MenuItem value="">Toutes</MenuItem>
          <Divider />
          {options?.entreprises.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Équipe Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
        <InputLabel htmlFor="filter-equipe">Équipe</InputLabel>
        <Select
          value={filters.state.equipe}
          // onChange={handleFilterEquipe}
          input={<OutlinedInput label="Équipe" />}
          inputProps={{ id: 'filter-equipe' }}
          renderValue={(selected) => selected}
          sx={{ textTransform: 'capitalize' }}
        >
          <MenuItem value="">Toutes</MenuItem>
          <Divider />
          {options?.equipes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* period Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
        <InputLabel htmlFor="filter-team">Périod</InputLabel>
        <Select
          value={filters.state.period}
          // onChange={handleFilterPeriod}
          input={<OutlinedInput label="period" />}
          inputProps={{ id: 'filter-period' }}
          renderValue={(selected) => selected}
          sx={{ textTransform: 'capitalize' }}
        >
          <MenuItem value="">Toutes le temps</MenuItem>
          <Divider />
          {options?.periods.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
