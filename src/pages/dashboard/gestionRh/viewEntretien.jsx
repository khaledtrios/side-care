import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import EntretienViewPage from 'src/sections/dashboard/gestion-rh/entretien/view/entretien-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Voir Entretien | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams();

  const data = {
    id,
    entreprise: 'Entreprise 1',
    employe: 'Employé 1',
    type: 'Entretien étape projet',
    date: today(),
    info: 'Des informations,',
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntretienViewPage entretien={data} />
    </>
  );
}
