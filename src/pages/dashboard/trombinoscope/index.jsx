import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TrombinoscopeGridView from 'src/sections/dashboard/employes/trombinoscope/view/trombinoscope-grid-view';

// ----------------------------------------------------------------------

const metadata = { title: `Trombinoscope | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TrombinoscopeGridView />
    </>
  );
}
