import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntretienPageView from 'src/sections/salaires/entretiens/views/entretien-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mes entretiens | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntretienPageView />
    </>
  );
}
