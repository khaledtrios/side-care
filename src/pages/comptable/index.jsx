import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ComptableDashboardView } from 'src/sections/comptable/dashbaord/view';

const metadata = { title: `Expert Comptable | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ComptableDashboardView />
    </>
  );
}
