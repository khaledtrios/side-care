import React from 'react';

import { Card, CardHeader } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function SirhPageView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modules SIRH"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Paramètres & Intégrations', href: paths.dashboard.parametres.root },
          { name: 'Modules SIRH' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <CardHeader title="Bienvenue sur SideCare !" subheader="Sélectionnez les modules que vous souhaitez activer puis créez votre premier collaborateur.
 
"/>
      </Card>
    </DashboardContent>
  );
}
