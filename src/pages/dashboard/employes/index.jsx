import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsListView from 'src/sections/dashboard/employes/effectifs/view/effectifs-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Effectifs | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsListView />
    </>
  );
}
