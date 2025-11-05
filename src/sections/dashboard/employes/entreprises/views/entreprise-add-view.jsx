import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import EntrepriseForm from '../entreprise-form';

export default function EntrepriseAddView() {
  


  return (
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Ajouter entreprise"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Entreprise', href: paths.dashboard.entreprise },
            { name: 'Ajouter' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <EntrepriseForm />
      </DashboardContent>
  );
}
