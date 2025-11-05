import React, { useCallback } from 'react';

import {
  Stack,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

export default function EffectifsToolbar({ filters, onResetPage, options }) {
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
          {[{ value: 'all', label: 'Toutes les entreprises' }, ...options.entrepriseList].map(
            (option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>

      <TextField
        name="name"
        label="Nom, prénom"
        value={filters.state.name}
        onChange={handleChange}
        sx={{ maxWidth: { md: 220 } }}
      />

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="actif">Actif / Inactif</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.actif}
          input={<OutlinedInput label="Actif / Inactif" />}
          onChange={handleChange}
          inputProps={{
            name: 'actif',
            id: 'actif',
          }}
        >
          <MenuItem value="actual">Employés actuel</MenuItem>
          <MenuItem value="former">Anciens employés</MenuItem>
          <MenuItem value="all">Tous les employés</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="college">Collège</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.college}
          input={<OutlinedInput label="Collège" />}
          onChange={handleChange}
          inputProps={{
            name: 'college',
            id: 'college',
          }}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="cadre">Cadre</MenuItem>
          <MenuItem value="non-cadre">Non Cadre</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="type">Type de contrat</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.type}
          input={<OutlinedInput label="Type de contrat" />}
          onChange={handleChange}
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="cd">CD</MenuItem>
          <MenuItem value="cdd">CDD</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
