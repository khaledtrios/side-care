import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesAddPage from 'src/sections/dashboard/evp/notes/views/notes-add-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter notes de frais | Tableau de bord - ${CONFIG.appName}` };

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
