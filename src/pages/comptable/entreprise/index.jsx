import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntreprisesListView from 'src/sections/comptable/entreprises/views/entreprises-list-view';

const metadata = { title: `Les entreprises | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntreprisesListView />
    </>
  );
}
