import React from 'react';

import { Stack, Button, TableRow, TableCell, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function AbsenceListRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  return (
    <>
      <TableRow hover>
        <TableCell>{row.raison}</TableCell>
        <TableCell>2 jours</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(row.startDate)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fDate(row.endDate)}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'approved' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>
        <TableCell>
          <Stack direction="row" alignItems="center">
            <IconButton
              color="default"
              onClick={() => onEditRow()}
            >
              <Iconify icon="material-symbols:edit-outline" />
            </IconButton>
            <IconButton color="error" onClick={() => confirm.onTrue()}>
              <Iconify icon="tabler:trash" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
