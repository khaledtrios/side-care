import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import PrimesListView from 'src/sections/dashboard/evp/primes/views/primes-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Primes | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PrimesListView />
    </>
  );
}
