import React, { useState } from 'react';

import {
  Stack,
  Button,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Typography,
  ListItemText,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';

export default function CompteurTableRow({ row, onViewRow, onEditRow }) {
  const edit = useBoolean();

  const [values, setValues] = useState({
    soldPaid: row.soldPaid,
    soldRtt: row.soldRtt,
  });

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCancel = () => {
    setValues({ soldPaid: row.soldPaid, soldRtt: row.soldRtt });
    edit.onFalse();
  };

  const handleConfirm = () => {
    if (onEditRow) {
      onEditRow({ ...row, ...values });
    }
    edit.onFalse();
  };

  return (
      <TableRow hover>
        <TableCell>
          <ListItemText
            disableTypography
            primary={<Typography variant="body2" noWrap>{row.employe}</Typography>}
            secondary={<Typography variant="body2">{row.entreprise}</Typography>}
          />
        </TableCell>

        <TableCell>
          {edit.value ? (
            <TextField
              size="small"
              value={values.soldPaid}
              onChange={handleChange('soldPaid')}
              type="number"
            />
          ) : (
            row.soldPaid
          )}
        </TableCell>

        <TableCell>
          {edit.value ? (
            <TextField
              size="small"
              value={values.soldRtt}
              onChange={handleChange('soldRtt')}
              type="number"
            />
          ) : (
            row.soldRtt
          )}
        </TableCell>

        <TableCell>
          {edit.value ? (
            <Stack direction="row" spacing={1}>
              <Button size="small" color="inherit" onClick={handleCancel}>
                Annuler
              </Button>
              <Button size="small" variant="contained" onClick={handleConfirm}>
                Confirmer
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <IconButton size="small" onClick={() => onViewRow && onViewRow()}>
                <Iconify icon="solar:eye-bold" />
              </IconButton>
              <IconButton size="small" onClick={() => edit.onTrue()}>
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Stack>
          )}
        </TableCell>
      </TableRow>

  );
}
