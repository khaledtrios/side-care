import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ParrainagePageView from 'src/sections/dashboard/aide/views/parrainage-page-view';

const metadata = { title: `Parrainage | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ParrainagePageView />
    </>
  );
}
