import React from 'react';

import {
  Link,
  Stack,
  Button,
  Tooltip,
  Checkbox,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import AddAdminModal from '../../employes/entreprises/display/add-admin-modal';

export default function AdminsTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const edit = useBoolean();
  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={edit.onTrue} sx={{ cursor: 'pointer' }}>
                {row.firstName} {row.lastName}
              </Link>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.email}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.entreprises.map((entreprise) => (
           <>{entreprise} <br/></> 
        ))}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Modifier" placement="top" arrow>
              <IconButton color="default" onClick={edit.onTrue}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer" placement="top" arrow>
              <IconButton color="error" onClick={confirm.onTrue}>
                <Iconify icon="tabler:trash" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <AddAdminModal currentUser={row} open={edit.value} onClose={edit.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Êtes-vous sûr de vouloir supprimer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
