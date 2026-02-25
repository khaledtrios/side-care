import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CongeAddEditForm from '../conge-add-edit-form';

export default function AddCongePage() {
  return (
      <ComptableContent>
        <CustomBreadcrumbs
          heading="Déclarer un congé / absence"
          links={[
            { name: 'Tableau du bord', href: paths.comptable.root },
            { name: 'Congés et absences', href: paths.comptable.conges.root },
            { name: 'Ajouter' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <CongeAddEditForm />
      </ComptableContent>
  );
}
