import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddPonctuelPage from 'src/sections/comptable/transport/views/transport-add-ponctuel-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter titre de transport ponctuel | Comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddPonctuelPage />
    </>
  );
}
