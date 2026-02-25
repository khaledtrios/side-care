import React from 'react';

import { paths } from 'src/routes/paths';

import { ComptableContent } from 'src/layouts/comptable';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import TransportFormPonctuel from '../transport-form-ponctuel';

export default function TransportAddPonctuelPage() {
  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading="Ajouter un titre de transport ponctuel"
        links={[
          { name: 'Tableau de bord', href: paths.comptable.root },
          { name: 'Titres de transport', href: paths.comptable.transport.root },
          { name: 'Ajouter ponctuel' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TransportFormPonctuel />
    </ComptableContent>
  );
}
