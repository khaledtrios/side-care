import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ComptePageView from 'src/sections/salaires/compte/views/compte-page-view';

// ----------------------------------------------------------------------
const metadata = { title: `Espace Salariés | Dashboard - ${CONFIG.appName}` };

const userData = {
  photoURL: '',
  civility: 'Monsieur',
  lastName: 'Arami',
  maidenName: '',
  firstName: 'Farid',
  nationality: '',
  idCard: '',
  address: '1 rue d’alzette luxembourg',
  postalCode: 'L-4011',
  city: 'Esch sur alzette',
  birthDate: new Date('2021-09-01'),
  birthCity: '',
  birthPostalCode: '',
  birthCountry: '',
  personalEmail: 'arami.farid@gmail.com',
  phone: '064025561',
  socialSecurityNumber: '',
  ameliCertificate: '',
  phonePro: '',
  emergencyContacts: [
    {
      lastName: 'Ouchaou',
      firstName: 'Wissem',
      phone: '28065313',
      relationship: 'Autre',
      priority: 1,
    },
  ],
  allergies: '',
  // Professional data
  company: ['Entreprise A'],
  matricule: 'EMP001',
  poste: 'Comptable',
  team: ['Comptable'],
  manager: 'AAA',
  empManager: ['BBB'],
  emailPro: 'farid.arami@entreprisea.com',
  arret: false,
  handicap: false,
  startDate: new Date('2023-01-15'),
  endDate: null,
  endDateEssai: new Date('2023-04-15'),
  endDateSecondEssai: null,
  contractType: ['CDD'],
  college: ['Non cadre'],
  salary: '35000',
  period: '12 Mois',
  position: 'Junior Accountant',
  coefficient: '150',
  contract: null,
  formats: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  duree: '35',
  // Mail settings data (updated to match screenshot)
  mailPersonal: 'arami.farid@gmail.com',
  mailPro: 'farid.arami@entreprisea.com',
  notifyNewDoc: true, // Nouveau document
  notifyExpense: false, // Note de frais
  notifyTransport: true, // Titre de transport
};

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ComptePageView user={userData} />
    </>
  );
}