import { Alert, AlertTitle, Button, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

export default function EntrepriseAddSuccess() {
  const popover = usePopover();
  const popover2 = usePopover();
  const router = useRouter();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter entreprise"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Entreprise', href: paths.dashboard.entreprise },
          { name: 'Ajouter succées' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Alert
        variant="outlined"
        action={
          <Stack gap={1} flexDirection="row">
            <Button
              LinkComponent={RouterLink}
              href={paths.dashboard.entreprise.view(1)}
              variant="contained"
              color="primary"
            >
              Voir la page Entreprise
            </Button>
            <Button variant="contained" color="primary" onClick={popover.onOpen}>
              Ajouter des employés
            </Button>
            <Button variant="contained" color="primary" onClick={popover2.onOpen}>
              Trouver une assurance
            </Button>
          </Stack>
        }
      >
        <AlertTitle sx={{ textTransform: 'capitalize' }}>Félicitations</AlertTitle>
        <Stack justifyContent="center" alignItems="center" width={1}>
          <Typography>Ajout de société avec succes</Typography>
        </Stack>
      </Alert>
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'bottom' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              router.push(paths.dashboard.employes.add);
              popover.onClose();
            }}
          >
            <Iconify icon="mdi:user" />
            Créer un employé
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:import-bold" />
            Générer un lien d&apos;invitation
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Importer mes employés via DSN
          </MenuItem>
        </MenuList>
      </CustomPopover>
      <CustomPopover
        open={popover2.open}
        anchorEl={popover2.anchorEl}
        onClose={popover2.onClose}
        slotProps={{ arrow: { placement: 'bottom' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover2.onClose();
            }}
          >
            J&apos;ai déjà un contract
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover2.onClose();
            }}
          >
            Je n&apos;ai pas encore de contract
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </DashboardContent>
  );
}
