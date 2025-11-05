import React from 'react'

import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import EntrepriseForm from '../entreprise-form'

export default function EntrepriseEditView({ data }) {
  return (
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Modifier entreprise"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Entreprise', href: paths.dashboard.entreprise },
            { name: 'Modifier' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <EntrepriseForm currentData={data}/>
      </DashboardContent>
  )
}
