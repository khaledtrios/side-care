import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesAddPage from 'src/sections/salaires/notes/views/notes-add-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter note de frais | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotesAddPage />
    </>
  );
}
