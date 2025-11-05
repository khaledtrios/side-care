import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AddEmployesForm from '../add-employes-form';

export default function EffectifsAddPage() {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Ajouter un employé"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Effectifs', href: paths.comptable.employes.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <AddEmployesForm />
    </ComptableContent>
  );
}
