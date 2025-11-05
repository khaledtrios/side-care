import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DocumentsPageView from 'src/sections/salaires/documents/views/documents-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Mes documents | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DocumentsPageView />
    </>
  );
}
