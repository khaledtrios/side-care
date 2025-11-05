import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { DatePicker } from '@mui/x-date-pickers';
import { formHelperTextClasses } from '@mui/material';

// ----------------------------------------------------------------------

export function EffectifsToolbar({ filters, options, onResetPage, dateError }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterEntreprise = useCallback(
    (event) => {
      const newValue = event.target.value;

      onResetPage();
      filters.setState({ entreprise: newValue });
    },
    [filters, onResetPage]
  );
  const handleFilterContract = useCallback(
    (event) => {
      const newValue = event.target.value;

      onResetPage();
      filters.setState({ contract: newValue });
    },
    [filters, onResetPage]
  );
  const handleFilterCollege = useCallback(
    (event) => {
      const newValue = event.target.value;

      onResetPage();
      filters.setState({ college: newValue });
    },
    [filters, onResetPage]
  );
  const handleFilterStatut = useCallback(
    (event) => {
      const newValue = event.target.value;

      onResetPage();
      filters.setState({ statut: newValue });
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
    <>
      <Stack
         display="grid"
         gap={3}
         gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <FormControl sx={{ flexShrink: 0}}>
          <InputLabel htmlFor="user-filter-role-select-label">Entreprise</InputLabel>
          <Select
            value={filters.state.entreprise}
            onChange={handleFilterEntreprise}
            input={<OutlinedInput label="Entreprise" />}
            renderValue={(selected) => selected}
            inputProps={{ id: 'user-filter-role-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            <MenuItem value="Toutes mes entreprises">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.entreprise === 'Toutes mes entreprises'}
              />
              Toutes mes entreprises
            </MenuItem>
            {options.entreprise.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.entreprise === option}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          value={filters.state.name}
          onChange={handleFilterName}
          placeholder="Rechercher par nom..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ flexShrink: 0}}>
          <InputLabel htmlFor="user-filter-contract-select-label">Type de contrat</InputLabel>
          <Select
            value={filters.state.contract}
            onChange={handleFilterContract}
            input={<OutlinedInput label="Type de contrat" />}
            renderValue={(selected) => selected}
            inputProps={{ id: 'user-filter-contract-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            <MenuItem value="Type de contrat">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.contract === 'Type de contrat'}
              />
              Toutes
            </MenuItem>
            {options.contract.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.contract === option}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flexShrink: 0}}>
          <InputLabel htmlFor="user-filter-college-select-label">Collège</InputLabel>
          <Select
            value={filters.state.college}
            onChange={handleFilterCollege}
            input={<OutlinedInput label="Collège" />}
            renderValue={(selected) => selected}
            inputProps={{ id: 'user-filter-college-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            <MenuItem value="Toutes les collèges">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.college.includes('Toutes les collèges')}
              />
              Toutes les collèges
            </MenuItem>
            {options.college.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.college === option}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <DatePicker
          label="Date du début"
          value={filters.state.startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
        />

        <DatePicker
          label="Date du fin"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'End date must be later than start date' : null,
            },
          }}
          sx={{
            
            [`& .${formHelperTextClasses.root}`]: {
              position: { md: 'absolute' },
              bottom: { md: -40 },
            },
          }}
        />

<FormControl sx={{ flexShrink: 0}}>
          <InputLabel htmlFor="user-filter-statut-select-label">Statut</InputLabel>
          <Select
            value={filters.state.statut}
            onChange={handleFilterStatut}
            input={<OutlinedInput label="Statut" />}
            renderValue={(selected) => selected}
            inputProps={{ id: 'user-filter-statut-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            <MenuItem value="Toutes les salariès">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.statut === 'Toutes les salariès'}
              />
              Toutes les salariès
            </MenuItem>
            <MenuItem value="Ancien salariés">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.statut === 'Ancien salariés'}
              />
              Ancien salariés
            </MenuItem>
            <MenuItem value="Salariés actuels">
              <Checkbox
                disableRipple
                size="small"
                checked={filters.state.statut === 'Salariés actuels'}
              />
              Salariés actuels
            </MenuItem>
            </Select>
        </FormControl>

        {/* <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton> */}
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:import-bold" />
            Import
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Export
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
