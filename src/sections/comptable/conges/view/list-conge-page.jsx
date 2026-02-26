import React from 'react';

import { Box, Button, Card, CardContent, Tab, Tabs } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';
import { ComptableContent } from 'src/layouts/comptable';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import PlanTabContent from '../list-views/plan-tab-content';
import DemandeTabContent from '../list-views/demande-tab-content';
import CompteurTabContent from '../list-views/compteur-tab-content';

export default function ListCongePage() {
  const tabs = useTabs('demande');
  return (
      <ComptableContent>
        <CustomBreadcrumbs
          heading="Congés et absences"
          links={[
            { name: 'Tableau du bord', href: paths.comptable.root },
            { name: 'Congés et absences', href: paths.comptable.conges.root },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 0, md: 0 } }}
        />

        <Box
          sx={{
            mt: 2,
            mb: { xs: 3, md: 5 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 1,
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
          }}
        >

          <Button
            variant="contained"
            color='primary'
            startIcon={<Iconify icon="uil:export" />}
            sx={{ width: { xs: '100%', md: 'auto' }, textTransform: 'none' }}
            onClick={() => {
              // TODO: export table
            }}
          >
            Exporter le tableau
          </Button>
        </Box>

        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={{
            px: 3,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {[
            { value: 'demande', label: 'Demande de congés' },
            { value: 'plan', label: `Planning` },
            { value: 'compteur', label: `Compteur de congés` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
        <Card>
          <CardContent>
            {tabs.value === 'demande' && <DemandeTabContent />}
            {tabs.value === 'plan' && <PlanTabContent />}
            {tabs.value === 'compteur' && <CompteurTabContent />}
          </CardContent>
        </Card>
      </ComptableContent>
  );
}
