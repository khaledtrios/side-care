import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddPonctuel from 'src/sections/salaires/transport/views/transport-add-ponctuel';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter un titre de transport ponctuel | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddPonctuel />
    </>
  );
}
