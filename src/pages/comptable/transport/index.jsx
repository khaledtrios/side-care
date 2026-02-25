import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportListView from 'src/sections/comptable/transport/views/transport-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Titres de transport | Comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportListView />
    </>
  );
}
