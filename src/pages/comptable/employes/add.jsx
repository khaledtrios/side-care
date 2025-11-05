import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsAddPage from 'src/sections/comptable/employes/views/effectifs-add-page';

const metadata = { title: `Ajouter un employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsAddPage />
    </>
  );
}
