import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddCurrentPage from 'src/sections/dashboard/evp/transport/views/transport-add-current-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter un titre de transport récurrent | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddCurrentPage />
    </>
  );
}
