import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  users: icon('ic-users'),
  support: icon('ic-support'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Tableau de bord',
    items: [
      { title: 'Tableau de bord', path: paths.comptable.root, icon: ICONS.dashboard },
      { title: 'Entreprises', path: paths.comptable.entreprise.root, icon: ICONS.banking },
      {
        title: 'Employés',
        path: paths.comptable.employes.root,
        icon: ICONS.users,
        children: [
          { title: 'Effectifs', path: paths.comptable.employes.root },
          { title: 'Historique des affiliations', path: paths.comptable.employes.historique },
        ],
      },
      // Devis removed
      // Optimisations de contrat removed
      // Cotisations & DSN removed
      {
        title: 'Paie',
        path: paths.comptable.paie.root,
        icon: ICONS.chat,
        children: [
          { title: 'Absences et congés', path: paths.comptable.conges.root },
          { title: 'Primes', path: paths.comptable.primes.root },
          { title: 'Notes de frais', path: paths.comptable.notes.root },
          { title: 'Titres de transport', path: paths.comptable.transport.root },
          { title: 'Clôture de paie', path: paths.comptable.cloture.root },
        ]
      },
      {
        title: 'Mes cabinets',
        path: paths.comptable.cabinets.root,
        icon: ICONS.kanban,
      },
      {
        title: 'Mon compte',
        path: paths.comptable.compte.root,
        icon: ICONS.user,
      },
      {
        title: 'Aide',
        path: paths.comptable.aide.root,
        icon: ICONS.user,
        children: [
          { title: 'Centre d\'aide', path: paths.comptable.aide.root },
          { title: 'Nouveautés', path: paths.comptable.aide.root },
          { title: 'Suggestions d\'amélioration', path: paths.comptable.aide.root },
        ]
      },

    ],
  },
];
