import dayjs from 'dayjs';
import React, { useCallback } from 'react';

import { DatePicker } from '@mui/x-date-pickers';
import {
  Stack,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import { usePopover } from 'src/components/custom-popover';

export default function CongeListFilters({ filters, options, onResetPage }) {
  const popover = usePopover();

  console.log(options);

  const handleFilterCompanies = useCallback(
    (event) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      filters.setState({ companies: newValue });
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

      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <DatePicker
          views={['year', 'month']}
          label="Période"
          minDate={dayjs('2012-03-01')}
          maxDate={dayjs()}
          value={filters.state.period ? dayjs(filters.state.period) : null}
          onChange={(newValue) => {
            filters.setState({ period: newValue ? newValue.toDate() : null });
            onResetPage();
          }}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </FormControl>

      <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
        <InputLabel id="filter-status-select-label">Statut</InputLabel>
        <Select
          labelId="filter-status-select-label"
          value={filters.state.status}
          label="Statut"
          onChange={(event) => {
            filters.setState({ status: event.target.value });
            onResetPage();
          }}
          input={<OutlinedInput label="Statut" />}
          sx={{ textTransform: 'capitalize' }}
        >
          {options.status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
