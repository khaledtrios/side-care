import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import EntretienEditPage from 'src/sections/dashboard/gestion-rh/entretien/view/entretien-edit-page';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Entretien | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {

  const { id } = useParams();

  console.log(id);

  const data = {
    entreprise: "Entreprise 1",
    employe: "Employé 1",
    type: "Entretien étape projet",
    date: today(),
    info: "Hello how are you ?"
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntretienEditPage entretien={data}/>
    </>
  );
}