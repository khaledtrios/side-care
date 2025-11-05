import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddReccurent from 'src/sections/salaires/transport/views/transport-add-recurrent';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter un titre de transport récurrent | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddReccurent />
    </>
  );
}
