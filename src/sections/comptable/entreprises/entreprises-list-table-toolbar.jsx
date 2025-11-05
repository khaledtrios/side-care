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

export default function EntrepriseListTableToolbar({ filters, onResetPage, options }) {
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
      <TextField
        name="raison"
        label="Raison sociale"
        value={filters.state.raison}
        onChange={handleChange}
        sx={{ maxWidth: { md: 220 } }}
      />

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="garantie">Garanties nécessaires</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.garantie}
          input={<OutlinedInput label="Garanties nécessaires" />}
          onChange={handleChange}
          inputProps={{
            name: 'garantie',
            id: 'garantie',
          }}
        >
          {[
            { value: true, label: 'Oui' },
            { value: false, label: 'Non' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="anomalies">Anomalies détectées</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.anomalies}
          input={<OutlinedInput label="Anomalies détectées" />}
          onChange={handleChange}
          inputProps={{
            name: 'anomalies',
            id: 'anomalies',
          }}
        >
          {[
            { value: true, label: 'Oui' },
            { value: false, label: 'Non' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="offreTrouvee">Offres trouvées</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.offreTrouvee}
          input={<OutlinedInput label="Offres trouvées" />}
          onChange={handleChange}
          inputProps={{
            name: 'offreTrouvee',
            id: 'offreTrouvee',
          }}
        >
          {[
            { value: true, label: 'Oui' },
            { value: false, label: 'Non' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        name="minEmp"
        label="Minimum employés"
        value={filters.state.minEmp}
        onChange={handleChange}
        sx={{ maxWidth: { md: 220 } }}
      />

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="convention">Convention collective</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.convention}
          input={<OutlinedInput label="Convention collective" />}
          onChange={handleChange}
          inputProps={{
            name: 'convention',
            id: 'convention',
          }}
        >
          {options?.conventionList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="anneeDsn">Année dernière DSN</InputLabel>
        <Select
          sx={{ width: 200 }}
          value={filters.state.anneeDsn}
          input={<OutlinedInput label="Année dernière DSN" />}
          onChange={handleChange}
          inputProps={{
            name: 'anneeDsn',
            id: 'anneeDsn',
          }}
        >
          {options?.anneeDsnList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ flexShrink: 0 }}>
        <InputLabel htmlFor="clientSigned">Client signé avec SideCare</InputLabel>
        <Select
          sx={{ width: 250 }}
          value={filters.state.clientSigned}
          input={<OutlinedInput label="Client signé avec SideCare" />}
          onChange={handleChange}
          inputProps={{
            name: 'clientSigned',
            id: 'clientSigned',
          }}
        >
          {[
            { value: 'true', label: 'Oui' },
            { value: 'false', label: 'Non' },
            { value: 'pending', label: 'En cours' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
