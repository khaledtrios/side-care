import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { ComptableContent } from 'src/layouts/comptable';

import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DocumentsTab from '../tabs/documents-tab';
import {
  BankTab,
  MutuelleTab,
  PersonalTab,
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
    value: 'documents',
    label: 'Documents',
    icon: <Iconify icon="solar:document-bold" width={24} />,
    comp: <DocumentsTab />,
  },
  {
    value: 'bank',
    label: 'I. Bancaire',
    icon: <Iconify icon="mingcute:bank-fill" width={24} />,
    comp: <BankTab />,
  },
];

export default function EffectifsDetailsView({ employe }) {
  const tabs = useTabs('personal');

  

  const defaultValues = useMemo(
    () => ({
      photoURL: employe?.photoURL || '',
      civility: employe?.civility || '',
      lastName: employe?.lastName || '',
      maidenName: employe?.maidenName || '',
      firstName: employe?.firstName || '',
      nationality: employe?.nationality || '',
      idCard: employe?.idCard || '',
      address: employe?.address || '',
      postalCode: employe?.postalCode || '',
      city: employe?.city || '',
      birthDate: employe?.birthDate || '',
      birthCity: employe?.birthCity || '',
      birthPostalCode: employe?.birthPostalCode || '',
      birthCountry: employe?.birthCountry || '',
      personalEmail: employe?.personalEmail || '',
      phone: employe?.phone || '',
      socialSecurityNumber: employe?.socialSecurityNumber || '',
      ameliCertificate: employe?.ameliCertificate || '',
      phonePro: employe?.phonePro || '',
      team: employe?.team || [],
      documents: employe?.documents || [
        {
          category: 'example',
          childrens: [{
            type: 'Arret de maladie',
            name: 'Test 1',
            id: 1,
            link: '#',
          }],
        },
      ],
      banks: employe?.banks || [
        {
            title: "Example Bank",
            iban: "FR76 3000 1007 9412 3456 7890 185",
            bic: "FRNNFRP1XXX",
            document: "#"
        }
      ]
    }),
    [employe]
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

  return (
    <ComptableContent>
      <CustomBreadcrumbs
        heading={employe.name}
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
    </ComptableContent>
  );
}
