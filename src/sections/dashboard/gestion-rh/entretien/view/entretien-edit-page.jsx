import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import EntretienAddEditForm from '../entretien-add-edit-form';

export default function EntretienEditPage({ entretien }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter Entretien"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Gestion RH', href: paths.dashboard.gestionRh.root },
          { name: 'Entretien', href: paths.dashboard.gestionRh.entretien.root },
          { name: entretien?.employe },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EntretienAddEditForm currentEntretien={entretien}/>
    </DashboardContent>
  );
}
