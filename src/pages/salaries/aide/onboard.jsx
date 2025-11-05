import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import StarterPageView from 'src/sections/salaires/aide/views/starter-page-view';


const metadata = { title: `Onboarding | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StarterPageView />
    </>
  );
}
