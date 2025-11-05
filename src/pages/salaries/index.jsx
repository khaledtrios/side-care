import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SalariesDashboardView from 'src/sections/salaires/dashboard/views/salaries-dashboard-view';

// ----------------------------------------------------------------------

const metadata = { title: `Espace Salariés | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SalariesDashboardView />
    </>
  );
}
