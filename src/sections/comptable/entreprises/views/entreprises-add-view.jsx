import React from 'react';

import { Stack, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
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
      {/* <Stack direction="row" spacing={2}>
        <Button
          LinkComponent={RouterLink}
          href={paths.comptable.entreprise.root}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          variant="outlined"        >
          Retour
        </Button>
      </Stack> */}
    </DashboardContent>
  );
}
