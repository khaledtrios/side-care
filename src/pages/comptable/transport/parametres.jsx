import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportParameter from 'src/sections/comptable/transport/views/transport-parameter';

// ----------------------------------------------------------------------

const metadata = { title: `Paramètres titres de transport | Comptable - ${CONFIG.appName}` };

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
