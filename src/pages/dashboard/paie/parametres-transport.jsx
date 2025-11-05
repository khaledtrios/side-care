import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportParameter from 'src/sections/dashboard/evp/transport/views/transport-parameter';

// ----------------------------------------------------------------------

const metadata = { title: `Politique de titres de transport | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportParameter />
    </>
  );
}
