import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import PlanTabContent from '../list-views/plan-tab-content';
import DemandeTabContent from '../list-views/demande-tab-content';
import CompteurTabContent from '../list-views/compteur-tab-content';

export default function ListCongePage() {
  const tabs = useTabs('demande');
  const popover = usePopover();
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Congés et absences"
          links={[
            { name: 'Tableau du bord', href: paths.dashboard.root },
            { name: 'Congés et absences', href: paths.dashboard.conges.root },
            { name: 'Liste' },
          ]}
          action={
            <Box>
              <Button
                component={RouterLink}
                href={paths.dashboard.conges.add}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Déclarer un congé / absence
              </Button>
              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Box>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

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
      </DashboardContent>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              // onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="ic:outline-settings" />
            Paramétrage des congés
          </MenuItem>

          <MenuItem
            onClick={() => {
              // edit.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="uil:export" />
            Exporter le tableau
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
