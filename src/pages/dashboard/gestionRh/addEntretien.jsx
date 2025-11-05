import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntretienAddPage from 'src/sections/dashboard/gestion-rh/entretien/view/entretien-add-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter Entretien | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntretienAddPage />
    </>
  );
}
