import React, { useState } from 'react'

import { Select, MenuItem } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard'

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function DocumentListView() {
    const [entreprise, setEntreprise] = useState("Entreprise 1")
  return (
    <DashboardContent>
        <CustomBreadcrumbs
        heading="Tous vos documents"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Comptabilité', href: paths.dashboard.comptabilite.root },
          { name: 'Liste' },
        ]}
        action={
            <Select value={entreprise} onChange={(e)=>setEntreprise(e.target.value)}>
            {["Entreprise 1", "Entreprise 2"].map(row => <MenuItem value={row}>{row}</MenuItem>)}
            </Select>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EmptyContent />
    </DashboardContent>
  )
}
