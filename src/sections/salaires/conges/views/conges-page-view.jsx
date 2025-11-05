import React from 'react';

import { Tab, Tabs, Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';
import { useBoolean } from 'src/hooks/use-boolean';

import { SalariesContent } from 'src/layouts/salarie';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import DemandeConge from '../demande-conge';
import PlanningPage from '../planning-page';
import AddCongeDialog from '../add-conge-dialog';

export default function CongesPageView() {
  const tabs = useTabs(0);
  const open = useBoolean()
  return (
    <>
    <SalariesContent>
      <CustomBreadcrumbs
        heading="Mes congés & absences"
        links={[
          { name: 'Tableau de bord', href: paths.salaries.root },
          { name: 'Mes congés & absences' },
        ]}
        action={<Button onClick={open.onTrue} variant="contained">Déclarer un congé / absence</Button>}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange}>
        <Tab label="Demandes de congés" value={0} />
        <Tab label="Planning Equipe" value={1} />
      </Tabs>

      {tabs.value === 0 && <DemandeConge />}
      {tabs.value === 1 && <PlanningPage /> }
    </SalariesContent>
    <AddCongeDialog open={open.value} onClose={open.onFalse} />
    </>
  );
}
