import React from 'react';

import {
  Chip,
  Stack,
  Tooltip,
  Checkbox,
  MenuItem,
  MenuList,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const getStatusColor = (status) => {
  switch (status) {
    case 'validated':
      return 'success';
    case 'pending':
      return 'warning';
    case 'draft':
      return 'default';
    case 'exported':
      return 'info';
    default:
      return 'default';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'validated':
      return 'Validée';
    case 'pending':
      return 'En attente';
    case 'draft':
      return 'Brouillon';
    case 'exported':
      return 'Exportée';
    default:
      return status;
  }
};

export default function ClotureTableRow({
  row,
  selected,
  onSelectRow,
  onValidateRow,
  onViewRow,
  onExportRow,
}) {
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>{row.entreprise}</TableCell>
        <TableCell>{fDate(row.period, 'MMMM yyyy')}</TableCell>
        <TableCell align="center">{row.nbEmployes}</TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={row.absences}
            color={row.absences > 0 ? 'error' : 'default'}
            variant="soft"
          />
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={row.primes}
            color={row.primes > 0 ? 'success' : 'default'}
            variant="soft"
          />
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={row.notesFrais}
            color={row.notesFrais > 0 ? 'info' : 'default'}
            variant="soft"
          />
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            label={row.transport}
            color={row.transport > 0 ? 'primary' : 'default'}
            variant="soft"
          />
        </TableCell>
        <TableCell>
          <Label color={getStatusColor(row.status)}>{getStatusLabel(row.status)}</Label>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center">
            {row.status !== 'validated' && row.status !== 'exported' && (
              <Tooltip title="Valider" placement="top" arrow>
                <IconButton color="success" onClick={onValidateRow}>
                  <Iconify icon="solar:check-circle-bold" />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Voir détails" placement="top" arrow>
              <IconButton color="inherit" onClick={onViewRow}>
                <Iconify icon="mdi:eye" />
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
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="mdi:eye" />
            Voir détails
          </MenuItem>
          <MenuItem
            onClick={() => {
              onExportRow();
              popover.onClose();
            }}
          >
            <Iconify icon="uil:export" />
            Exporter
          </MenuItem>
          {row.status !== 'validated' && row.status !== 'exported' && (
            <MenuItem
              onClick={() => {
                onValidateRow();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:check-circle-bold" />
              Valider
            </MenuItem>
          )}
        </MenuList>
      </CustomPopover>
    </>
  );
}
