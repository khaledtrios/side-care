import React, { useState, useCallback } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Stack,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import { useSetState } from 'src/hooks/use-set-state';

import { ENTREPRISE, _employesList } from 'src/_mock/_employes';

import MoyenAge from './charts/moyen-age';
import ReparationCollege from './charts/reparation-college';
import TypeContractChart from './charts/type-contract-chart';
import NombreSalarieChart from './charts/nombre-salarie-chart';
import DepartArrivesChart from './charts/depart-arrives-chart';
import GenderReparationChart from './charts/gender-reparation-chart';

export default function StatistiquesView() {
  const [tableData, setTableData] = useState(_employesList);

  const filters = useSetState({ entreprise: 'Toutes mes entreprises' });

  const handleFilterEntreprise = useCallback(
    (event) => {
      const newValue = event.target.value;
      filters.setState({ entreprise: newValue });
    },
    [filters]
  );

  console.log('ENTREPRISE:', filters.state.entreprise);
  const dataFiltered = applyFilter({
    inputData: tableData,
    filters: filters.state,
  });

  const male = dataFiltered.filter((user) => user.gender === 'm');
  const female = dataFiltered.filter((user) => user.gender === 'f');
  console.log(male, female);

  return (
    <Grid container spacing={4}>
      <Grid xs={12}>
        <Card>
          <Stack sx={{ p: 2 }}>
            <FormControl sx={{ flexShrink: 0 }}>
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
                {ENTREPRISE.map((option) => (
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
          </Stack>
        </Card>
      </Grid>
      <Grid xs={12} lg={6}>
        <NombreSalarieChart />
      </Grid>
      <Grid xs={12} lg={6}>
        <DepartArrivesChart />
      </Grid>
      <Grid xs={12} lg={6}>
        <TypeContractChart />
      </Grid>
      <Grid xs={12} lg={6}>
        <GenderReparationChart options={{ male: male.length, female: female.length }} />
      </Grid>
      <Grid xs={12} lg={6}>
        <ReparationCollege />
      </Grid>
      <Grid xs={12} lg={6}>
        <MoyenAge />
      </Grid>
    </Grid>
  );
}

function applyFilter({ inputData, filters }) {
  const { entreprise } = filters;
  if (entreprise !== 'Toutes mes entreprises') {
    inputData = inputData.filter((user) => user.entreprise === entreprise);
  }

  return inputData;
}
