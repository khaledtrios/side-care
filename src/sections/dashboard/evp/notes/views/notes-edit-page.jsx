import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import NotesFormView from '../notes-form-view';

export default function NotesEditPage({ note }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier une note de frais"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Notes de frais', href: paths.dashboard.evp.notes.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <NotesFormView currentNote={note}/>
    </DashboardContent>
  );
}
