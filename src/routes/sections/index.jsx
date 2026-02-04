import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { salariesRoutes } from './salaries';
import { dashboardRoutes } from './dashboard';
import { comptableRoutes } from './comptable';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    // Root ('/') is handled in mainRoutes to show the landing page

    // Auth
    ...authRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Salaries
    ...salariesRoutes,

    // Main
    ...mainRoutes,

    // Comptable
    ...comptableRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
