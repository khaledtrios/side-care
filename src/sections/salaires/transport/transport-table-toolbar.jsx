import React, { useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Stack,
  Select,
  Divider,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  formHelperTextClasses,
} from '@mui/material';

export default function TransportTableToolbar({ filters, dateError, onResetPage }) {

  const handleFilterEntreprise = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ entreprise: event.target.value });
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
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
    >
      {/* Entreprise Select */}
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
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
          {[].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

     
      <DatePicker
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
        slotProps={{
          textField: {
            fullWidth: true,
            error: dateError,
            helperText: dateError
              ? 'La date de fin doit être postérieure à la date de début'
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
