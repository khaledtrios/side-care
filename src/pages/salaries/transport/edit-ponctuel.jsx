import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TransportAddPonctuel from 'src/sections/salaires/transport/views/transport-add-ponctuel';
import { today } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier un titre de transport ponctuel | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const row = {
        id: '123',
        date: today(),
        type: 'Transport personnel',
        amount_total: 100,
        amount: 80,
        prise: '2023-01-02',
        justificatif: 'https://example.com/justificatif.pdf',
    }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TransportAddPonctuel currentTransport={row} />
    </>
  );
}
