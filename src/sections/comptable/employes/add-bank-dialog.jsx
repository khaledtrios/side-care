import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import {
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export function BankDialog({ open, onClose }) {
  const { control, setValue } = useFormContext();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setValue("bankFile", file); // store the file in form state
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajouter un compte bancaire</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Controller
            name="bankTitle"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Titre de la banque" fullWidth />
            )}
          />

          <Controller
            name="bankIban"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="IBAN" fullWidth />
            )}
          />

          <Controller
            name="bankBic"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="BIC" fullWidth />
            )}
          />

          <Button variant="outlined" component="label">
            Joindre un document
            <input
              type="file"
              hidden
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button type="submit" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
