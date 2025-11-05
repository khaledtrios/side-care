import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsImportView from 'src/sections/dashboard/employes/effectifs/view/effectifs-import-view';

// ----------------------------------------------------------------------

const metadata = { title: `Importation des employés par fichier excel | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsImportView />
    </>
  );
}
