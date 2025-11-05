import { _mock } from './_mock';

export const ENTREPRISE = ['En création', 'Portorium Consulting', 'AZERTY'];

export const TYPE_CONTRACT = [
  'Non défini',
  'CDI',
  'CDD',
  "CDD d'usage",
  'Contrat de professionalisation',
  'Freelance',
  'Interim (contrat de mission)',
  'Mandat social (non assimilé salarié)',
  'Mandat social (assimilé salarié)',
  'Stage',
  'Apprenti',
  'Autre type de contrat',
];

export const COLLEGE = ['Cadre', 'Non Cadre'];

export const STATUT_SALARY = ['Salariés actuels', 'Anciens salariés'];

export const _employesList = [...Array(15)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  entreprise: ENTREPRISE[index % 2],
  contract: (index % 2 && TYPE_CONTRACT[2]) || (index % 3 && TYPE_CONTRACT[3]) || TYPE_CONTRACT[1],
  college: COLLEGE[index % 2],
  startDate: _mock.time(index),
  endDate: (index % 2 && _mock.time(index)) || null,
  gender: (index % 2 && 'f') || 'm',

  // ✅ New fields added
  birthDate: _mock.time(index + 20), // fake birthday
  trialPeriodEndDate: _mock.time(index + 10),
  trialPeriodRenewalEndDate: (index % 3 === 0) ? _mock.time(index + 15) : null,
  interviews: [
    _mock.time(index + 5),
    ...(index % 3 === 0 ? [_mock.time(index + 6)] : []),
  ],
}));

