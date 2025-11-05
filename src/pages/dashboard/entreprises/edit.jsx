import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntrepriseEditView from 'src/sections/dashboard/employes/entreprises/views/entreprise-edit-view';

// import EntrepriseEditView from 'src/sections/dashboard/employes/entreprises/views/entreprise-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Entreprise | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const currentData = {
  isCreated: '1',
  id: 'ENT12345',
  formeJuridique: 'SARL',
  raison: 'Tech Innovators S.A.',
  createdAt: '2024-05-01',
  matriculeFiscale: 'MF123456789',
  siren: '789456123',
  cnss: 'CNSS001122',
  adresse: '123 Rue de l’Innovation, Tunis',
  zipCode: '1002',
  country: 'Tunisie',
  activity: 'Développement logiciel',
  convention: 'Convention Collective Syntec',
  sales: '1M€',
  logo: 'https://example.com/logo.png',
  employes: {
    employesNumber: 85,
    avgAge: 32,
    manageres: 10,
    avgAgeManagers: 40,
    nonManagers: 75,
    avgAgeNonManagers: 30,
  },
  masseSalaireA: 850000,
  masseSalaireB: 320000,
};

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EntrepriseEditView data={currentData}/>
    </>
  );
}
