import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import TemplatesPageView from 'src/sections/dashboard/gestion-rh/templates/view/templates-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modèles de documents | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TemplatesPageView />
    </>
  );
}
