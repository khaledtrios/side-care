import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useParams } from 'src/routes/hooks';
import EntrepriseDisplayView from 'src/sections/dashboard/employes/entreprises/views/entreprise-display-view';

// ----------------------------------------------------------------------

const metadata = { title: `Société | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const { id = '' } = useParams();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EntrepriseDisplayView id={id}/>
    </>
  );
}
