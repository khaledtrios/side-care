import React, { useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  formHelperTextClasses,
} from '@mui/material';

export default function HistoriqueFiltersToolbar({ filters, options, onResetPage, dateError }) {
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      onResetPage();
      filters.setState({ [name]: value });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
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
        <InputLabel htmlFor="employe">Employé</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.employe}
          input={<OutlinedInput label="Employé" />}
          onChange={handleChange}
          inputProps={{
            name: 'employe',
            id: 'employe',
          }}
        >
          {[{ value: 'all', label: 'Toutes les employés' }, ...options.employes].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      <DatePicker
        name="startDate"
        label="Date de début"
        value={filters.state.startDate}
        onChange={handleFilterStartDate}
        slotProps={{ textField: { fullWidth: true } }}
        sx={{ maxWidth: { md: 200 } }}
      />

      <DatePicker
        label="Date de fin"
        value={filters.state.endDate}
        onChange={handleFilterEndDate}
        name="endDate"
        slotProps={{
          textField: {
            fullWidth: true,
            name: 'endDate',
            error: dateError,
            helperText: dateError
              ? 'La date de fin doit être postérieure à la date de début.'
              : null,
          },
        }}
        sx={{
          maxWidth: { md: 200 },
          [`& .${formHelperTextClasses.root}`]: {
            position: { md: 'absolute' },
            bottom: { md: -40 },
          },
        }}
      />
    </Stack>
  );
}
