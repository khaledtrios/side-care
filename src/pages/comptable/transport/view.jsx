import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportViewPage from 'src/sections/comptable/transport/views/transport-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Détails titre de transport | Comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportViewPage />
    </>
  );
}
