import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import OrganigrammePageView from 'src/sections/salaires/entreprise/views/organigramme-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Organigramme | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OrganigrammePageView />
    </>
  );
}
