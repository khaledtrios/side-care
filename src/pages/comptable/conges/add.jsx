import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AddCongePage from 'src/sections/comptable/conges/view/add-conge-page';

const metadata = { title: `Ajouter un congé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddCongePage />
    </>
  );
}
