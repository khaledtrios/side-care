import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TransportFormRecurrent from '../transport-form-recurrent';

export default function TransportEditPage() {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Modifier un titre de transport"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Titres de transport', href: paths.comptable.transport.root },
          { name: 'Modifier' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TransportFormRecurrent isEdit />
    </ComptableContent>
  );
}
