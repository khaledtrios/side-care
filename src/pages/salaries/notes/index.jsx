import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesListView from 'src/sections/salaires/notes/views/notes-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mes notes de frais | Dashboard - ${CONFIG.appName}` };

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
