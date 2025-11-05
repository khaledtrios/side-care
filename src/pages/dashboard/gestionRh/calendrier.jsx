import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CalendarView } from 'src/sections/dashboard/gestion-rh/calendrier/views';

// ----------------------------------------------------------------------

const metadata = { title: `Calendrier des événements | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CalendarView />
    </>
  );
}
