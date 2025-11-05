import React from 'react';

import Link from '@mui/material/Link';
import { Card, Stack, Button, MenuItem, MenuList, IconButton, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import EditEquipeModal from './edit-equipe-modal';

export default function EquipesItem({ team, onView, onEdit, onDelete }) {
  const popover = usePopover();

  const confirm = useBoolean();

  const edit = useBoolean();

  const route = useRouter()

  return (
    <>
      <Card>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                component={RouterLink}
                href={paths.dashboard.equipes.view(team.id)}
                color="inherit"
              >
                {team.name}
              </Link>
            }
            secondary={team.entreprise}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />

          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{ color: 'primary.main', typography: 'caption' }}
          >
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {team.employes.length}
          </Stack>
        </Stack>
      </Card>

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
              route.push(paths.dashboard.equipes.view(team.id))
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Voir
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              edit.onTrue();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Modifier
          </MenuItem>

          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Supprimer
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer équipe"
        content={`Êtes-vous sûr de vouloir effacer ${team.name}?`}
        action={
          <Button variant="contained" color="error" onClick={onDelete}>
            Supprimer
          </Button>
        }
      />

      <EditEquipeModal currentTeam={team} open={edit.value} onClose={edit.onFalse} />
    </>
  );
}
