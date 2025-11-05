import React, { useState, useCallback } from 'react';

import { Tab, Menu, Tabs, Stack, Button, MenuItem, MenuList, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import EffectifsList from '../effectifs-list';
import StatistiquesView from '../statistiques-view';

export const JOB_DETAILS_TABS = [
  { label: 'Effectifs', value: 'effectif' },
  { label: 'Statistiques', value: 'statistiques' },
];
export default function EffectifsListView() {
  const tabs = useTabs('effectif');
  const router = useRouter();
  const popover = usePopover();

  const [isOpen, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const renderTabs = (
    <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
      {JOB_DETAILS_TABS.map((tab) => (
        <Tab key={tab.value} iconPosition="end" value={tab.value} label={tab.label} />
      ))}
    </Tabs>
  );

  const renderActions = (
    <Stack flexDirection="row">
      <Button
        startIcon={<Iconify icon="mingcute:add-line" />}
        variant="contained"
        onClick={handleOpen}
        color="primary"
      >
        Ajouter
      </Button>
      <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={!!isOpen}>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.employes.add);
            popover.onClose();
          }}
        >
          Créer un employé
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.employes.reintegrer1);
            popover.onClose();
          }}
        >
          Réintégrer un ancien employé
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.employes.link);
            popover.onClose();
          }}
        >
          Générer un lien d&apos;invitation
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.employes.import);
            popover.onClose();
          }}
        >
          Importer mes employés via fichiher excel
        </MenuItem>
      </Menu>
      <IconButton onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="mdi:user-add" />
            Déclarer un départ définitif
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="mdi:account-cancel" />
            Déclarer un congé longue durée
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Exporter le tableau
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </Stack>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Effectifs"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Employés', href: paths.dashboard.employes.root },
          { name: 'Effectifs' },
        ]}
        action={renderActions}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {renderTabs}
      {tabs.value === 'effectif' && <EffectifsList />}
      {tabs.value === 'statistiques' && <StatistiquesView />}
    </DashboardContent>
  );
}
