import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { SalariesLayout } from 'src/layouts/salarie';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/salaries/index'));
const Conges = lazy(() => import('src/pages/salaries/conges/index'));

const Transport = lazy(() => import('src/pages/salaries/transport/index'));
const AddPonctuel = lazy(() => import('src/pages/salaries/transport/ponctuel'));
const AddRecurrent = lazy(() => import('src/pages/salaries/transport/recurrent'));
const EditRecurrent = lazy(() => import('src/pages/salaries/transport/edit-recurrent'));
const EditPonctuel = lazy(() => import('src/pages/salaries/transport/edit-ponctuel'));

const Notes = lazy(() => import('src/pages/salaries/notes/index'));
const AddNotes = lazy(() => import('src/pages/salaries/notes/add'));
const EditNotes = lazy(() => import('src/pages/salaries/notes/edit'));
const ViewNotes = lazy(() => import('src/pages/salaries/notes/view'));

const Entretiens = lazy(() => import('src/pages/salaries/entretiens/index'));

const Documents = lazy(() => import('src/pages/salaries/documents/index'));
const ViewDocuments = lazy(() => import('src/pages/salaries/documents/view'));

const Trombinoscope = lazy(() => import('src/pages/salaries/entreprise/index'));
const Organigramme = lazy(() => import('src/pages/salaries/entreprise/organigramme'));

const Account = lazy(() => import('src/pages/salaries/compte/index'));

const Aide = lazy(() => import('src/pages/salaries/aide/index'));
const Onboarding = lazy(() => import('src/pages/salaries/aide/onboard'));
const Amelioration = lazy(() => import('src/pages/salaries/aide/demande'));
const Parrainage = lazy(() => import('src/pages/salaries/aide/parrainage'));
const Urssaf = lazy(() => import('src/pages/salaries/aide/urssaf'));



// ----------------------------------------------------------------------

const layoutContent = (
  <SalariesLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </SalariesLayout>
);

export const salariesRoutes = [
  {
    path: 'espace-salaries',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'conges',
        children: [{ index: true, element: <Conges /> }],
      },
      {
        path: 'transport',
        children: [
          { index: true, element: <Transport /> },
          { path: 'add-ponctuel', element: <AddPonctuel /> },
          { path: 'add-recurrent', element: <AddRecurrent /> },
          { path: ':id/edit-recurrent', element: <EditRecurrent /> },
          { path: ':id/edit-ponctuel', element: <EditPonctuel /> },
        ],
      },
      {
        path: 'notes',
        children: [
          { index: true, element: <Notes /> },
          { path: 'add', element: <AddNotes /> },
          { path: ':id/edit', element: <EditNotes /> },
          { path: ':id/view', element: <ViewNotes /> },
        ],
      },
      {
        path: 'entretiens',
        children: [
          { index: true, element: <Entretiens /> },
        ],
      },
      {
        path: 'documents',
        children: [
          { index: true, element: <Documents /> },
          { path: ":id/view", element: <ViewDocuments />}
        ],
      },
      {
        path: 'entreprise',
        children: [
          { index: true, element: <Trombinoscope /> },
          { path: 'organigramme', element: <Organigramme /> },
        ],
      },
      {
        path: 'mon-compte',
        children: [
          { index: true, element: <Account /> },
        ],
      },
      {
        path: 'aide',
        children: [
          { index: true, element: <Aide /> },
          { path: 'onboarding', element: <Onboarding /> },
          { path: 'amelioration', element: <Amelioration /> },
          { path: 'parrainage', element: <Parrainage /> },
          { path: 'urssaf', element: <Urssaf /> },
        ],
      },
    ],
  },
];
