import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import PrimesTypesList from 'src/sections/dashboard/evp/primes/views/primes-types-list';

// ----------------------------------------------------------------------

const metadata = { title: `Paramétrage des primes de En création | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PrimesTypesList />
    </>
  );
}
