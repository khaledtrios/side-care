import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AddEmployesForm from '../add-employes-form';

export default function EffectifsAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajout d'un nouvel employé"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AddEmployesForm />
    </DashboardContent>
  );
}
