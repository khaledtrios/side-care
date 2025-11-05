import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import EquipesDetailsView from 'src/sections/dashboard/employes/equipes/views/equipes-details-view';
import { today } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const metadata = {
  title: `Les employés présents dans l'équipe | Tableau de bord - ${CONFIG.appName}`,
};

export default function Page() {
  const { id } = useParams();

  const team = {
    id,
    name: 'PO',
    entreprise: 'Portorium Consulting',
    employes: [
      {
        id: 0,
        name: 'AEA Farid',
        entreprise: 'Portorium Consulting',
        manager: 'Jon Doe',
        contract: {
          startDate: today(),
          endDate: today(),
        },
      },
      {
        id: 1,
        name: 'Jane Doe',
        entreprise: 'Portorium Consulting',
        manager: 'Jon Doe',
        contract: {
          startDate: today(),
          endDate: null,
        },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EquipesDetailsView team={team}/>
    </>
  );
}
