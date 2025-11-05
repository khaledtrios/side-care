import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CongeAddEditForm from '../conge-add-edit-form';

export default function AddCongePage() {
  return (
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Déclarer un congé / absence"
          links={[
            { name: 'Tableau du bord', href: paths.dashboard.root },
            { name: 'Congés et absences', href: paths.dashboard.conges.root },
            { name: 'Ajouter' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <CongeAddEditForm />
      </DashboardContent>
  );
}
