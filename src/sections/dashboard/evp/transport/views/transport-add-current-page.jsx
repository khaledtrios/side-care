import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TransportFormCurrent from '../transport-form-current';

export default function TransportAddCurrentPage() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un titre de transport récurrent"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Titres de transport', href: paths.dashboard.evp.notes.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TransportFormCurrent />
    </DashboardContent>
  );
}
