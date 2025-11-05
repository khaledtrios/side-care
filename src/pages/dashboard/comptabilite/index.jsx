import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ParametersListPage from 'src/sections/dashboard/comptabilite/parametres/views/parameters-list-page';


const metadata = { title: `Fiches de paramétrage DSN | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ParametersListPage />
    </>
  );
}
