import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import NotesFormView from '../notes-form-view';

export default function NotesEditPage({ note }) {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Modifier une note de frais"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Notes de frais', href: paths.comptable.notes.root },
          { name: 'Modifier' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <NotesFormView currentNote={note} />
    </ComptableContent>
  );
}
