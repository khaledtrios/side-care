import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesListView from 'src/sections/comptable/notes/views/notes-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Notes de frais | Comptable - ${CONFIG.appName}` };

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
