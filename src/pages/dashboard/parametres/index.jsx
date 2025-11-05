import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SirhPageView from 'src/sections/dashboard/parametres/sirh/views/sirh-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Paramètres & Intégrations | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SirhPageView />
    </>
  );
}
