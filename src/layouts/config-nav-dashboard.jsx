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
      { title: 'Tableau de bord', path: paths.dashboard.root, icon: ICONS.dashboard },
      // { title: 'SideStore', path: paths.dashboard.root, icon: ICONS.order },
      {
        title: 'Employés',
        path: paths.dashboard.employes.root,
        icon: ICONS.users,
        children: [
          { title: 'Entreprises', path: paths.dashboard.entreprise.root },
          { title: 'Effectifs', path: paths.dashboard.employes.root },
          { title: 'Équipe', path: paths.dashboard.equipes.root },
          { title: 'Bilan social', path: paths.dashboard.three },
        ],
      },
      {
        title: 'Gestion RH',
        path: paths.dashboard.gestionRh.root,
        icon: ICONS.chat,
        children: [
          { title: 'Suivi des démarches RH', path: paths.dashboard.gestionRh.root },
          { title: 'Calendrier', path: paths.dashboard.gestionRh.calendrier },
          { title: 'Entretiens', path: paths.dashboard.gestionRh.entretien.root },
          { title: 'Templates de documents', path: paths.dashboard.gestionRh.template },
        ],
      },
      {
        title: 'Gestion du temps',
        path: paths.dashboard.conges.root,
        icon: ICONS.tour,
        children: [{ title: 'Congés & absences', path: paths.dashboard.conges.root }],
      },
      {
        title: 'Variables de paie (EVP)',
        path: paths.dashboard.evp.primes.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Primes', path: paths.dashboard.evp.primes.root },
          { title: 'Note de frais', path: paths.dashboard.evp.notes.root },
          { title: 'Titres de transport', path: paths.dashboard.evp.transport.root },
          { title: 'Clôture', path: paths.dashboard.evp.cloture.root },
        ],
      },
      // Comptabilité removed
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Mon compte',
    items: [
      {
        title: 'Paramètres',
        path: paths.dashboard.parametres.root,
        icon: ICONS.parameter,
        children: [
          { title: 'Entreprises', path: paths.dashboard.parametres.entreprises.root },
          { title: 'Administrateurs', path: paths.dashboard.parametres.admins.root },
          { title: 'Cabinets experts-comptables', path: paths.dashboard.parametres.cabinets.root },
          { title: 'Comptes bancaire', path: paths.dashboard.parametres.banks.root },
        ],
      },
      { title: 'Mon compte', path: paths.dashboard.account.root, icon: ICONS.user },
      { title: "Centre d'aide", path: paths.dashboard.aide.root, icon: ICONS.support },
    ],
  },
];
