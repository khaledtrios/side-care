import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import UrssafPageView from 'src/sections/salaires/aide/views/urssaf-page-view';

const metadata = { title: `URSSAF | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UrssafPageView />
    </>
  );
}
