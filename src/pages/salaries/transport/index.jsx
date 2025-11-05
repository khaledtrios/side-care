import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportViewPage from 'src/sections/salaires/transport/views/transport-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Mes titres de transport | Dashboard - ${CONFIG.appName}` };

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
