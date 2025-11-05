import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsLinkView from 'src/sections/dashboard/employes/effectifs/view/effectifs-link-view';

// ----------------------------------------------------------------------

const metadata = {
  title: `Génération d'un lien d'invitation | Tableau de bord - ${CONFIG.appName}`,
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsLinkView />
    </>
  );
}
