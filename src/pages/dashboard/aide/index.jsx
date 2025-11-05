import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AidePageView from 'src/sections/dashboard/aide/views/aide-page-view';

const metadata = { title: `Aide et accompagnement | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AidePageView />
    </>
  );
}
