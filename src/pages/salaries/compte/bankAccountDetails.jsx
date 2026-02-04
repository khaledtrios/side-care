import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CompteBancaireDetails from 'src/sections/salaires/compte/views/bank-account-details';

const metadata = { title: `Details compte bancaire | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CompteBancaireDetails />
    </>
  );
}
