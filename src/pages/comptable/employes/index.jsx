import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EffectifsListView from 'src/sections/comptable/employes/views/effectifs-list-view';

const metadata = { title: `Les employés | Tableau de bord - ${CONFIG.appName}` };

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
