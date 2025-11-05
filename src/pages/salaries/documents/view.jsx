import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import DocumentViewPage from 'src/sections/salaires/documents/views/document-view-page';

// Sample document data (for demonstration)
const documents = [
  {
    id: 1,
    type: 'doc_pay_slip',
    name: 'Pay Slip January 2025',
    file: 'pay_slip_jan2025.pdf',
    date: '2025-01-15',
  },
  {
    id: 2,
    type: 'doc_pay_slip',
    name: 'Pay Slip February 2025',
    file: 'pay_slip_feb2025.pdf',
    date: '2025-02-15',
  },
  {
    id: 3,
    type: 'doc_employee_identity_card',
    name: 'National ID',
    file: 'national_id.pdf',
    date: '2024-12-10',
  },
  { id: 4, type: 'doc_not_defined', name: 'Miscellaneous Doc', file: 'misc_doc.pdf', date: '2025-03-01' },
];

// ----------------------------------------------------------------------
const metadata = { title: `Mes documents | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  // Simulate fetching document by ID from URL params
  const { id } = useParams();
  const document = documents.find((doc) => doc.id === parseInt(id, 10)) || null;

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DocumentViewPage document={document} />
    </>
  );
}