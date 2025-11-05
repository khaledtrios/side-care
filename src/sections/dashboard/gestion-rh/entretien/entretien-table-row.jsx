import React from 'react';

import { Checkbox, TableRow, TableCell, IconButton } from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';

const entretienType = [
    { id: "1", label: "Entretien étape projet"}
]
export default function EntretienTableRow({ row, selected, onSelectRow }) {
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>
      <TableCell>{row.manager}</TableCell>
      <TableCell>{row.entreprise}</TableCell>
      <TableCell>
         {entretienType.find((item) => item.id === row.type)?.label || 'Type inconnu'}
      </TableCell>
      <TableCell>{fDate(row.date)}</TableCell>
      <TableCell>
        <IconButton color="default">
          <Iconify icon="mdi:eye-outline" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
