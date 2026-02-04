import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// Error
const Page404 = lazy(() => import('src/pages/error/404'));
const Landing = lazy(() => import('src/pages/landing/index'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Navigate to="/connexion-hub" replace /> },
      { path: '/connexion-hub', element: <Landing /> },
      { path: '404', element: <Page404 /> },
    ],
  },
];
