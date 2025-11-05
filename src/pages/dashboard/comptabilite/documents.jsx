import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DocumentListView from 'src/sections/dashboard/comptabilite/documents/views/document-list-view';

const metadata = { title: `Tous vos documents | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DocumentListView />
    </>
  );
}
