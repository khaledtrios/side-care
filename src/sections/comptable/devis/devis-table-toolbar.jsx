import React, { useCallback } from 'react';

import { Stack, Select, MenuItem, InputLabel, FormControl, OutlinedInput } from '@mui/material';

export default function DevisTableToolbar({ filters, onResetPage, options }) {
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      onResetPage();
      filters.setState({ [name]: value });
    },
    [filters, onResetPage]
  );
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      flexWrap="wrap"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="entreprise">Entreprise</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.entreprise}
          input={<OutlinedInput label="Entreprise" />}
          onChange={handleChange}
          inputProps={{
            name: 'entreprise',
            id: 'entreprise',
          }}
        >
          {[{ value: 'all', label: 'Toutes les entreprise' }, ...options.entreprise].map(
            (option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="paie">Gestionnaire de paie</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.paie}
          input={<OutlinedInput label="Gestionnaire de paie" />}
          onChange={handleChange}
          inputProps={{
            name: 'paie',
            id: 'paie',
          }}
        >
          {[{ value: 'all', label: 'Toutes les gestionnaire' }, ...options.paie].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="cabinet">Cabinet</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.cabinet}
          input={<OutlinedInput label="Employé" />}
          onChange={handleChange}
          inputProps={{
            name: 'cabinet',
            id: 'cabinet',
          }}
        >
          {[{ value: 'all', label: 'Toutes les employés' }, ...options.cabinet].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
