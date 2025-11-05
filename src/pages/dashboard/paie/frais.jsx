import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesListView from 'src/sections/dashboard/evp/notes/views/notes-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Notes de frais | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotesListView />
    </>
  );
}
