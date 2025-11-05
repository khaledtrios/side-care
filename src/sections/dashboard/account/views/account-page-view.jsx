import React from 'react';

import { Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
// import InformationsTab from '../displays/informations-tab';
import EmailsTab from '../displays/emails-tab';
import PasswrdTab from '../displays/password-tab';
import SecurityTab from '../displays/security-tab';
import { InformationsTab } from '../displays/informations-tab';

const TABS = [
  { value: 'informations', label: 'Informations', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  { value: 'emails', label: 'Emails', icon: <Iconify icon="ic:baseline-email" width={24} /> },
  { value: 'password', label: 'Mot de passe', icon: <Iconify icon="material-symbols:lock" width={24} /> },
  { value: 'security', label: 'Securité', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
];

export default function AccountPageView() {
  const tabs = useTabs('informations');

  // Find the label for the current tab value
  const currentTab = TABS.find((tab) => tab.value === tabs.value);
  const currentLabel = currentTab ? currentTab.label : '';

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Mon compte"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: currentLabel, href: paths.dashboard.comptabilite.root },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'informations' && <InformationsTab />}
      {tabs.value === 'emails' && <EmailsTab />}
      {tabs.value === 'password' && <PasswrdTab />}
      {tabs.value === 'security' && <SecurityTab />}
    </DashboardContent>
  );
}
