import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AccountPageView from 'src/sections/dashboard/account/views/account-page-view';

const metadata = { title: `Mon compte | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountPageView />
    </>
  );
}
