import React, { useState } from 'react';

import {
  TableRow,
  MenuList,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  ListItemText,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function CompteurTableRow({ row, onViewRow, onEditRow }) {
  const popover = usePopover();
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
    <>
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
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
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
            <Iconify icon="solar:eye-bold" />
            Voir
          </MenuItem>

          <MenuItem
            onClick={() => {
              edit.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Modifier
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
