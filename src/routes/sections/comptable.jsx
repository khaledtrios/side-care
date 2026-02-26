import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { ComptableLayout } from 'src/layouts/comptable';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';


const IndexPage = lazy(() => import('src/pages/comptable/index'));

const Aide = lazy(() => import('src/pages/comptable/aide/index'));
const Cabinets = lazy(() => import('src/pages/comptable/cabinets/index'));
// Commissions removed
const Compte = lazy(() => import('src/pages/comptable/compte/index'));
// Cotisation removed
// Devis removed

const Conges = lazy(() => import('src/pages/comptable/conges/index'));
const CongesAdd = lazy(() => import('src/pages/comptable/conges/add'));

const Employes = lazy(() => import('src/pages/comptable/employes/index'));
// const EmployesMutuelles = lazy(() => import('src/pages/comptable/employes/mutuelles'));
// const EmployesPrevoyance = lazy(() => import('src/pages/comptable/employes/prevoyance'));
const EmployesHistorique = lazy(() => import('src/pages/comptable/employes/historique'));
const EmployesView = lazy(() => import('src/pages/comptable/employes/view'));
const EmployesAdd = lazy(() => import('src/pages/comptable/employes/add'));


const Entreprise = lazy(() => import('src/pages/comptable/entreprise/index'));
const EntreprisesAdd = lazy(() => import('src/pages/comptable/entreprise/add'));

const GestContract = lazy(() => import('src/pages/comptable/gest-contract/index'));
// OptContract removed
// Paie pages were not created; reuse comptable notes pages instead
const Paie = lazy(() => import('src/pages/comptable/notes/index'));
const PaieAdd = lazy(() => import('src/pages/comptable/notes/add'));
const PaieView = lazy(() => import('src/pages/comptable/notes/view'));
const Notes = lazy(() => import('src/pages/comptable/notes/index'));
const NotesAdd = lazy(() => import('src/pages/comptable/notes/add'));
const NotesView = lazy(() => import('src/pages/comptable/notes/view'));
const NotesEdit = lazy(() => import('src/pages/comptable/notes/edit'));

const Transport = lazy(() => import('src/pages/comptable/transport/index'));
const TransportAddRecurrent = lazy(() => import('src/pages/comptable/transport/add-recurrent'));
const TransportAddPonctuel = lazy(() => import('src/pages/comptable/transport/add-ponctuel'));
const TransportParametres = lazy(() => import('src/pages/comptable/transport/parametres'));
const TransportEdit = lazy(() => import('src/pages/comptable/transport/edit'));
const TransportView = lazy(() => import('src/pages/comptable/transport/view'));

const Cloture = lazy(() => import('src/pages/comptable/cloture/index'));

const Primes = lazy(() => import('src/pages/comptable/primes/index'));
const PrimesSettings = lazy(() => import('src/pages/comptable/primes/settings'));

const layoutContent = (
  <ComptableLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </ComptableLayout>
);

export const comptableRoutes = [
  {
    path: '/espace-partenaire',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'aide',
        children: [
          { index: true, element: <Aide /> },
        ]
      },
      {
        path: 'cabinets',
        children: [
          { index: true, element: <Cabinets /> },
        ]
      },
      {
        path: 'conges',
        children: [
          { index: true, element: <Conges /> },
          { path: 'new', element: <CongesAdd /> },
        ]
      },
      // Cotisation removed
      // Devis removed
      {
        path: 'employes',
        children: [
          { index: true, element: <Employes /> },
          // { path: 'mutuelles', element: <EmployesMutuelles /> },
          // { path: 'prevoyance', element: <EmployesPrevoyance /> },
          { path: 'historique', element: <EmployesHistorique /> },
          { path: ':id/view', element: <EmployesView /> },
          { path: 'add', element: <EmployesAdd /> },
        ]
      },
      {
        path: 'entreprise',
        children: [
          { index: true, element: <Entreprise /> },
          { path: 'add', element: <EntreprisesAdd /> },

        ]
      },
      {
        path: 'gest-contract',
        children: [
          { index: true, element: <GestContract /> },
        ]
      },
      // OptContract removed
      {
        path: 'paie',
        children: [
          { index: true, element: <Paie /> },
          { path: 'add', element: <PaieAdd /> },
          { path: ':id', element: <PaieView /> },
        ]
      },
      {
        path: 'notes',
        children: [
          { index: true, element: <Notes /> },
          { path: 'add', element: <NotesAdd /> },
          { path: ':id/edit', element: <NotesEdit /> },
          { path: ':id', element: <NotesView /> },
        ]
      },
      {
        path: 'transport',
        children: [
          { index: true, element: <Transport /> },
          { path: 'new-recurrent', element: <TransportAddRecurrent /> },
          { path: 'new-ponctuel', element: <TransportAddPonctuel /> },
          { path: 'parametres', element: <TransportParametres /> },
          { path: ':id', element: <TransportView /> },
          { path: ':id/edit', element: <TransportEdit /> },
        ]
      },
      {
        path: 'cloture',
        children: [
          { index: true, element: <Cloture /> },
        ]
      },
      {
        path: 'primes',
        children: [
          { index: true, element: <Primes /> },
          { path: 'settings', element: <PrimesSettings /> },
        ]
      },
      {
        path: 'compte',
        children: [
          { index: true, element: <Compte /> },
        ]
      },
      // Commissions removed
    ],
  },
];
