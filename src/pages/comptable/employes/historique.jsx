import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

  import HistoriquePageView from 'src/sections/comptable/employes/views/historique-page-view';

const metadata = { title: `Les employés | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <HistoriquePageView />
    </>
  );
}
