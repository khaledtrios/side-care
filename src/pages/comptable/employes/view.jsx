import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import EffectifsDetailsView from 'src/sections/comptable/employes/views/effectifs-details-view';

const metadata = { title: `Détails d'employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams();

  const data = {
    id,
    name: 'Alice Dupont',
    type: 'CDI',
    college: 'Cadre',
    contract_start: today(),
    contract_end: today(),
    entreprise: 'Entreprise 1',
    actif: 'actual',
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
        
      <EffectifsDetailsView employe={data}/>
    </>
  );
}
