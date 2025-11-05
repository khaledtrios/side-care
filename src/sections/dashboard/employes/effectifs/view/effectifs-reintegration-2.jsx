import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AddEmployesForm from '../add-employes-form';

export default function EffectifsReintegration2({ employe }) {
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

      <AddEmployesForm currentEmploye={employe} />
    </DashboardContent>
  );
}
