import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CabinetsPageView from 'src/sections/dashboard/parametres/cabinets/views/cabinets-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Cabinets experts-comptables | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CabinetsPageView />
    </>
  );
}
