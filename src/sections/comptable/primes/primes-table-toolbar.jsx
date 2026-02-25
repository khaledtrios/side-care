import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'En attente' },
  { value: 'approved', label: 'Validée' },
  { value: 'rejected', label: 'Refusée' },
  { value: 'paid', label: 'Payée' },
];

export default function PrimesTableToolbar({ filters, options, onResetPage }) {
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

  const handleFilterType = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ type: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterPeriod = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ period: event.target.value });
    },
    [filters, onResetPage]
  );

  return (
    <Stack spacing={2} sx={{ p: 2.5 }}>
      {/* First Row - Filters */}
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
      >
        {/* Name Search */}
        <TextField
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName}
          placeholder="Rechercher par employé..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: { md: 280 } }}
        />

        {/* Entreprise Select */}
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-entreprise">Entreprise</InputLabel>
          <Select
            value={filters.state.entreprise}
            onChange={handleFilterEntreprise}
            input={<OutlinedInput label="Entreprise" />}
            inputProps={{ id: 'filter-entreprise' }}
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
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 160 } }}>
          <InputLabel htmlFor="filter-status">Statut</InputLabel>
          <Select
            value={filters.state.status}
            onChange={handleFilterStatus}
            input={<OutlinedInput label="Statut" />}
            inputProps={{ id: 'filter-status' }}
          >
            <MenuItem value="">Tous</MenuItem>
            <Divider />
            {STATUS_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Type Select */}
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-type">Type</InputLabel>
          <Select
            value={filters.state.type}
            onChange={handleFilterType}
            input={<OutlinedInput label="Type" />}
            inputProps={{ id: 'filter-type' }}
          >
            <MenuItem value="">Tous</MenuItem>
            <Divider />
            {options?.types?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Period Select */}
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-period">Période</InputLabel>
          <Select
            value={filters.state.period}
            onChange={handleFilterPeriod}
            input={<OutlinedInput label="Période" />}
            inputProps={{ id: 'filter-period' }}
          >
            <MenuItem value="">Toutes</MenuItem>
            <Divider />
            {options?.periods?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
