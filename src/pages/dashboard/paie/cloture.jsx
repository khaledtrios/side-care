import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ClotureListView from 'src/sections/dashboard/evp/cloture/views/cloture-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Clôture | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ClotureListView />
    </>
  );
}
