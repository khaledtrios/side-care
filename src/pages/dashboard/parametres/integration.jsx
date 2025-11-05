import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import IntegrationsPageView from 'src/sections/dashboard/parametres/integrations/views/integrations-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Paramétrages de mes intégrations | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <IntegrationsPageView />
    </>
  );
}
