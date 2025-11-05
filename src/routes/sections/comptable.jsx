import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { ComptableLayout } from 'src/layouts/comptable';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';


const IndexPage = lazy(() => import('src/pages/comptable/index'));

const Aide = lazy(() => import('src/pages/comptable/aide/index'));
const Cabinets = lazy(() => import('src/pages/comptable/cabinets/index'));
const Commissions = lazy(() => import('src/pages/comptable/commission/index'));
const Compte = lazy(() => import('src/pages/comptable/compte/index'));
const Cotisation = lazy(() => import('src/pages/comptable/cotisation/index'));
const Devis = lazy(() => import('src/pages/comptable/devis/index'));

const Employes = lazy(() => import('src/pages/comptable/employes/index'));
const EmployesMutuelles = lazy(() => import('src/pages/comptable/employes/mutuelles'));
const EmployesPrevoyance = lazy(() => import('src/pages/comptable/employes/prevoyance'));
const EmployesHistorique = lazy(() => import('src/pages/comptable/employes/historique'));
const EmployesView = lazy(() => import('src/pages/comptable/employes/view'));
const EmployesAdd = lazy(() => import('src/pages/comptable/employes/add'));


const Entreprise = lazy(() => import('src/pages/comptable/entreprise/index')); // DONE
const EntrepriseAdd = lazy(() => import('src/pages/comptable/entreprise/add')); // DONE
const EntrepriseDsn = lazy(() => import('src/pages/comptable/entreprise/dsn'));  // DONE

const GestContract = lazy(() => import('src/pages/comptable/gest-contract/index'));
const OptContract = lazy(() => import('src/pages/comptable/opt-contract/index'));
const Paie = lazy(() => import('src/pages/comptable/paie/index'));

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
        path: 'cotisation',
        children: [
          { index: true, element: <Cotisation /> },
        ]
      },
      {
        path: 'devis',
        children: [
          { index: true, element: <Devis /> },
        ]
      },
      {
        path: 'employes',
        children: [
          { index: true, element: <Employes /> },
          { path: 'mutuelles', element: <EmployesMutuelles /> },
          { path: 'prevoyance', element: <EmployesPrevoyance /> },
          { path: 'historique', element: <EmployesHistorique /> },
          { path: ':id/view', element: <EmployesView /> },
          { path: 'add', element: <EmployesAdd /> },
        ]
      },
      {
        path: 'entreprise',
        children: [
          { index: true, element: <Entreprise /> },
          { path: 'add', element: <EntrepriseAdd /> },
          { path: 'dsn', element: <EntrepriseDsn /> }
        ]
      },
      {
        path: 'gest-contract',
        children: [
          { index: true, element: <GestContract /> },
        ]
      },
      {
        path: 'opt-contract',
        children: [
          { index: true, element: <OptContract /> },
        ]
      },
      {
        path: 'paie',
        children: [
          { index: true, element: <Paie /> },
        ]
      },
      {
        path: 'compte',
        children: [
          { index: true, element: <Compte /> },
        ]
      },
      {
        path: 'commissions',
        children: [
          { index: true, element: <Commissions /> },
        ]
      },
    ],
  },
];
