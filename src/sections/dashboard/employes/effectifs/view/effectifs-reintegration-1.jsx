import React from 'react';

import {
  Card,
  Stack,
  Select,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function EffectifsReintegration1() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Réintégration d’un ancien employé"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Réintégration' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Stack spacing={{ xs: 3, md: 5 }} >
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 280 } }}>
              <InputLabel htmlFor="product-filter-stock-select-label">Employé concerné</InputLabel>

              <Select input={<OutlinedInput label="Employé concerné" />} label="Employé concerné">
                {['Jane Doe'].map((emp) => (
                  <MenuItem value={emp}>{emp}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Card>
        <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
          <Button type="submit" variant="contained" size="large" LinkComponent={RouterLink} href={paths.dashboard.employes.reintegrer2(1)}>
            Suivant
          </Button>
        </Stack>
      </Stack>
    </DashboardContent>
  );
}
