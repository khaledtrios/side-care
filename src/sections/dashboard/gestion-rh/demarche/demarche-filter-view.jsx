import React, { useCallback } from 'react';

import { Stack, Select, MenuItem, Checkbox, InputLabel, FormControl, OutlinedInput, InputAdornment, TextField, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

export default function DemarcheFilterView({ filters, options, onResetPage }) {
  const popover = usePopover()
  const handleFilterCompanies = useCallback(
    (event) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      filters.setState({ companies: newValue });
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
  return (
    <Stack
      spacing={2}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel htmlFor="filter-entreprise-select-label">Entreprise</InputLabel>

        <Select
          multiple
          value={filters.state.companies}
          onChange={handleFilterCompanies}
          input={<OutlinedInput label="Entreprise" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          inputProps={{ id: 'filter-entreprise-select-label' }}
          sx={{ textTransform: 'capitalize' }}
        >
          {options.companies.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.companies.includes(option)}
              />
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

       <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Rechercher par nom d'employé..."
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
