import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntreprisesAddDsn from 'src/sections/comptable/entreprises/views/entreprises-add-dsn';

const metadata = { title: `Fichiers DSN | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntreprisesAddDsn />
    </>
  );
}
