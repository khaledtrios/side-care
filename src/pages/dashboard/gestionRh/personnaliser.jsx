import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntretienTypesPage from 'src/sections/dashboard/gestion-rh/entretien/view/entretien-types-page';

// ----------------------------------------------------------------------

const metadata = { title: `Paramétrage des entretiens | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EntretienTypesPage />
    </>
  );
}
