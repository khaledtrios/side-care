import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EditBankAccountView from 'src/sections/salaires/compte/views/edit-bank-account-page-view';

const metadata = { title: `Modifier compte bancaire | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <EditBankAccountView />
    </>
  );
}

