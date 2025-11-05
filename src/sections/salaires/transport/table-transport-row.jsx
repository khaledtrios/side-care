import React from 'react';

import {
  Stack,
  Button,
  Tooltip,
  MenuItem,
  MenuList,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function TransportTableRow({ row, onDeleteRow, onViewRow }) {
  const popover = usePopover();
  const confirm = useBoolean();

  return (
    <>
      <TableRow hover>
        <TableCell>{fDate(row.date)}</TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{fCurrency(row.amount_total)}</TableCell>
        <TableCell>{fCurrency(row.amount_rembourse)}</TableCell>
        <TableCell>{row.prise}</TableCell>
        <TableCell>
          <Button
            variant="text"
            size="small"
            href={row.justificatif}
            target="_blank"
            disabled={!row.justificatif}
            startIcon={<Iconify icon="material-symbols:download-rounded" />}
          >
            Télécharger
          </Button>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Modifier" placement="top" arrow>
              <IconButton
                color="inherit"
                href={paths.salaries.transport.editPonctuel(row.id)}
                LinkComponent={RouterLink}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <IconButton
              color={popover.open ? 'inherit' : 'default'}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onViewRow(row.id);
              popover.onClose();
            }}
          >
            <Iconify icon="mdi:eye" />
            Voir
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
        title="Supprimer"
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
