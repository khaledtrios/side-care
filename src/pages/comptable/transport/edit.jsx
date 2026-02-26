import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportEditPage from 'src/sections/comptable/transport/views/transport-edit-page';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier titre de transport | Comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportEditPage />
    </>
  );
}
