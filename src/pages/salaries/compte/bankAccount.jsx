import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AjouterCompteBancaire from 'src/sections/salaires/compte/views/add-bank-account-page-view';

const metadata = { title: `Ajouter compte bancaire | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AjouterCompteBancaire />
    </>
  );
}
