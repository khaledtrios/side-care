import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import BanksPageView from 'src/sections/dashboard/parametres/banks/views/banks-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Comptes bancaires | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <BanksPageView />
    </>
  );
}
