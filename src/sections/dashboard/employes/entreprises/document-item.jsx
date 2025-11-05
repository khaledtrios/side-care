import { Button, Checkbox, FormControlLabel, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

export default function DocumentItem({ row, toDelete }) {
  const [visible, setVisible] = useState(row.visible);
  const open = useBoolean();
  return (
    <>
      <Stack sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral' }}>
        <Stack justifyContent="space-between" flexDirection="row" alignItems="center">
          <Stack flexDirection="row" spacing={1}>
            <Iconify icon="mdi:file" />
            <Typography variant="subtitle1">{row.type}</Typography>
            <Typography variant="Body2">({row.name})</Typography>
          </Stack>
          <Stack flexDirection="row" spacing={1}>
            <IconButton>
              <Iconify icon="material-symbols:download-rounded" />
            </IconButton>
            <IconButton color="error" onClick={() => open.onTrue()}>
              <Iconify icon="mdi:trash-outline" />
            </IconButton>
          </Stack>
        </Stack>
        <FormControlLabel
          label="Rendre ce document visible par les employés"
          control={
            <Checkbox
              size="medium"
              defaultChecked
              value={visible}
              onChange={(e) => setVisible(e.target.value)}
            />
          }
        />
      </Stack>

      <ConfirmDialog
        open={open.value}
        onClose={open.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {row.name} </strong>?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              toDelete();
              open.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />
    </>
  );
}
