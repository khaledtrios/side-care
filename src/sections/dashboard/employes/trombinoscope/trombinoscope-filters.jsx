import React, { useCallback } from 'react';
import {
  Stack,
  TextField,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

export default function TrombinoscopeFilters({ filters, options }) {
  const handleFilterName = useCallback(
    (event) => {
      filters.setState({ name: event.target.value });
    },
    [filters]
  );

  const handleFilterEntreprise = useCallback(
    (event) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
      filters.setState({ entreprise: newValue });
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
        label="Nom"
        value={filters.state.name}
        onChange={handleFilterName}
        sx={{ width: { xs: 1, md: 240 } }}
      />

      <FormControl sx={{ width: { xs: 1, md: 240 } }}>
        <InputLabel>Entreprise</InputLabel>
        <Select
          multiple
          value={filters.state.entreprise}
          onChange={handleFilterEntreprise}
          input={<OutlinedInput label="Entreprise" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
        >
          {options.entreprise.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={filters.state.entreprise.includes(option)} />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
