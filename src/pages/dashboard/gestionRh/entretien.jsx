import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntretienListView from 'src/sections/dashboard/gestion-rh/entretien/view/entretien-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Entretiens | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntretienListView />
    </>
  );
}
