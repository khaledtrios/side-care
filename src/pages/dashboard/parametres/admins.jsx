import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AdminsPageView from 'src/sections/dashboard/parametres/admins/views/admins-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Utilisateurs | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AdminsPageView />
    </>
  );
}
