import React, { useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Stack,
  Select,
  Divider,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ClotureTableToolbar({ filters, options, onResetPage }) {
  const handleFilterEntreprise = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ entreprise: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStatus = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ status: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterPeriod = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ period: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ employe: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      {/* Entreprise Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="filter-entreprise">Entreprise</InputLabel>
        <Select
          value={filters.state.entreprise}
          onChange={handleFilterEntreprise}
          input={<OutlinedInput label="Entreprise" />}
          inputProps={{ id: 'filter-entreprise' }}
          renderValue={(selected) => selected}
          sx={{ textTransform: 'capitalize' }}
        >
          <MenuItem value="">Toutes</MenuItem>
          <Divider />
          {options?.entreprises?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Status Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
        <InputLabel htmlFor="filter-status">Statut</InputLabel>
        <Select
          value={filters.state.status}
          onChange={handleFilterStatus}
          input={<OutlinedInput label="Statut" />}
          inputProps={{ id: 'filter-status' }}
          sx={{ textTransform: 'capitalize' }}
        >
          {options?.status?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Period Picker */}
      <DatePicker
        label="Période"
        value={filters.state.period}
        onChange={handleFilterPeriod}
        views={['month', 'year']}
        slotProps={{ textField: { fullWidth: true } }}
        sx={{ maxWidth: { md: 180 } }}
      />

      {/* Employee Search */}
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
        <TextField
          fullWidth
          value={filters.state.employe}
          onChange={handleFilterName}
          placeholder="Rechercher un employé..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
}
