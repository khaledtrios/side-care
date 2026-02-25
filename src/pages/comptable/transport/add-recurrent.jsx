import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddRecurrentPage from 'src/sections/comptable/transport/views/transport-add-recurrent-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter titre de transport récurrent | Comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddRecurrentPage />
    </>
  );
}
