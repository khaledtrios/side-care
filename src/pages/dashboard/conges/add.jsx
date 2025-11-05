import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AddCongePage from 'src/sections/dashboard/conges/view/add-conge-page';

// ----------------------------------------------------------------------

const metadata = { title: `Congés et absences | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AddCongePage />
    </>
  );
}
