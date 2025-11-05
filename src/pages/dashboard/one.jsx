import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DashboardPagView from 'src/sections/dashboard/dashboard/view/dashboard-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Espace Entreprise | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardPagView />
    </>
  );
}
