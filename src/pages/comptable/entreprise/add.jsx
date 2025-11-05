import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EntreprisesAddView from 'src/sections/comptable/entreprises/views/entreprises-add-view';

const metadata = { title: `Ajouter une entreprise | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EntreprisesAddView />
    </>
  );
}
