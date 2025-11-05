import React, { useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

export default function EntretienTableToolbar({ filters, onResetPage, dateError, options }) {
  const handleFilterEntreprise = useCallback(
    (event) => {
      const newValue = event.target.value;

      onResetPage();
      filters.setState({ entreprise: newValue });
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
      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 220 } }}>
        <InputLabel htmlFor="invoice-filter-entreprise-select-label">Entreprise</InputLabel>
        <Select
          value={filters.state.entreprise}
          onChange={handleFilterEntreprise}
          input={<OutlinedInput label="Entreprise" />}
          renderValue={(selected) => selected}
          inputProps={{ id: 'invoice-filter-entreprise-select-label' }}
          sx={{ textTransform: 'capitalize' }}
        >
          <MenuItem>Toutes</MenuItem>
          <Divider />
          {options?.entreprises.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker
        label="Date début"
        value={filters.state.endDate}
        onChange={handleFilterStartDate}
        slotProps={{ textField: { fullWidth: true } }}
        sx={{ maxWidth: { md: 220 } }}
      />

      <DatePicker
        label="Date fin"
        value={filters.state.endDate}
        onChange={handleFilterEndDate}
        slotProps={{
          textField: {
            fullWidth: true,
            error: dateError,
            helperText: dateError ? 'Il faut supérieur de date de début' : null,
          },
        }}
        sx={{
          maxWidth: { md: 220 },
          [`& .${formHelperTextClasses.root}`]: {
            bottom: { md: -40 },
            position: { md: 'absolute' },
          },
        }}
      />
    </Stack>
  );
}
