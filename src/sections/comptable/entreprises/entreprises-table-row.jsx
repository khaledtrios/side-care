import React from 'react';

import { TableRow, TableCell, ListItemText } from '@mui/material';

export default function EntreprisesTableRow({ row, selected, onSelectRow }) {
  return (
    <TableRow hover selected={selected} onClick={onSelectRow}>
      <TableCell align="left">
        <ListItemText primary={row.raison} secondary={row.siret} />
      </TableCell>
      <TableCell align="left">{row.gestionnaire}</TableCell>
      <TableCell align="left">{row.nbrEmployes}</TableCell>
      <TableCell align="left">
        {row.contact.map((email) => (
          <div key={email}>{email}</div>
        ))}
      </TableCell>
    </TableRow>
  );
}
