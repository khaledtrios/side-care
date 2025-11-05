import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CongesPageView from 'src/sections/salaires/conges/views/conges-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mes congés & absences | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CongesPageView />
    </>
  );
}
