import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DemandeAmeliorationView from 'src/sections/dashboard/aide/views/demande-amelioration-view';

const metadata = { title: `Demande d'amélioration | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DemandeAmeliorationView />
    </>
  );
}
