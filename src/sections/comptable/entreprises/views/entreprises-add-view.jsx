import React from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AddEntrepriseExisted from '../add-entreprise-existed';
import AddEntrepriseNotExisted from '../add-entreprise-not-existed';

export default function EntreprisesAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter une entreprise"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Entreprises', href: paths.comptable.entreprise.root },
          { name: 'Ajouter une entreprise' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <AddEntrepriseExisted />
        </Grid>
        <Grid xs={12} md={6}>
          <AddEntrepriseNotExisted />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
