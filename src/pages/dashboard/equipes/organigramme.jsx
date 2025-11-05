import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EquipesOrganigramme from 'src/sections/dashboard/employes/equipes/views/equipes-organigramme';

// ----------------------------------------------------------------------

const metadata = { title: `Organigramme | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EquipesOrganigramme />
    </>
  );
}
