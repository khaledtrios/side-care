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

const Employes = lazy(() => import('src/pages/comptable/employes/index'));
// const EmployesMutuelles = lazy(() => import('src/pages/comptable/employes/mutuelles'));
// const EmployesPrevoyance = lazy(() => import('src/pages/comptable/employes/prevoyance'));
const EmployesHistorique = lazy(() => import('src/pages/comptable/employes/historique'));
const EmployesView = lazy(() => import('src/pages/comptable/employes/view'));
const EmployesAdd = lazy(() => import('src/pages/comptable/employes/add'));


const Entreprise = lazy(() => import('src/pages/comptable/entreprise/index')); // DONE

const GestContract = lazy(() => import('src/pages/comptable/gest-contract/index'));
// OptContract removed
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
