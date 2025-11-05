import React from 'react'

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard'

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function ParametersListPage() {
  return (
    <DashboardContent>
        <CustomBreadcrumbs
        heading="Fiches de paramétrage DSN"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Fiches de paramétrage DSN', href: paths.dashboard.comptabilite.root },
          { name: 'Liste' },
        ]}
        
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmptyContent />
    </DashboardContent>
  )
}
