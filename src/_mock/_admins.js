import { _mock } from './_mock';


export const ADMINS_ROLES = [
  { value: 'contact', label: 'Contact Principal' },
  { value: 'gestion', label: 'Gestionnaire de paie' },
  { value: 'other', label: 'Autre administrateur' },
];
export const ADMINS = [...Array(4)].map((_, index) => ({
  id: index,
  name: _mock.fullName(index),
  lastName: _mock.lastName(index),
  firstName: _mock.firstName(index),
  isAdmin: index === 0,
  right: index === 0 ? 'Super Admin' : 'Administrateur',
  roles: index === 0 ? '/' : 'Contact Principal',
  email: _mock.email(index),
}));
export const EXPERTS = [...Array(1)].map((_, index) => ({
  id: index,
  entreprise: _mock.companyNames(index),
  lastName: _mock.lastName(index),
  firstName: _mock.firstName(index),
  cabinet:  _mock.companyNames(index),
  gestion: '-',
  email: _mock.email(index),
  phone: _mock.phoneNumber(index)
}));

export const BANK_ACCOUNT = [...Array(3)].map((_, index) => ({
  id: index,
  name: _mock.fullName(0),
  iban: 'FR7630006000011234567890189',
  bic: 'CRLYFPP',
  rip: null,
  isDefault: index === 0,
}))

export const INTEGRATIONS = [...Array(4)].map((_,index) => ({
  id: index,
  logo: 'https://startizy.s3.eu-central-1.amazonaws.com/tpmoh2n00c7dg8e2yi7y9f2m4f0f?response-content-disposition=inline%3B%20filename%3D%22Frame%204.png%22%3B%20filename%2A%3DUTF-8%27%27Frame%25204.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJAJLM7ZONSWM7EIQ%2F20250206%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250206T164648Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=953afdeb9d09a9c329dfcf89b3adb729ebabc2e7427b2a5926cc470d022da3b8',
  name: 'Lucca',
  desc: 'Reprenez le contrôle sur vos assurances Santé & synchronisez facilement vos effectifs sur SideCare.'
}))
