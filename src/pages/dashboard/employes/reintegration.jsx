import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsReintegration1 from 'src/sections/dashboard/employes/effectifs/view/effectifs-reintegration-1';

// ----------------------------------------------------------------------

const metadata = { title: `Réintégration d’un ancien employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsReintegration1 />
    </>
  );
}
