import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TrombinoscopePageView from 'src/sections/salaires/entreprise/views/trombiniscope-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Trombinoscope | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TrombinoscopePageView />
    </>
  );
}
