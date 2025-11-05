import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { useMockedUser } from 'src/auth/hooks';

import {
  EvpTab,
  BankTab,
  TasksTab,
  AbsenceTab,
  HistoryTab,
  WorkOffTab,
  DocumntsTab,
  MutuelleTab,
  PersonalTab,
  EntretienTab,
  PrevoyanceTab,
  ProfessionalTab,
} from '../tabs';

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
    value: 'mutuelle',
    label: 'Mutuelle',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    comp: <MutuelleTab />,
  },
  {
    value: 'prevoyance',
    label: 'Prévoyance',
    icon: <Iconify icon="solar:umbrella-bold" width={24} />,
    comp: <PrevoyanceTab />,
  },
  {
    value: 'absence',
    label: 'Congés & Absences',
    icon: <Iconify icon="lsicon:user-leave-filled" width={24} />,
    comp: <AbsenceTab />,
  },
  {
    value: 'workOff',
    label: 'Arrêts de travail',
    icon: <Iconify icon="ic:round-work-off" width={24} />,
    comp: <WorkOffTab />,
  },
  {
    value: 'entretien',
    label: 'Entretiens Professionnels',
    icon: <Iconify icon="mdi:head-question" width={24} />,
    comp: <EntretienTab />,
  },
  {
    value: 'documents',
    label: 'Documents',
    icon: <Iconify icon="solar:document-bold" width={24} />,
    comp: <DocumntsTab />,
  },
  {
    value: 'tasks',
    label: 'Tâches',
    icon: <Iconify icon="clarity:tasks-solid" width={24} />,
    comp: <TasksTab />,
  },
  {
    value: 'evp',
    label: 'EVP',
    icon: <Iconify icon="solar:wallet-bold" width={24} />,
    comp: <EvpTab />,
  },
  {
    value: 'bank',
    label: 'I. Bancaire',
    icon: <Iconify icon="mingcute:bank-fill" width={24} />,
    comp: <BankTab />,
  },
  {
    value: 'history',
    label: 'Historique',
    icon: <Iconify icon="material-symbols:history-rounded" width={24} />,
    comp: <HistoryTab />,
  },
];

export default function EmployeViewPage() {
  const { user } = useMockedUser();
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

  const tabs = useTabs('personal');
  return (
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Wissem Chihaoui"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Employés', href: paths.dashboard.employes.root },
            { name: 'Effectifs' },
          ]}
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
