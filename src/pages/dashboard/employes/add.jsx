import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsAddView from 'src/sections/dashboard/employes/effectifs/view/effectifs-add-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter un employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EffectifsAddView />
    </>
  );
}
