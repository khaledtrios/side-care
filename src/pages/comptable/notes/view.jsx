import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import NotesViewPage from 'src/sections/comptable/notes/views/notes-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Voir note de frais | Comptable - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams();

  // TODO: fetch note by id; for now reuse placeholder with id
  const note = {
    id: Number(id) || 1,
    employe: 'Employé 1',
    type: 'Déplacement',
    description: 'Hello World',
    date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    status: "En attente de justificatif",
    amount: 12.5,
    tva20: 10,
    tva10: 50,
    tva5: 80,
    tva2: 10,
    file: ''
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotesViewPage note={note} />
    </>
  );
}
