import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import NotesViewPage from 'src/sections/salaires/notes/views/notes-view-page';
import { today } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const metadata = { title: `Voir note de frais | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    const note = {
        id: 1,
        employe: 'Employé 1',
        type: 'Déplacement',
        description: 'Hello World',
        date: today(),
        created_at: today(),
        status: "En attente de justificatif",
        amount: 12.5,
        tva20: 10,
        tva10: 50,
        tva5: 80,
        tva2: 10,
        file: ""
      };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotesViewPage note={note}/>
    </>
  );
}
