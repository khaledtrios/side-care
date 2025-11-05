import React from 'react'

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function IntegrationsPageView() {
  return (
    <DashboardContent>
        <CustomBreadcrumbs
        heading="Paramétrages de mes intégrations"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Paramètres & Intégrations', href: paths.dashboard.parametres.root },
          { name: 'Paramétrages de mes intégrations' },
        ]}
        
        sx={{ mb: { xs: 3, md: 5 } }}
      />
    </DashboardContent>
  )
}
