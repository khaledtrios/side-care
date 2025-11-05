import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EquipesListView from 'src/sections/dashboard/employes/equipes/views/equipes-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Effectifs | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EquipesListView />
    </>
  );
}
