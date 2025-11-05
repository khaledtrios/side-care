import React from 'react'

import { TableRow, TableCell, ListItemText } from '@mui/material'

import { fDate } from 'src/utils/format-time'

export default function EffectifsTableRow({ row, onSelectRow }) {
  return (
    <TableRow hover onClick={onSelectRow} sx={{ cursor: 'pointer' }}>
        <TableCell align='left'>
            <ListItemText primary={row.name} secondary={row.entreprise} />
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell>{row.college}</TableCell>
        <TableCell>{fDate(row.contract_start)}</TableCell>
        <TableCell>{fDate(row.contract_end)}</TableCell>
    </TableRow>
  )
}
