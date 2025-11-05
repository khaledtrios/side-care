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
      { title: 'Tableau de bord', path: paths.salaries.root, icon: ICONS.dashboard },
      {
        title: "Mes congés & absences",
        path:  paths.salaries.conges.root,
        icon: ICONS.tour,
      },
      {
        title: "Mes titres de transport",
        path:  paths.salaries.transport.root,
        icon: ICONS.booking,
      },
      {
        title: "Mes notes de frais",
        path:  paths.salaries.notes.root,
        icon: ICONS.invoice,
      },
      {
        title: "Mes entretiens",
        path:  paths.salaries.entretiens.root,
        icon: ICONS.job,
      },
      {
        title: "Mes documents",
        path:  paths.salaries.documents.root,
        icon: ICONS.folder,
      },
      {
        title: "Mon entreprise et moi",
        path:  paths.salaries.entreprise.root,
        icon: ICONS.banking,
        children : [
            {
                title: "Trombinoscope",
                path: paths.salaries.entreprise.root
            },
            {
                title: "Organigramme",
                path: paths.salaries.entreprise.organigramme
            },
        ]
      },
      {
        title: "Mon compte",
        path:  paths.salaries.compte.root,
        icon: ICONS.user,
      },
      {
        title: "Aide",
        path:  paths.salaries.aide.root,
        icon: ICONS.support,
      },

    ],
  }
];
