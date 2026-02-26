import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BankTab, PersonalTab, SecurityTab, PasswordTab, ProfessionalTab, MailSettingsTab } from '../tabs';

const TABS = [
  {
    value: 'personal',
    label: 'I. Personnelles',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
    comp: <PersonalTab />,
  },
  {
    value: 'professional',
    label: 'I. Professionelle',
    icon: <Iconify icon="basil:bag-solid" width={24} />,
    comp: <ProfessionalTab />,
  },
  {
    value: 'bank',
    label: 'I. Bancaire',
    icon: <Iconify icon="mingcute:bank-fill" width={24} />,
    comp: <BankTab />,
  },
  {
    value: 'mails',
    label: 'Paramétrage mails',
    icon: <Iconify icon="material-symbols:mail-outline" width={24} />,
    comp: <MailSettingsTab />,
  },
  {
    value: 'password',
    label: 'Mot de passe',
    icon: <Iconify icon="solar:lock-outline" width={23} />,
    comp: <PasswordTab />,
  },
  {
    value: '2auth',
    label: '2FA',
    icon: <Iconify icon="solar:shield-keyhole-bold-duotone" width={24} />,
    comp: <SecurityTab />,
  },
];

export default function ComptePageView({ user }) {
  const defaultValues = useMemo(
    () => ({
      photoURL: user?.photoURL || '',
      civility: user?.civility || '',
      lastName: user?.lastName || '',
      maidenName: user?.maidenName || '',
      firstName: user?.firstName || '',
      nationality: user?.nationality || '',
      idCard: user?.idCard || '',
      address: user?.address || '',
      postalCode: user?.postalCode || '',
      city: user?.city || '',
      birthDate: user?.birthDate || '',
      birthCity: user?.birthCity || '',
      birthPostalCode: user?.birthPostalCode || '',
      birthCountry: user?.birthCountry || '',
      personalEmail: user?.personalEmail || '',
      phone: user?.phone || '',
      socialSecurityNumber: user?.socialSecurityNumber || '',
      ameliCertificate: user?.ameliCertificate || '',
      phonePro: user?.phonePro || '',
      emergencyContacts: user?.emergencyContacts || [],
      allergies: user?.allergies || '',
      // Professional data
      company: user?.company || [],
      matricule: user?.matricule || '',
      poste: user?.poste || '',
      team: user?.team || [],
      manager: user?.manager || '',
      empManager: user?.empManager || [],
      emailPro: user?.emailPro || '',
      arret: user?.arret || false,
      handicap: user?.handicap || false,
      startDate: user?.startDate || null,
      endDate: user?.endDate || null,
      endDateEssai: user?.endDateEssai || null,
      endDateSecondEssai: user?.endDateSecondEssai || null,
      contractType: user?.contractType || [],
      college: user?.college || [],
      salary: user?.salary || '',
      period: user?.period || '',
      position: user?.position || '',
      coefficient: user?.coefficient || '',
      contract: user?.contract || null,
      formats: user?.formats || [],
      duree: user?.duree || '',
      // Mail settings data (updated to match screenshot)
      mailPersonal: user?.mailPersonal || '',
      mailPro: user?.mailPro || '',
      notifyNewDoc: user?.notifyNewDoc || false,
      notifyExpense: user?.notifyExpense || false,
      notifyTransport: user?.notifyTransport || false,
    }),
    [user]
  );

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const tabs = useTabs('mails'); // Default to mails tab
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Faker Chihaoui"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Effectifs' },
        ]}
        action={<Button variant='contained' color="primary">Enregistrer</Button>}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>
      <Form methods={methods} onSubmit={onSubmit}>
        {TABS.find((tab) => tabs.value === tab.value)?.comp}
      </Form>
    </DashboardContent>
  );
}