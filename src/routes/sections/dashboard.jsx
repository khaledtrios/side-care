import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

const Effectif = lazy(() => import('src/pages/dashboard/employes/index'));
const ViewEffectif = lazy(() => import('src/pages/dashboard/employes/view'));
const AddEffectif = lazy(() => import('src/pages/dashboard/employes/add'));
const Reintegration = lazy(() => import('src/pages/dashboard/employes/reintegration'));
const Reintegration2 = lazy(() => import('src/pages/dashboard/employes/reintegration-2'));
const LinkGen = lazy(() => import('src/pages/dashboard/employes/link'));
const Import = lazy(() => import('src/pages/dashboard/employes/import'));

const Equipes = lazy(() => import('src/pages/dashboard/equipes/index'));
const DetailsEquipes = lazy(() => import('src/pages/dashboard/equipes/details'));
const Trombinoscope = lazy(() => import('src/pages/dashboard/trombinoscope/index'));
const Organigramme = lazy(() => import('src/pages/dashboard/equipes/organigramme'));

const DemarcheRh = lazy(() => import('src/pages/dashboard/gestionRh/index'));
const Calendrier = lazy(() => import('src/pages/dashboard/gestionRh/calendrier'));
const Entretien = lazy(() => import('src/pages/dashboard/gestionRh/entretien'));
const AddEntretien = lazy(() => import('src/pages/dashboard/gestionRh/addEntretien'));
const EditEntretien = lazy(() => import('src/pages/dashboard/gestionRh/editEntretien'));
const ViewEntretien = lazy(() => import('src/pages/dashboard/gestionRh/viewEntretien'));
const Personnaliser = lazy(() => import('src/pages/dashboard/gestionRh/personnaliser'));
const Templates = lazy(() => import('src/pages/dashboard/gestionRh/template'));

const Primes = lazy(() => import('src/pages/dashboard/paie/primes'));
const PrimesSettings = lazy(() => import('src/pages/dashboard/paie/settings-primes'));
const Frais = lazy(() => import('src/pages/dashboard/paie/frais'));
const AddFrais = lazy(() => import('src/pages/dashboard/paie/add-frais'));
const EditFrais = lazy(() => import('src/pages/dashboard/paie/edit-frais'));
const ViewFrais = lazy(() => import('src/pages/dashboard/paie/view-frais'));
const Cloture = lazy(() => import('src/pages/dashboard/paie/cloture'));
const Transport = lazy(() => import('src/pages/dashboard/paie/transport'));
const AddTransportCurrent = lazy(() => import('src/pages/dashboard/paie/add-transport-current'));
const AddTransportPonctuel = lazy(() => import('src/pages/dashboard/paie/add-transport-ponctuel'));
const ParametresTransport = lazy(() => import('src/pages/dashboard/paie/parametres-transport'));

const Comptabilite = lazy(() => import('src/pages/dashboard/comptabilite/index'));
const ComptabiliteDocuments = lazy(() => import('src/pages/dashboard/comptabilite/documents'));

const Entreprises = lazy(() => import('src/pages/dashboard/entreprises/entreprises'));
const AddEntreprise = lazy(() => import('src/pages/dashboard/entreprises/add'));
const EditEntreprise = lazy(() => import('src/pages/dashboard/entreprises/edit'));
const ViewEntreprise = lazy(() => import('src/pages/dashboard/entreprises/view'));
const SuccessAddEntreprise = lazy(
  () => import('src/pages/dashboard/entreprises/successEntreprise')
);

const AddConges = lazy(() => import('src/pages/dashboard/conges/add'));
const Conges = lazy(() => import('src/pages/dashboard/conges/index'));

const Integrations = lazy(() => import('src/pages/dashboard/parametres/index'));
const Admins = lazy(() => import('src/pages/dashboard/parametres/admins'));
const Banks = lazy(() => import('src/pages/dashboard/parametres/banks'));
const Cabinets = lazy(() => import('src/pages/dashboard/parametres/cabinets'));
const EntreprisesInetg = lazy(() => import('src/pages/dashboard/parametres/entreprises'));
const Parameter = lazy(() => import('src/pages/dashboard/parametres/integration'));

const Account = lazy(() => import('src/pages/dashboard/account/index'));

const Aide = lazy(() => import('src/pages/dashboard/aide/index'));
const Onboarding = lazy(() => import('src/pages/dashboard/aide/onboard'));
const Amelioration = lazy(() => import('src/pages/dashboard/aide/demande'));
const Parrainage = lazy(() => import('src/pages/dashboard/aide/parrainage'));
const Urssaf = lazy(() => import('src/pages/dashboard/aide/urssaf'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'salaries',
        children: [
          { element: <Effectif />, index: true },
          { element: <ViewEffectif />, path: ':id/view' },
          { element: <AddEffectif />, path: 'add' },
          { element: <Reintegration />, path: 'reintegrer-1' },
          { element: <Reintegration2 />, path: 'reintegrer-2/:id' },
          { element: <LinkGen />, path: 'invitation_link' },
          { element: <Import />, path: 'importation' },
        ],
      },
      {
        path: 'equipes',
        children: [
          { element: <Equipes />, index: true },
          { element: <DetailsEquipes />, path: ':id/view' },
          { element: <Organigramme />, path: 'organigramme' },
          { element: <Trombinoscope />, path: 'trombinoscope' },
        ],
      },
      {
        path: 'vos-entreprises',
        children: [
          { element: <Entreprises />, index: true },
          { element: <AddEntreprise />, path: 'add' },
          { element: <EditEntreprise />, path: ':id/edit' },
          { element: <ViewEntreprise />, path: ':id/view' },
          { element: <SuccessAddEntreprise />, path: 'add/success' },
        ],
      },
      {
        path: 'gestion-rh',
        children: [
          { element: <DemarcheRh />, index: true },
          { element: <Calendrier />, path: 'calendrier' },
          { element: <Entretien />, path: 'entretien' },
          {
            path: 'entretien',
            children: [
              {
                element: <Entretien />,
                index: true,
              },
              { element: <AddEntretien />, path: 'add' },
              { element: <EditEntretien />, path: ':id/edit' },
              { element: <ViewEntretien />, path: ':id' },
              { element: <Personnaliser />, path: ':id/types' },
            ],
          },
          { element: <Templates />, path: 'templates' },
        ],
      },
      {
        path: 'conges-et-absences',
        children: [
          { index: true, element: <Conges /> },
          { path: 'new', element: <AddConges /> },
        ],
      },
      {
        path: 'evp',
        children: [
          {
            // index: true,
            path: "primes",
            children: [
              {
                index: true,
                element: <Primes/>
              }, 
              {
                path: "settings",
                element: <PrimesSettings />
              }
            ]
          },
          {
            path: 'notes',
            children: [
              {
                index: true,
                element: <Frais />
              },
              {
                path: "add",
                element: <AddFrais />
              },
              {
                path: ":id/edit",
                element: <EditFrais />
              },
              {
                path: ":id",
                element: <ViewFrais />
              },
            ],

          },
          {
            path: 'transport',
            children : [
              {
                index: true,
                element :<Transport />
              }, 
              {
                path: "new-recurrent",
                element: <AddTransportCurrent />
              },
              {
                path: "new-ponctuel",
                element: <AddTransportPonctuel />
              },
              {
                path: "parametres",
                element: <ParametresTransport />
              }
            ]
          },
          {
            path: 'cloture',
            element: <Cloture />,
          },
        ],
      },
      {
        path: "comptabilite",
        children: [
          {
            index: true,
            element: <Comptabilite />
          },
          {
            path: "documents",
            element: <ComptabiliteDocuments />
          }
        ]
      },
      {
        path: "parametres",
        children: [
          {element : <Integrations />, index: true},
          {element : <Admins />, path: "admins"},
          {element : <Banks />, path: "banks"},
          {element : <Cabinets />, path: "cabinets"},
          {element : <EntreprisesInetg />, path: "entreprises"},
          {element : <Parameter />, path: "integration"},
        ]
      },
      {
        path: "account",
        children: [
          { element: <Account />, index: true }
        ]
      },
      {
        path: "aide",
        children: [
          { element: <Aide />, index: true },
          { element: <Onboarding />, path: "onboarding" },
          { element: <Amelioration />, path: "demande-amelioration" },
          { element: <Parrainage />, path: "parrainage" },
          { element: <Urssaf />, path: "urssaf" },
        ]
      },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
    ],
  },
];
