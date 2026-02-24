// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  SALARIES: '/espace-salaries',
  COMPTABLE: '/espace-partenaire',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  hub: '/connexion-hub',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      forgetPassword: `${ROOTS.AUTH}/jwt/forget-pass-word`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    employes: {
      root: `${ROOTS.DASHBOARD}/salaries`,
      view: (id) => `${ROOTS.DASHBOARD}/salaries/${id}/view`,
      add: `${ROOTS.DASHBOARD}/salaries/add`,
      reintegrer1: `${ROOTS.DASHBOARD}/salaries/reintegrer-1`,
      reintegrer2: (id) => `${ROOTS.DASHBOARD}/salaries/reintegrer-2/${id}`,
      link: `${ROOTS.DASHBOARD}/salaries/invitation_link`,
      import: `${ROOTS.DASHBOARD}/salaries/importation`,
    },
    equipes: {
      root: `${ROOTS.DASHBOARD}/equipes`,
      view: (id) => `${ROOTS.DASHBOARD}/equipes/${id}/view`,
    },
    entreprise: {
      root: `${ROOTS.DASHBOARD}/vos-entreprises`,
      addEntreprise: `${ROOTS.DASHBOARD}/vos-entreprises/add`,
      edit: (id) => `${ROOTS.DASHBOARD}/vos-entreprises/${id}/edit`,
      view: (id) => `${ROOTS.DASHBOARD}/vos-entreprises/${id}/view`,
      successAddEntreprise: `${ROOTS.DASHBOARD}/vos-entreprises/add/success`,
    },
    gestionRh: {
      root: `${ROOTS.DASHBOARD}/gestion-rh`,
      calendrier: `${ROOTS.DASHBOARD}/gestion-rh/calendrier`,
      // entretien: `${ROOTS.DASHBOARD}/gestion-rh/entretien`,
      entretien: {
        root: `${ROOTS.DASHBOARD}/gestion-rh/entretien`,
        add: `${ROOTS.DASHBOARD}/gestion-rh/entretien/add`,
        edit: (id) => `${ROOTS.DASHBOARD}/gestion-rh/entretien/${id}/edit`,
        view: (id) => `${ROOTS.DASHBOARD}/gestion-rh/entretien/${id}`,
        types: (id) => `${ROOTS.DASHBOARD}/gestion-rh/entretien/${id}/types`,
      },
      template: `${ROOTS.DASHBOARD}/gestion-rh/templates`,
    },
    conges: {
      root: `${ROOTS.DASHBOARD}/conges-et-absences`,
      add: `${ROOTS.DASHBOARD}/conges-et-absences/new`,
    },
    evp: {
      primes: {
        root: `${ROOTS.DASHBOARD}/evp/primes`,
        settings: `${ROOTS.DASHBOARD}/evp/primes/settings`,
      },
      notes: {
        root: `${ROOTS.DASHBOARD}/evp/notes`,
        add: `${ROOTS.DASHBOARD}/evp/notes/add`,
        edit: (id) => `${ROOTS.DASHBOARD}/evp/notes/${id}/edit`,
        view: (id) => `${ROOTS.DASHBOARD}/evp/notes/${id}`,
      },
      transport: {
        root: `${ROOTS.DASHBOARD}/evp/transport`,
        addCurrent: `${ROOTS.DASHBOARD}/evp/transport/new-recurrent`,
        addPonctuel: `${ROOTS.DASHBOARD}/evp/transport/new-ponctuel`,
        parametres: `${ROOTS.DASHBOARD}/evp/transport/parametres`,
      },
      cloture: {
        root: `${ROOTS.DASHBOARD}/evp/cloture`,
      },
    },
    comptabilite: {
      root: `${ROOTS.DASHBOARD}/comptabilite`,
      documents: {
        root: `${ROOTS.DASHBOARD}/comptabilite/documents`,
      },
    },
    parametres: {
      root: `${ROOTS.DASHBOARD}/parametres`,
      admins: {
        root: `${ROOTS.DASHBOARD}/parametres/admins`,
      },
      banks: {
        root: `${ROOTS.DASHBOARD}/parametres/banks`,
      },
      cabinets: {
        root: `${ROOTS.DASHBOARD}/parametres/cabinets`,
      },
      entreprises: {
        root: `${ROOTS.DASHBOARD}/parametres/entreprises`,
      },
    },
    account: {
      root: `${ROOTS.DASHBOARD}/account`,
    },
    aide: {
      root: `${ROOTS.DASHBOARD}/aide`,
      onboarding: `${ROOTS.DASHBOARD}/aide/onboarding`,
      amelioration: `${ROOTS.DASHBOARD}/aide/demande-amelioration`,
      parrainage: `${ROOTS.DASHBOARD}/aide/parrainage`,
      urssaf: `${ROOTS.DASHBOARD}/aide/urssaf`,
    },
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
  },
  // SALARIES
  salaries: {
    root: ROOTS.SALARIES,
    conges: {
      root: `${ROOTS.SALARIES}/conges`,
    },
    transport: {
      root: `${ROOTS.SALARIES}/transport`,
      addPonctuel: `${ROOTS.SALARIES}/transport/add-ponctuel`,
      addRecurrent: `${ROOTS.SALARIES}/transport/add-recurrent`,
      editRecurrent: (id) => `${ROOTS.SALARIES}/transport/${id}/edit-recurrent`,
      editPonctuel: (id) => `${ROOTS.SALARIES}/transport/${id}/edit-ponctuel`,
    },
    notes: {
      root: `${ROOTS.SALARIES}/notes`,
      add: `${ROOTS.SALARIES}/notes/add`,
      edit: (id) => `${ROOTS.SALARIES}/notes/${id}/edit`,
      view: (id) => `${ROOTS.SALARIES}/notes/${id}/view`,
    },
    entretiens: {
      root: `${ROOTS.SALARIES}/entretiens`,
    },
    documents: {
      root: `${ROOTS.SALARIES}/documents`,
      view: (id) => `${ROOTS.SALARIES}/documents/${id}/view`,
    },
    compte: {
      root: `${ROOTS.SALARIES}/mon-compte`,
      addBankAccount: `${ROOTS.SALARIES}/mon-compte/add-compte-bancaire`,
      bankAccountDetails: (id) => `${ROOTS.SALARIES}/mon-compte/${id}`,
      editBankAccount: (id) => `${ROOTS.SALARIES}/mon-compte/${id}/edit`,
    },
    aide: {
      root: `${ROOTS.SALARIES}/aide`,
      onboarding: `${ROOTS.SALARIES}/aide/onboarding`,
      amelioration: `${ROOTS.SALARIES}/aide/amelioration`,
      parrainage: `${ROOTS.SALARIES}/aide/parrainage`,
      urssaf: `${ROOTS.SALARIES}/aide/urssaf`,
    },
  },

  // Comptable
  comptable: {
    root: `${ROOTS.COMPTABLE}`,
    aide: {
      root: `${ROOTS.COMPTABLE}/aide`,
    },
    cabinets: {
      root: `${ROOTS.COMPTABLE}/cabinets`,
    },
    // cotisation: removed
    // devis: removed
    employes: {
      root: `${ROOTS.COMPTABLE}/employes`,
      mutuelles: `${ROOTS.COMPTABLE}/employes/mutuelles`,
      prevoyance: `${ROOTS.COMPTABLE}/employes/prevoyance`,
      historique: `${ROOTS.COMPTABLE}/employes/historique`,
      view: (id) => `${ROOTS.COMPTABLE}/employes/${id}/view`,
      add: `${ROOTS.COMPTABLE}/employes/add`,
    },
    entreprise: {
      root: `${ROOTS.COMPTABLE}/entreprise`,
      add: `${ROOTS.COMPTABLE}/entreprise/add`,
      dsn: `${ROOTS.COMPTABLE}/entreprise/dsn`,
    },
    gestContract: {
      root: `${ROOTS.COMPTABLE}/gest-contract`,
    },
    // optContract: removed
    paie: {
      root: `${ROOTS.COMPTABLE}/paie`,
    },
    // commissions: removed
    comptes: {
      root: `${ROOTS.COMPTABLE}/comptes`,
    },
  },
};
