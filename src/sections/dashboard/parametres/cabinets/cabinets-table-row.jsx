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
  Box,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import AddAdminModal from '../../employes/entreprises/display/add-admin-modal';
import CabinetsFormDialog from './cabinets-form-dialog';

export default function CabinetsTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
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
                {row.entreprise}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                Siret :{row.siret}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.cabinet.lastName} {row.cabinet.firstName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.cabinet.lastName} {row.cabinet.firstName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.cabinet.email}</TableCell>

        <TableCell>
          {/* <Stack direction="row" alignItems="center">
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
          </Stack> */}
          {
            row.cabinet.id ? (
                <Button color='error' variant='contained' onClick={confirm.onTrue}>
                    Supprimer
                </Button>
            ):(
                <Button color='primary' variant='contained' onClick={edit.onTrue}>
                    Ajouter
                </Button>
            )
          }
        </TableCell>
      </TableRow>

      <CabinetsFormDialog currentUser={row} open={edit.value} onClose={edit.onFalse} />

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
