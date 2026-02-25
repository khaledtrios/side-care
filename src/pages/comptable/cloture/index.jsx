import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ClotureListView from 'src/sections/comptable/cloture/views/cloture-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Clôture de paie | Comptable - ${CONFIG.appName}` };

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
