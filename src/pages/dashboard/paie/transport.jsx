import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportListView from 'src/sections/dashboard/evp/transport/views/transport-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Titres de transport | Tableau de bord - ${CONFIG.appName}` };

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
