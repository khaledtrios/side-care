import { Helmet } from 'react-helmet-async';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import NotesEditPage from 'src/sections/dashboard/evp/notes/views/notes-edit-page';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier notes de frais | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  const note = {
    id: 1,
    employe: 'Employé 1',
    type: 'Déplacement',
    description: 'Hello World',
    date: today(),
    amount: 12.5,
    tva20: 10,
    tva10: 50,
    tva5: 80,
    tva2: 10,
  };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotesEditPage note={note} />
    </>
  );
}
