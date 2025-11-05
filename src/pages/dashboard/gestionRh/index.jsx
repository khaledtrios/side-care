import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { employes } from 'src/_mock/_tasks';

import DemarchePageView from 'src/sections/dashboard/gestion-rh/demarche/views/demarche-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Suivi des démarches RH | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  const employesList = employes
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DemarchePageView employes={employesList}/>
    </>
  );
}
