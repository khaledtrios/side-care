import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import NotesFormView from 'src/sections/dashboard/evp/notes/notes-form-view';

export default function NotesAddPage() {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Ajouter une note de frais"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Notes de frais', href: paths.comptable.notes.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <NotesFormView />
    </ComptableContent>
  );
}
