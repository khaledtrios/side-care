import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EmployeViewPage from 'src/sections/dashboard/employes/employe/view/employe-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Employé | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EmployeViewPage />
    </>
  );
}
