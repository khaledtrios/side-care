import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DevisViewList from 'src/sections/comptable/devis/view/devis-view-list';

const metadata = { title: `Devis | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DevisViewList />
    </>
  );
}
