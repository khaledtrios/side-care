import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { CONFIG } from 'src/config-global';

import EffectifsReintegration2 from 'src/sections/dashboard/employes/effectifs/view/effectifs-reintegration-2';

// ----------------------------------------------------------------------

const metadata = { title: `Réintégration d’un ancien employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {

    const { id } = useParams();

    const exampleEmployee = {
  id: 'emp001',
  gender: 'f',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  entreprise: 'Option 1',
  type: 'CDI',
  college: 'Option 3',
  enterDate: '2024-01-15',
  manager: 'Option 2',
  matricule: 'MAT123456',
};


  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EffectifsReintegration2 employe={exampleEmployee}/>
    </>
  );
}
